/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createPost = (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.gid);
    docref.get().then((doc) => {
      if (doc.exists && doc.data().member.includes(user)) {
        return docref
            .collection("posts")
            .add({
              uid: user,
              message: req.body.message,
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
              love: [],
              imageUrl: req.body.imageUrl ? req.body.imageUrl : [],
              comment: 0,
              follower: [user],
              lastactive: admin.firestore.FieldValue.serverTimestamp(),
              charaId: req.body.charaId,
              viewer: [user],
            })
            .then((ref) => {
              if (req.body.imageUrl.length > 0) {
                Promise.all(
                    req.body.imageUrl.map((url) => {
                      docref.collection("media").add({
                        url: url,
                        pid: ref.id,
                        timestamp: admin.firestore.FieldValue.serverTimestamp(),
                      });
                    }),
                );
              }
              sendNotifications(
                  doc.data().member,
                  "101",
                  user,
                  doc.data().name,
                  "",
                  `${doc.id}/${ref.id}`,
              );
              return res.status(200).send("create post success");
            })
            .catch((e) => {
              return res.status(400).send("create post not success ", e);
            });
      }
      return res.status(401).send("unauthorized");
    });
    // console.log(req.body);
    // return res.status(200).send(req.body.message);
  } else {
    return res.status(401).send("unauthorized " + req.user);
  }
};

exports.updatePost = (req, res) => {
  if (req.user) {
    const docref = db
        .collection("group")
        .doc(req.params.gid)
        .collection("posts")
        .doc(req.params.pid);
    docref.get().then((doc) => {
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref
            .update({
              message: req.body.message,
            })
            .then(() => {
              return res.status(200).send("update post success");
            })
            .catch((e) => {
              return res.status(400).send("update post not success ", e);
            });
      } else if (!doc.exists) {
        return res.status(404).send("post not found");
      }
      return res.status(401).send("unauthorized");
    });
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.deletePost = (req, res) => {
  if (req.user) {
    const docref = db
        .collection("group")
        .doc(req.params.gid)
        .collection("posts")
        .doc(req.params.pid);
    docref.get().then((doc) => {
      if (doc.exists && doc.data().uid == req.user.uid) {
        if (doc.data().imageUrl.length > 0) {
          Promise.all(
              req.body.filepath.map((path) => {
                admin.storage().bucket(req.body.bucket).file(path).delete();
              }),
          );
        }
        return docref
            .delete()
            .then(() => {
              return res.status(200).send("delete post success");
            })
            .catch((e) => {
              return res.status(400).send("delete post not success ", e);
            });
      } else {
        return res.status(401).send("unauthorized");
      }
    });
  } else {
    res.status(404).send("post not found");
  }
};

exports.lovePost = (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const docref = groupref.collection("posts").doc(req.params.pid);
    docref.get().then((doc) => {
      if (doc.exists) {
        return docref
            .update({
              love: admin.firestore.FieldValue.arrayUnion(req.user.uid),
            })
            .then(() => {
              groupref.get().then((gdoc) => {
                sendNotifications(
                    doc.data().uid,
                    "104",
                    user,
                    gdoc.data().name,
                    "",
                    `${doc.id}/${req.params.pid}`,
                );
              });
              return res.status(200).send("update post success");
            })
            .catch((e) => {
              return res.status(400).send("update post not success ", e);
            });
      } else {
        res.status(404).send("post not found");
      }
    });
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.unlovePost = (req, res) => {
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const docref = groupref.collection("posts").doc(req.params.pid);
    docref.get().then((doc) => {
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref
            .update({
              love: admin.firestore.FieldValue.arrayRemove(req.user.uid),
            })
            .then(() => {
              return res.status(200).send("update post success");
            })
            .catch((e) => {
              return res.status(400).send("update post not success ", e);
            });
      } else {
        res.status(403).send("forbidden");
      }
    });
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.getAllPost = async (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const doc = await groupref.get();
    // console.log(req.query);

    if (doc.exists) {
      if (
        (doc.data().privacy == "private" && doc.data().member.includes(user)) ||
        doc.data().privacy != "private"
      ) {
        const snapshot = await groupref
            .collection("posts")
            .orderBy(req.query.orderby, "desc")
            .limit(parseInt(parseInt(req.query.loadlimit)))
            .get();
        let post = [];
        await Promise.all(
            snapshot.docs.map(async (postdoc) => {
              let identifiers = [];
              postdoc.data().viewer.map((view) => {
                identifiers = [...identifiers, {uid: view}];
              });
              const users = await admin.auth().getUsers(identifiers);
              let viewer = {};
              users.users.map((auser) => {
                viewer = {
                  ...viewer,
                  [auser.uid]: {
                    uid: auser.uid,
                    displayName: auser.displayName,
                    photoURL: auser.photoURL,
                  },
                };
              });
              const arrviewer = Object.entries(viewer);
              const mappeddocdata = {
                ...postdoc.data(),
                pid: postdoc.id,
                gid: req.params.gid,
                creator: Object.fromEntries([
                  arrviewer.find(([k, v]) => v.uid === postdoc.data().uid),
                ]),
                viewer: viewer,
                follower: Object.fromEntries(
                    arrviewer.filter(([k, v], i) =>
                      postdoc.data().follower.includes(v.uid),
                    ),
                ),
              };
              const finaldata = {...postdoc.data(), ...mappeddocdata};
              post = [...post, finaldata];
            // console.log(post);
            }),
        );
        return res.status(200).json(post);
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.getPost = (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    groupref.get().then((doc) => {
      if (doc.exists) {
        // eslint-disable-next-line max-len
        if (
          (doc.data().privacy == "private" &&
            doc.data().member.includes(user)) ||
          doc.data().privacy == "public"
        ) {
          return groupref
              .collection("posts")
              .doc(req.params.pid)
              .get()
              .order
              .then((snapshot) => {
              // const post = snapshot.docs.map((docs)=>docs.data());
                if (snapshot.exists) {
                  return res.status(200).json(snapshot.data());
                }
              });
        }
      }
    });
  }
};

exports.getAllMedia = (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    groupref.get().then((doc) => {
      if (doc.exists) {
        // eslint-disable-next-line max-len
        if (
          (doc.data().privacy == "private" &&
            doc.data().member.includes(user)) ||
          doc.data().privacy == "public"
        ) {
          return groupref
              .collection("media")
              .orderBy("timestamp", "desc")
              .get()
              .then((snapshot) => {
                if (!snapshot.empty) {
                  return res.status(200).json(snapshot.docs.map((doc)=>doc.data()));
                } else {
                  return res.status(404).json("media not found");
                }
              });
        } else {
          return res.status(403).json("forbidden");
        }
      } else {
        return res.status(404).json("group not found");
      }
    });
  } else {
    return res.status(401).json("unauthorized");
  }
};
