/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");
// const {getUsersById} = require("../utils/userMapper");

exports.createPost = async (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.gid);
    const doc = await docref.get();
    if (doc.exists && doc.data().member.includes(user)) {
      const ref = await docref.collection("posts").add({
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
      });
      const batch = db.batch();
      if (req.body.imageUrl.length > 0) {
        req.body.imageUrl.map((url) => {
          batch.set(docref.collection("media").doc(), {
            url: url,
            pid: ref.id,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
        });
      }
      if (req.body.charaId && req.body.charaId != "") {
        batch.update(docref.collection("chara").doc(req.body.charaId), {
          postRef: admin.firestore.FieldValue.arrayUnion({
            pid: ref.id,
            timestamp: Date.now(),
          }),
        });
      }
      batch.update(docref, {
        postcount: admin.firestore.FieldValue.increment(1),
      });
      batch.commit();
      sendNotifications(
          doc.data().member,
          "101",
          user,
          req.params.gid,
          "",
          `group/${req.params.gid}/dashboard?pid=${ref.id}`,
      );
      return res.status(200).send("create post success");
    } else {
      return res.status(403).send("forbidden");
    }
  } else {
    return res.status(401).send("unauthorized");
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
      } else {
        return res.status(401).send("unauthorized");
      }
    });
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.deletePost = async (req, res) => {
  if (req.user) {
    const docref = db
        .collection("group")
        .doc(req.params.gid)
        .collection("posts")
        .doc(req.params.pid);
    const doc = await docref.get();
    if (doc.exists && doc.data().uid == req.user.uid) {
      if (doc.data().imageUrl.length > 0) {
        Promise.all(
            req.body.filepath.map((path) => {
              admin.storage().bucket(req.body.bucket).file(path).delete();
            }),
        );
      }
      if (doc.data().charaId) {
        await db.runTransaction(async (transaction) => {
          const trdoc = await transaction.get(
              docref.collection("chara").doc(doc.data().charaId),
          );
          if (trdoc.exists) {
            const newList = trdoc
                .data()
                .postRef.filter((v, i) => v.pid != req.params.gid);
            transaction.update(
                docref.collection("chara").doc(doc.data().charaId),
                {
                  postRef: newList,
                },
            );
          }
        });
      }
      db.collection("group").doc(req.params.gid).update({
        postcount: admin.firestore.FieldValue.increment(-1),
      });
      await docref.delete();
      return res.status(200).send("delete post success");
    } else {
      return res.status(401).send("unauthorized");
    }
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
              sendNotifications(
                  doc.data().uid,
                  "104",
                  user,
                  req.params.gid,
                  "",
                  `group/${req.params.gid}/dashboard?pid=${req.params.pid}`,
              );
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

    if (doc.exists) {
      if (
        (doc.data().privacy == "private" && doc.data().member.includes(user)) ||
        doc.data().privacy != "private"
      ) {
        const snapshot = await groupref
            .collection("posts")
            .orderBy(req.query.orderby, "desc")
            .limit(parseInt(req.query.loadlimit))
            .get();
        const postdoc = snapshot.docs.map((doc)=>{
          return {
            ...doc.data(),
            pid: doc.id,
            gid: req.params.gid,
          };
        });
        // const post = {postdoc};
        return res.status(200).json(postdoc);
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

exports.getPost = async (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const doc = await groupref.get();
    if (doc.exists) {
      if (
        (doc.data().privacy == "private" &&
          doc.data().member.includes(user)) ||
        doc.data().privacy != "private"
      ) {
        const snapshot = await groupref
            .collection("posts")
            .doc(req.params.pid)
            .get();
        if (snapshot.exists) {
          return res.status(200).json({...snapshot.data(), pid: req.params.pid, gid: req.params.gid});
        } else {
          return res.status(404).send("post not found");
        }
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("group not found");
    }
  } else {
    return res.status(400).send("unauthorized");
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
          doc.data().privacy != "private"
        ) {
          return groupref
              .collection("media")
              .orderBy("timestamp", "desc")
              .get()
              .then((snapshot) => {
                if (!snapshot.empty) {
                  return res
                      .status(200)
                      .json(snapshot.docs.map((doc) => doc.data()));
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
