/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable indent */

const functions = require("firebase-functions");
const express = require("express");
// const { db } = require("./utils/admin");
const { createGroup, updateGroup, deleteGroup, getAllGroup, addPlayer, addPendingPlayer, removePlayer, removePendingPlayer, addStaff, removeStaff, groupPin, groupUnpin, groupLove, groupUnlove, getGroup, JoinDebug } = require("./handlers/group");
const { db, admin } = require("./utils/admin");
const authmw = require("./utils/auth");
const cors = require("cors");
const { createPost, updatePost, deletePost, lovePost, unlovePost, getPost, getAllPost, getAllMedia } = require("./handlers/posts");
const { createComment, updateComment, deleteComment, loveComment, unloveComment, getAllComment } = require("./handlers/comments");
const { createReply, updateReply, deleteReply, loveReply, unloveReply, getAllReply } = require("./handlers/replies");
const { getuser, getbatchUser } = require("./handlers/user");
const { createPreviewComment, DeletePreviewComment, lovePreviewComment, unlovePreviewComment, UpdatePreviewComment, getAllPreviewcomment } = require("./handlers/previewcomments");
const { createPreviewReply, UpdatePreviewReply, DeletePreviewReply, lovePreviewReply, unlovePreviewReply } = require("./handlers/previewreplies");

// The Firebase Admin SDK to access Firestore.

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000", "https://comuthor-uat-hclhis5lxq-de.a.run.app"],
  // origin: "https://comuthor-uat-hclhis5lxq-de.a.run.app",
}));

app.get("/", async (req, res)=>{

});
app.post("/", DeletePreviewComment);

app.post("/group/create", authmw, createGroup);
app.post("/group/:id/update", authmw, updateGroup);
app.post("/group/:id/delete", authmw, deleteGroup);
app.post("/group/:id/addplayer", authmw, addPlayer);
app.post("/group/:id/addpendingplayer", authmw, addPendingPlayer);
app.post("/group/:id/removeplayer", authmw, removePlayer);
app.post("/group/:id/removependingplayer", authmw, removePendingPlayer);
app.post("/group/:id/addstaff", authmw, addStaff);
app.post("/group/:id/removestaff", authmw, removeStaff);
app.post("/group/:id/addchara");
app.post("/group/:id/updatechara");
app.post("/group/:id/removechara");
app.post("/group/:id/pin", authmw, groupPin);
app.post("/group/:id/unpin", authmw, groupUnpin);
app.post("/group/:id/love", authmw, groupLove);
app.post("/group/:id/unlove", authmw, groupUnlove);
app.post("/group/:gid/comment/create", authmw, createPreviewComment);
app.post("/group/:gid/comment/:cid/update", authmw, UpdatePreviewComment);
app.post("/group/:gid/comment/:cid/delete", authmw, DeletePreviewComment);
app.post("/group/:gid/comment/:cid/love", authmw, lovePreviewComment);
app.post("/group/:gid/comment/:cid/unlove", authmw, unlovePreviewComment);
app.post("/group/:gid/comment/:cid/reply/create", authmw, createPreviewReply);
app.post("/group/:gid/comment/:cid/reply/:rid/update", authmw, UpdatePreviewReply);
app.post("/group/:gid/comment/:cid/reply/:rid/delete", authmw, DeletePreviewReply);
app.post("/group/:gid/comment/:cid/reply/:rid/love", authmw, lovePreviewReply);
app.post("/group/:gid/comment/:cid/reply/:rid/unlove", authmw, unlovePreviewReply);
app.get("/group/:gid", authmw, getGroup);
app.get("/group/:gid/comment", authmw, getAllPreviewcomment);
app.get("/group/:gid/media", authmw, getAllMedia);
app.get("/groups", authmw, getAllGroup);
app.post("/post/:gid/create", authmw, createPost);
app.post("/post/:gid/:pid/update", authmw, updatePost);
app.post("/post/:gid/:pid/delete", authmw, deletePost);
app.post("/post/:gid/:pid/love", authmw, lovePost);
app.post("/post/:gid/:pid/unlove", authmw, unlovePost);
app.get("/post/:gid", authmw, getAllPost);
app.get("/post/:gid/post/:pid", authmw, getPost);
app.post("/post/:gid/:pid/comment/create", authmw, createComment);
app.post("/post/:gid/:pid/comment/:cid/update", authmw, updateComment);
app.post("/post/:gid/:pid/comment/:cid/delete", authmw, deleteComment);
app.post("/post/:gid/:pid/comment/:cid/love", authmw, loveComment);
app.post("/post/:gid/:pid/comment/:cid/unlove", authmw, unloveComment);
app.get("/post/:gid/:pid/comment", authmw, getAllComment);
app.post("/post/:gid/:pid/comment/:cid/reply/create", authmw, createReply);
app.post("/post/:gid/:pid/comment/:cid/reply/:rid/update", authmw, updateReply);
app.post("/post/:gid/:pid/comment/:cid/reply/:rid/delete", authmw, deleteReply);
app.post("/post/:gid/:pid/comment/:cid/reply/:rid/love", authmw, loveReply);
app.post("/post/:gid/:pid/comment/:cid/reply/:rid/unlove", authmw, unloveReply);
app.get("/post/:gid/:pid/comment/:cid/reply", authmw, getAllReply);
app.get("/user/:uid", authmw, getuser);
app.get("/user/search", authmw, getuser);
app.post("/user/bactchget/", getbatchUser);
app.post("/user/:uid/update/");

