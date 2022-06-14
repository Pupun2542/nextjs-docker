/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createComment = async (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const postref = groupref.collection("posts").doc(req.params.pid);
    const grpdoc = await groupref.get();
    if (grpdoc.exists && grpdoc.data().member.includes(user)) {
      const cmtref = await postref.collection("comments").add({
        "uid": user,
        "message": req.body.message,
        "timestamp": admin.firestore.FieldValue.serverTimestamp(),
        "love": [],
        "imageUrl": (req.body.imageUrl? req.body.imageUrl: ""),
        "reply": 0,
        "follower": [user],
        "charaId": req.body.charaId,
        "viewer": [user],
      });
      await postref.update({
        comment: admin.firestore.FieldValue.increment(1),
        follower: admin.firestore.FieldValue.arrayUnion(user),
      });
      const postdoc = await postref.get();
      sendNotifications(postdoc.data().follower, 102, user, postdoc.data().name, "", `${req.params.gid}/${req.params.pid}/${cmtref.id}`);
      return res.status(200).send("create comment success");
    } else {
      res.status(403).send("forbidden");
    }
  } else {
    res.status(401).send("unauthorized");
  }
};
exports.updateComment = async (req, res) =>{
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const postref = groupref.collection("posts").doc(req.params.pid);
    const cmtref = postref.collection("comments").doc(req.params.cid);

    const doc = await cmtref.get();
    if (doc.exists && doc.data().uid == req.user.uid) {
      cmtref.update({
        "message": req.body.message,
      }).then(()=>{
        return res.status(200).send("update commment success");
      }).catch((e)=>{
        return res.status(400).send("update commment not success ", e);
      });
    } else if (!doc.exists) {
      return res.status(404).send("post not found");
    }
    return res.status(401).send("unauthorized");
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.deleteComment = (req, res) =>{
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const postref = groupref.collection("posts").doc(req.params.pid);
    const cmtref = postref.collection("comments").doc(req.params.cid);
    cmtref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == req.user.uid) {
        return cmtref.delete().then(()=>{
          postref.update({
            comment: admin.firestore.FieldValue.increment(-1),
          });
          return res.status(200).send("delete comment success");
        }). catch((e)=>{
          return res.status(400).send("delete comment not success ", e);
        });
      }
      return res.status(401).send("unauthorized");
    });
    res.status(404).send("comment not found");
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.loveComment = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const postref = groupref.collection("posts").doc(req.params.pid);
    const docref = postref.collection("comments").doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return groupref.get().then((gdoc)=>{
          if (gdoc.exists && gdoc.data().member.includes(user)) {
            return docref.update({
              "love": admin.firestore.FieldValue.arrayUnion(req.user.uid),
            }).then(()=>{
              sendNotifications(doc.data().uid, "105", user, gdoc.data().name, "", `${gdoc.id}/${req.params.pid}/${req.params.cid}`);
              return res.status(200).send("love success");
            }).catch((e)=>{
              return res.status(400).send("love not success ", e);
            });
          }
          return res.status(401).send("unauthorized");
        });
      }
      return res.status(404).send("comment not found");
    });
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.unloveComment = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(req.params.gid);
    const postref = groupref.collection("posts").doc(req.params.pid);
    const docref = postref.collection("comments").doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return groupref.get().then((gdoc)=>{
          if (gdoc.exists && gdoc.data().member.includes(user)) {
            return docref.update({
              "love": admin.firestore.FieldValue.arrayRemove(req.user.uid),
            }).then(()=>{
              return res.status(200).send("unlove success");
            }).catch((e)=>{
              return res.status(400).send("unlove not success ", e);
            });
          }
          return res.status(401).send("unauthorized");
        });
      }
      return res.status(404).send("comment not found");
    });
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.getAllComment = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const groupref = db.collection("group").doc(res.params.gid);
    groupref.get().then((doc)=>{
      if (doc.exists) {
        if ((doc.data().privacy == "private" && doc.data().member.includes(user))|| doc.data().privacy == "public") {
          db
              .collection("posts")
              .doc(req.params.pid)
              .collection("comments")
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
