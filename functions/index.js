/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
/* eslint-disable indent */

const functions = require("firebase-functions");
const express = require("express");
// const { db } = require("./utils/admin");
const { createGroup, updateGroup, deleteGroup, getAllGroup, addPlayer, addPendingPlayer, removePlayer, removePendingPlayer, addStaff, removeStaff, groupPin, groupUnpin, groupLove, groupUnlove } = require("./handlers/group");
const { db } = require("./utils/admin");
const authmw = require("./utils/auth");
const cors = require("cors");
const { createPost, updatePost, deletePost, lovePost, unlovePost, getPost, getAllPost } = require("./handlers/posts");

// The Firebase Admin SDK to access Firestore.

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
}));

app.get("/", (req, res)=>{
  // res.send(req.query);
});

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
app.post("/group/:id/removechara");
app.post("/group/:id/pin", authmw, groupPin);
app.post("/group/:id/unpin", authmw, groupUnpin);
app.post("/group/:id/love", authmw, groupLove);
app.post("/group/:id/unlove", authmw, groupUnlove);
app.get("/group/:gid", authmw, groupUnlove);
app.get("/groups", authmw, getAllGroup);
app.post("/post/:gid/create", authmw, createPost);
app.post("/post/:gid/:pid/update", authmw, updatePost);
app.post("/post/:gid/:pid/delete", authmw, deletePost);
app.post("/post/:gid/:pid/love", authmw, lovePost);
app.post("/post/:gid/:pid/unlove", authmw, unlovePost);
app.get("/post/:gid", authmw, getAllPost);
app.get("/post/:gid/post/:pid", authmw, getPost);
app.post("/post/:pid/comment/create");
app.post("/post/:pid/comment/:cid/update");
app.post("/post/:pid/comment/:cid/delete");
app.post("/post/:pid/comment/:cid/love");
app.post("/post/:pid/comment/:cid/unlove");
app.get("/post/:pid/comment");
app.post("/post/:pid/comment/:cid/reply/create");
app.post("/post/:pid/comment/:cid/reply/:rid/update");
app.post("/post/:pid/comment/:cid/reply/:rid/delete");
app.post("/post/:pid/comment/:cid/reply/:rid/love");
app.post("/post/:pid/comment/:cid/reply/:rid/unlove");
app.get("/post/:pid/comment/:cid/reply");
app.get("/user/:uid");
app.post("/user/:uid/update/");
app.post("/utils/upload");

exports.api = functions.region("asia-southeast1").https.onRequest(app);

exports.onNotificationAdd = functions.firestore
  .document("notifications/{notiId}")
  .onCreate((snap, context) => {
    const sendTo = snap.data().reciever;
    if (sendTo.length > 0) {
      sendTo.map((target) =>{
        if (target != snap.data().triggerer) {
          db
          .collection(`userDetail/${target}/notification`)
          .add({
            notitype: snap.data().notitype,
            triggerer: snap.data().triggerer,
            group: snap.data().group,
            object: snap.data().object,
            timestamp: snap.data().timestamp,
            readed: false,
          });
        }
        }
      );
    }
  });

  // exports.onCommuUpdate = functions.firestore.document("group/{groupId}").onUpdate((snap, context)=>{
  //   // todo
  // });

  // exports.onCommuCommentCreate = functions.firestore.document("group/{groupId}/comments/{commentId}").onCreate((snap, context)=>{
  //   // todo
  // });


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

// exports.onUserCreated = functions.auth.user().onCreate((user) => {
//   db.doc(`userDetail/${user.uid}`)
//     .set({
//       uid: user.uid,
//       displayName: user.displayName,
//       email: user.email,
//       photoURL: user.photoURL,
//     })
//     .then();
// });