app.post("/debug/group/:gid/join/", authmw, JoinDebug);

exports.api = functions.region("asia-southeast1").https.onRequest(app);

exports.onNotificationAdd = functions.region("asia-southeast1").firestore
  .document("notifications/{notiId}")
  .onCreate(async (snap, context) => {
    let sendTo = snap.data().reciever;
    const batch = db.batch();
    if (!Array.isArray(sendTo)) {
      sendTo = [sendTo];
    }
    if (snap.data().notitype === "002" || snap.data().notitype === "101") {
      sendTo.map((target) =>{
        if (target != snap.data().triggerer) {
          return batch.set(db.collection(`userDetail/${target}/notification`).doc(), {
            notitype: snap.data().notitype,
            triggerer: [snap.data().triggerer],
            group: snap.data().group,
            object: snap.data().object,
            timestamp: snap.data().timestamp,
            readed: false,
            path: snap.data().path,
          });
        } else {
          return;
        }
        });
    } else {
      await Promise.all(sendTo.map(async (target) =>{
        const snap2 = await db
          .collection(`userDetail/${target}/notification`)
          .where("notitype", "==", snap.data().notitype)
          .where("path", "==", snap.data().path)
          .get();
        if (!snap2.empty) {
          return snap2.docs.map((doc) => {
            return batch.update(db.collection(`userDetail/${target}/notification`).doc(doc.id), {
              triggerer: admin.firestore.FieldValue.arrayUnion(snap.data().triggerer),
              timestamp: snap.data().timestamp,
              readed: false,
              object: snap.data().object,
            });
          });
        } else {
          return batch.set(db.collection(`userDetail/${target}/notification`).doc(), {
            notitype: snap.data().notitype,
            triggerer: [snap.data().triggerer],
            group: snap.data().group,
            object: snap.data().object,
            timestamp: snap.data().timestamp,
            readed: false,
            path: snap.data().path,
          });
        }
      }));
    }
    return batch.commit();
  });
  /* พวกนี้จะใช้ */
//   exports.onPostCreate = functions.firestore.document("posts/{postId}/").onCreate((snap, context)=>{
//     // db.collection("notifications").where("linkId", "==", context.params.postId).where("type", "==", "11");
//     db.collection("group").doc(snap.data().groupId).get().then((parent)=>{
//       if (parent.exists) {
//         const member = parent.data().members;
//         db.collection("notifications").add({
//           "linkId": snap.id,
//           "type": "11",
//           "uid": snap.data().uid,
//           "message": "",
//           "timestamp": snap.createTime,
//           "reciever": [member],
//         });
//       }
//     });
//   });

//   exports.onCommentCreate = functions.firestore.document("posts/{postId}/comments/{commentId}").onCreate((snap, context)=>{
//     // todo
//   });

exports.onUserCreated = functions.auth.user().onCreate((user) => {
  admin.auth().updateUser(user.uid, {photoURL: ""});
  db.doc(`userDetail/${user.uid}`)
    .set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: "",
    })
    .then();
});
