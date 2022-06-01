const {db, admin} = require("../utils/admin");

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
          "imageUrl": req.body.imageUrl,
          "comment": 0,
          "follower": [],
          "lastactive": admin.firestore.FieldValue.serverTimestamp(),
          "groupId": req.params.gid,
          "charaId": req.body.charaId,
          "viewer": [],
        }).then(()=>{
          db.collection("notifications").add({
            reviever: doc.data().member,
            notitype: "101",
            triggerer: user,
            group: doc.data().name,
            object: "",
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          });
          return res.status(200).send("create post success");
        }).catch((e)=>{
          return res.status(400).send("create post not success ", e);
        });
      }
      return res.status(403).send("forbidden");
    });
    res.status(403).send("forbidden");
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
      }
      return res.status(403).send("forbidden");
    });
    res.status(404).send("post not found");
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
      return res.status(403).send("forbidden");
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
            db.collection("notifications").add({
              reviever: doc.data().uid,
              notitype: "104",
              triggerer: user,
              group: gdoc.data().name,
              object: "",
              timestamp: admin.firestore.FieldValue.serverTimestamp(),
            });
          });
          return res.status(200).send("update post success");
        }). catch((e)=>{
          return res.status(400).send("update post not success ", e);
        });
      }
      return res.status(403).send("forbidden");
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
      return res.status(403).send("forbidden");
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
    });
  }
};

exports.getPost = (req, res) =>{

};
