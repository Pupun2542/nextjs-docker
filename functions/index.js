/* eslint-disable max-len */
/* eslint-disable indent */
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.onNotificationAdd = functions.firestore
  .document("notifications/{notiId}")
  .onCreate((snap, context) => {
    const sendTo = snap.data().reciever;
    if (sendTo.length > 0) {
      sendTo.map((target) =>
        db
          .collection(`userDetail/${target}/notification`)
          .add({
            thumbnail: snap.data().thumbnail,
            groupName: snap.data().groupName,
            detail: snap.data().detail,
            sender: snap.data().sender,
            timestamp: snap.data().timestamp,
            readed: false,
          })
          .then()
      );
    }
  });

// exports.onChatAdd = functions.firestore
//   .document("chatrooms/{chatRoomId}/message/{messageId}")
//   .onCreate((snap, context) => {
//     db.doc(`chatrooms/${context.params.chatRoomId}`)
//       .get()
//       .then((parentData) => {
//         functions.logger.log("data: ", parentData.data());
//         if (parentData.data().member.length > 0) {
//           for (const target of parentData.data().member) {
//             functions.logger.log("target: ", target);
//             const TrRef = db.doc(
//               `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//             );
//             let readed = false;
//             if (snap.data().senderId == target) {
//               readed = true;
//             }
//             TrRef.update({
//               lastmsg: snap.data().text,
//               sender: snap.data().sender,
//               senderId: snap.data().senderId,
//               timestamp: snap.data().timestamp,
//               readed: readed,
//             }).catch(() => {
//               if (
//                 parentData.data().type == "private" ||
//                 parentData.data().type == "chara"
//               ) {
//                 TrRef.set({
//                   lastmsg: snap.data().text,
//                   sender: snap.data().sender,
//                   senderId: snap.data().senderId,
//                   timestamp: snap.data().timestamp,
//                   readed: readed,
//                   type: parentData.data().type,
//                 });
//               } else {
//                 TrRef.set({
//                   thumbnail: parentData.data().thumbnail,
//                   name: parentData.data().name,
//                   lastmsg: snap.data().text,
//                   sender: snap.data().sender,
//                   senderId: snap.data().senderId,
//                   timestamp: snap.data().timestamp,
//                   readed: readed,
//                   type: parentData.data().type,
//                 });
//               }
//             });
//           }
//         }
//       });
//   });

// db.runTransaction((transaction) => {
//   for (const target of parentData.data().member) {
//     functions.logger.log("target: ", target);
//     const TrRef = db.doc(
//       `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//     );
//     functions.logger.log(TrRef);
//     transaction.get(TrRef).then((trDoc) => {
//       if (!trDoc.empty) {
//         functions.logger.log("have record ", trDoc);
//         let readed = false;
//         if (snap.data().senderId == target) {
//           readed = true;
//         }
//         transaction.update(TrRef, {
//           lastmsg: snap.data().text,
//           sender: snap.data().sender,
//           senderId: snap.data().senderId,
//           timestamp: snap.data().timestamp,
//           readed: readed,
//         });
//         // return
//       } else {
//         functions.logger.log("not have record");
//         let readed = false;
//         if (snap.data().senderId == target) {
//           readed = true;
//         }
//         if (
//           parentData.data().type == "private" ||
//           parentData.data().type == "chara"
//         ) {
//           transaction.set(
//             db.doc(
//               `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//             ),
//             {
//               lastmsg: snap.data().text,
//               sender: snap.data().sender,
//               senderId: snap.data().senderId,
//               timestamp: snap.data().timestamp,
//               readed: readed,
//               type: parentData.data().type,
//             }
//           );
//         } else {
//           transaction.set(
//             db.doc(
//               `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//             ),
//             {
//               thumbnail: parentData.data().thumbnail,
//               name: parentData.data().name,
//               lastmsg: snap.data().text,
//               sender: snap.data().sender,
//               senderId: snap.data().senderId,
//               timestamp: snap.data().timestamp,
//               readed: readed,
//               type: parentData.data().type,
//             }
//           );
//         }
//       }
//     });
//   }

//   // parentData.data().member.map(async (target) => {

