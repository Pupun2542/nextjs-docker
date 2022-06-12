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
