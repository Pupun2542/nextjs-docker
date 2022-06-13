/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createPreviewReply = (req, res) => {
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const commentref = groupref.collection("comments").doc(req.params.cid);
    commentref.collection("replies").add({
      uid: req.user.uid,
      message: req.body.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      love: [],
      imageURL: req.body.imageURL,
    }).then(()=>{
      groupref.get().then((doc)=>{
        sendNotifications(doc.data().member, "202", req.user.uid, doc.data().name, "", doc.id);
      });
      groupref.update({
        commentuser: admin.firestore.FieldValue.arrayUnion(req.user.uid),
      });
      commentref.update({
        replycount: admin.firestore.FieldValue.increment(1),
      });
      return res.status(200).send("created comment");
    });
  }
};

exports.DeletePreviewReply = async (req, res) =>{
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const commentref = groupref.collection("comments").doc(req.params.cid);
    const replyref = commentref.collection("replies").doc(req.params.rid);
    const reply = await replyref.get();
    if (reply.exists) {
      if (reply.data().uid === req.user.uid) {
        if (reply.data().imageURL !== "") {
          admin.storage().bucket(req.body.bucket).file(req.body.filepath).delete();
        }
        replyref.delete().then(()=>{
          commentref.update({
            replycount: admin.firestore.FieldValue.increment(-1),
          });
        });
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send("update success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.UpdatePreviewReply = async (req, res) =>{
  // console.log(req.user);
  if (req.user) {
    const replyref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid).collection("replies").doc(req.params.rid);
    const reply = await replyref.get();
    if (reply.exists) {
      if (reply.data().uid === req.user.uid) {
        replyref.update({
          message: req.body.message,
        });
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send("update success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.lovePreviewReply = async (req, res) =>{
  // console.log(req.user);
  if (req.user) {
    const replyref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid).collection("replies").doc(req.params.rid);
    const reply = await replyref.get();
    if (reply.exists) {
      replyref.update({
        love: admin.firestore.FieldValue.arrayUnion(req.user.uid),
      });
    } else {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send("update success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.unlovePreviewReply = async (req, res) =>{
  if (req.user) {
    const replyref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid).collection("replies").doc(req.params.rid);
    const reply = await replyref.get();
    if (reply.exists) {
      replyref.update({
        love: admin.firestore.FieldValue.arrayRemove(req.user.uid),
      });
    } else {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send("update success");
  } else {
    return res.status(401).send("unauthorized");
  }
};
