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
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
          })
          .then()
      );
    }
  });

exports.onChatAdd = functions.firestore
  .document("chatrooms/{chatRoomId}/message/{messageId}")
  .onCreate((snap, context) => {
    db.doc(`chatrooms/${context.params.chatRoomId}`)
      .get()
      .then((parentData) => {
        if (parentData.member.length > 0) {
          parentData.data().member.map((target) => {
            if (target.id !== snap.data().sender) {
              db.collection(`userDetail/${target.id}/chatMessage`)
                .add({
                  thumbnail: parentData.data().thumbnail,
                  chatroom: parentData.data().id,
                  message: snap.data().message,
                  name: parentData.data().name,
                  timestamp: admin.firestore.FieldValue.serverTimestamp(),
                })
                .then();
            }
          });
        }
      });
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