//   // });
//   return Promise.resolve();
// }).then();
//       transaction.get(TrRef).then((trDoc) => {
//         if (!trDoc.empty) {
//           functions.logger.log("have record");
//           trDoc.docs.map((doc) => {
//             parentData.data().member.map((target) => {
//               functions.logger.log("target: ", target);
//               let readed = false;
//               if (snap.data().senderId == target) {
//                 readed = true;
//               }
//               // const upRef = db.doc(`userDetail/${target}/chatmessage/${context.params.chatRoomId}`)
//               transaction.update(
//                 db.doc(
//                   `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//                 ),
//                 {
//                   lastmsg: snap.data().text,
//                   sender: snap.data().sender,
//                   senderId: snap.data().senderId,
//                   timestamp: snap.data().timestamp,
//                   readed: readed,
//                 }
//               );
//             });
//           });
//         } else {
//           functions.logger.log("not have record");
//           parentData.data().member.map((target) => {
//             functions.logger.log("target: ", target);
//             let readed = false;
//             if (snap.data().senderId == target) {
//               readed = true;
//             }
//             transaction.set(
//               db.doc(
//                 `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//               ),
//               {
//                 thumbnail: snap.data().thumbnail,
//                 lastmsg: snap.data().text,
//                 sender: snap.data().sender,
//                 senderId: snap.data().senderId,
//                 timestamp: snap.data().timestamp,
//                 readed: readed,
//               }
//             );
//             if (parentData.data().type == "private") {
//               transaction.update(
//                 db.doc(
//                   `userDetail/${target}/chatmessage/${context.params.chatRoomId}`
//                 ),
//                 {
//                   name: parentData.data().name,
//                 }
//               );
//             }
//           });
//         }
//       });
//     });
//   } else {
//     functions.logger.warn("member < 0");
//   }
// });

// console.log(context.params);
// functions.logger.log("chatroomid " + context.params.chatRoomId);
// db.doc(`chatrooms/${context.params.chatRoomId}`)
//   .get()
//   .then((parentData) => {
//     // functions.logger.log("parentdata " + parentData.data());
//     // functions.logger.log(
//     //   "member length > 0" + parentData.data().member.length > 0
//     // );
//     if (parentData.data().member.length > 0) {
//       parentData.data().member.map((target) => {
//         functions.logger.log("target " + target);
//         if (target !== snap.data().sender) {
//           // functions.logger.log("targetId " + target);
//           let name = "";
//           if (parentData.data().name) {
//             name = parentData.data().name;
//           }
//           if (parentData.data().type === "private") {
//             functions.logger.log("timestamp " + snap.data().timestamp);
//             db.collection(`userDetail/${target}/chatMessage`)
//               .add({
//                 chatroom: parentData.data().id,
//                 message: snap.data().text,
//                 name: snap.data().sender,
//                 timestamp: snap.data().timestamp,
//                 readed: false,
//               })
//               .then();
//           } else {
//             db.collection(`userDetail/${target}/chatMessage`)
//               .add({
//                 thumbnail: parentData.data().thumbnail,
//                 chatroom: parentData.data().id,
//                 message: snap.data().text,
//                 name: name,
//                 timestamp: snap.data().timestamp,
//                 readed: false,
//               })
//               .then();
//           }
//         } else {
//           functions.logger.log("sender " + snap.data().sender);
//         }
//       });
//     } else {
//       functions.logger.log(
//         "member length " + parentData.data().member.length
//       );
//     }
//   })
//   .catch((e) => functions.logger.error(e));

exports.onUserCreated = functions.auth.user().onCreate((user) => {
  db.doc(`userDetail/${user.uid}`)
    .set({
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    })
    .then();
});

// exports.onMessageStatusChange = functions.firestore
//   .document("userDetail/{userId}/chatmessage/{roomId}")
//   .onUpdate((snap, context) => {
//     if (
//       snap.before.data().readed &&
//       snap.before.data().readed == true &&
//       snap.after.data().readed == false
//     ) {
//       try {
//         db.runTransaction((transaction) => {
//           const trRef = db
//             .collection(`chatrooms/${context.params.roomId}/message/`)
//             .limit(500);
//           // const TrQuery =
//           transaction.get(trRef).then((docs) => {
//             const filteredDoc = docs.docs.filter(
//               (v, i) => !v.data().readedby.includes(context.params.userId)
//             );
//             filteredDoc.map((doc) => {
//               transaction.update(
//                 db.doc(`chatrooms/${context.params.roomId}/message/${doc.id}`),
//                 {
//                   readedby: [...doc.data.readedby, context.params.userId],
//                 }
//               );
//             });
//           });
//         });
//       } catch (e) {
//         functions.logger.error("cannot update readedby : ", e);
//       }
//     }
//   });
