/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createPost = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    db.collection("group").doc(req.params.gid).get().then((doc)=>{
      if (doc.exists && doc.data().member.includes(user)) {
        return db.collection("posts").add({
          "uid": user,
          "message": req.body.message,
          "timestamp": admin.firestore.FieldValue.serverTimestamp(),
          "love": 0,
          "imageUrl": (req.body.imageUrl? req.body.imageUrl: []),
          "comment": 0,
          "follower": [user],
          "lastactive": admin.firestore.FieldValue.serverTimestamp(),
          "groupId": req.params.gid,
          "charaId": req.body.charaId,
          "viewer": [user],
        }).then((ref)=>{
          sendNotifications(doc.data().member, "101", user, doc.data().name, "", `${doc.id}/${ref.id}`);
          return res.status(200).send("create post success");
        }).catch((e)=>{
          return res.status(400).send("create post not success ", e);
        });
      }
      return res.status(401).send("unauthorized");
    });
    res.status(401).send("unauthorized");
  }
};

exports.updatePost = (req, res) =>{
  if (req.user) {
    const docref = db.collection("posts").doc(req.params.pid);
    docref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref.update({
          "message": req.body.message,
        }).then(()=>{
          return res.status(200).send("update post success");
        }). catch((e)=>{
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

exports.deletePost = (req, res) =>{
  if (req.user) {
    const docref = db.collection("posts").doc(req.params.pid);
    docref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref.delete().then(()=>{
          return res.status(200).send("delete post success");
        }). catch((e)=>{
          return res.status(400).send("delete post not success ", e);
        });
      }
      return res.status(401).send("unauthorized");
    });
    res.status(404).send("post not found");
  }
};

exports.lovePost = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("posts").doc(req.params.pid);
    const groupref = db.collection("group").doc(req.params.gid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return docref.update({
          "love": admin.firestore.FieldValue.arrayUnion(req.user.uid),
        }).then(()=>{
          groupref.get().then((gdoc)=>{
            sendNotifications(doc.data().uid, "104", user, gdoc.data().name, "", `${doc.id}/${req.params.pid}`);
          });
          return res.status(200).send("update post success");
        }). catch((e)=>{
          return res.status(400).send("update post not success ", e);
        });
      }
      return res.status(401).send("unauthorized");
    });
    res.status(404).send("post not found");
  }
};

exports.unlovePost = (req, res) =>{
  if (req.user) {
    const docref = db.collection("posts").doc(res.params.pid);
    // const groupref = db.collection("group").doc(res.params.gid);
    docref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref.update({
          "love": admin.firestore.FieldValue.arrayRemove(req.user.uid),
        }).then(()=>{
          return res.status(200).send("update post success");
        }). catch((e)=>{
          return res.status(400).send("update post not success ", e);
        });
      }
      return res.status(401).send("unauthorized");
    });
    res.status(404).send("post not found");
  }
};

exports.getAllPost = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(res.params.gid);
    groupref.get().then((doc)=>{
      if (doc.exists) {
        // eslint-disable-next-line max-len
        if ((doc.data().privacy == "private" && doc.data().member.includes(user))|| doc.data().privacy == "public") {
          db
              .collection("posts")
              .where("groupId", "==", res.params.gid)
              .get()
              .then((snapshot)=>{
                const post = snapshot.docs.map((docs)=>docs.data());
                return res.status(200).json(post);
              });
        }
      }
      return res.status(401).send("unauthorized");
    });
  }
};

exports.getPost = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(res.params.gid);
    groupref.get().then((doc)=>{
      if (doc.exists) {
        // eslint-disable-next-line max-len
        if ((doc.data().privacy == "private" && doc.data().member.includes(user))|| doc.data().privacy == "public") {
          db
              .collection("posts")
              .doc(req.params.pid)
              .get()
              .then((snapshot)=>{
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
