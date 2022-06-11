/* eslint-disable max-len */

const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createPreviewComment = (req, res) => {
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    groupref.collection("comments").add({
      uid: req.user.uid,
      message: req.body.message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      replycount: 0,
      love: [],
      imageURL: req.body.imageURL,
    }).then((doc)=>{
      groupref.get().then((doc)=>{
        sendNotifications(doc.data().member, "201", req.user.uid, doc.data().name, "", doc.id);
      });
      groupref.update({
        commentcount: admin.firestore.FieldValue.increment(1),
        commentuser: admin.firestore.FieldValue.arrayUnion(req.user.uid),
      });
      return res.status(200).send("created comment");
    });
  }
};
