/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createReply = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("posts").doc(req.params.pid).collection("comments").doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return db.collection("group").doc(req.params.gid).get().then((gdoc)=>{
          if (gdoc.exists && gdoc.data().member.includes(user)) {
            return docref.collection("replies").add({
              "uid": user,
              "message": req.body.message,
              "timestamp": admin.firestore.FieldValue.serverTimestamp(),
              "love": [],
              "imageUrl": (req.body.imageUrl? req.body.imageUrl: ""),
              "charaId": req.body.charaId,
            }).then((ref)=>{
              sendNotifications(doc.data().member, 103, user, doc.data().name, "", `${gdoc.id}/${req.params.pid}/${req.params.cid}/${ref.id}`);
              return res.status(200).send("create comment success");
            }).catch((e)=>{
              return res.status(400).send("create comment not success ", e);
            });
          } else {
            return res.status(401).send("unauthorized");
          }
        });
      } else {
        return res.status(404).send("comment not found");
      }
    });
  } else {
    res.status(401).send("unauthorized");
  }
};

exports.updateReply = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db
        .collection("posts")
        .doc(req.params.pid)
        .collection("comments")
        .doc(req.params.cid)
        .collection("replies")
        .doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == user) {
        return docref.update({
          "message": req.body.message,
        }).then(()=>{
          return res.status(200).send("update reply success");
        }). catch((e)=>{
          return res.status(400).send("update commment not success ", e);
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

exports.deleteReply = (req, res) =>{
  if (req.user) {
    const docref = db
        .collection("posts")
        .doc(req.params.pid)
        .collection("comments")
        .doc(req.params.cid)
        .collection("replies")
        .doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists && doc.data().uid == req.user.uid) {
        return docref.delete().then(()=>{
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

exports.loveReply = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db
        .collection("posts")
        .doc(req.params.pid)
        .collection("comments")
        .doc(req.params.cid)
        .collection("replies")
        .doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return db.collection("group").doc(doc.data().groupId).get().then((gdoc)=>{
          if (gdoc.exists && gdoc.data().member.includes(user)) {
            return docref.update({
              "love": admin.firestore.FieldValue.arrayUnion(req.user.uid),
            }).then(()=>{
              sendNotifications(doc.data().uid, "106", user, gdoc.data().name, "", `${gdoc.id}/${req.params.pid}/${req.params.cid}`);
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

exports.unloveReply = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db
        .collection("posts")
        .doc(req.params.pid)
        .collection("comments")
        .doc(req.params.cid)
        .collection("replies")
        .doc(req.params.cid);
    docref.get().then((doc)=>{
      if (doc.exists) {
        return db.collection("group").doc(doc.data().groupId).get().then((gdoc)=>{
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

exports.getAllReply = (req, res) =>{
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
              .doc(req.params.cid)
              .collection("replies")
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
