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
    }).then((ref)=>{
      groupref.get().then((doc)=>{
        const reciever = (doc.data().follower? [...doc.data().staff, ...doc.data().follower] : doc.data().staff);
        sendNotifications(reciever, "201", req.user.uid, doc.id, "", `group/${doc.id}?cid=${ref.id}`);
      });
      groupref.update({
        commentcount: admin.firestore.FieldValue.increment(1),
        commentuser: admin.firestore.FieldValue.arrayUnion(req.user.uid),
        follower: admin.firestore.FieldValue.arrayUnion(req.user.uid),
      });
      return res.status(200).send("created comment");
    });
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.DeletePreviewComment = async (req, res) =>{
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const commentnref= groupref.collection("comments").doc(req.params.cid);
    const comment = await commentnref.get();
    if (comment.exists) {
      if (comment.data().uid === req.user.uid) {
        if (comment.data().imageURL !== "") {
          admin.storage().bucket(req.body.bucket).file(req.body.filepath).delete();
        }
        commentnref.delete().then(()=>{
          groupref.update({
            commentcount: admin.firestore.FieldValue.increment(-1),
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

exports.UpdatePreviewComment = async (req, res) =>{
  // console.log(req.user);
  if (req.user) {
    const commentnref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid);
    const comment = await commentnref.get();
    if (comment.exists) {
      if (comment.data().uid === req.user.uid) {
        commentnref.update({
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

exports.lovePreviewComment = async (req, res) =>{
  console.log(req.user);
  if (req.user) {
    const commentnref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid);
    const comment = await commentnref.get();
    if (comment.exists) {
      await commentnref.update({
        love: admin.firestore.FieldValue.arrayUnion(req.user.uid),
      });
      sendNotifications(comment.data().uid, "203", req.user.uid, req.params.gid, "", `group/${req.params.gid}?cid=${req.params.cid}`);
    } else {
      return res.status(404).send("comment not found");
    }
    return res.status(200).send("update success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.unlovePreviewComment = async (req, res) =>{
  if (req.user) {
    const commentnref= db.collection("group").doc(req.params.gid).collection("comments").doc(req.params.cid);
    const comment = await commentnref.get();
    if (comment.exists) {
      commentnref.update({
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

exports.getAllPreviewcomment = async (req, res) => {
  // console.log(req.query);
  const commentnref = db.collection("group").doc(req.params.gid).collection("comments").limit(parseInt(req.query.limit)).orderBy("timestamp", "desc");
  const snapshot = await commentnref.get();
  if (!snapshot.empty) {
    let data = [];
    let creators = [];
    snapshot.forEach((doc)=>{
      data = [...data, {...doc.data(), gid: req.params.gid, cid: doc.id}];
      creators = [...creators, doc.data().uid];
    });
    const identifiers = creators.map((id) =>({uid: id}));
    console.log(creators);
    const creator = await admin.auth().getUsers(identifiers);
    let mappedcreator = {};
    creator.users.map((usr)=>{
      mappedcreator = {
        ...mappedcreator,
        [usr.uid]: {
          uid: usr.uid,
          displayName: usr.displayName,
          photoURL: usr.photoURL,
        },
      };
    });
    data = data.map((dat)=>({
      ...dat,
      creator: mappedcreator[dat.uid],
    }));
    return res.status(200).json(data);
  } else {
    return res.status(404).send("comment not found");
  }
};
