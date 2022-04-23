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

exports.onChatAdd = functions.firestore
  .document("chatrooms/{chatRoomId}/message/{messageId}")
  .onCreate((snap, context) => {
    console.log(context.params);
    functions.logger.log("chatroomid " + context.params.chatRoomId);
    db.doc() // `chatrooms/${context.params.chatRoomId}`
      .get()
      .then((parentData) => {
        functions.logger.log("parentdata " + parentData.data());
        functions.logger.log(
          "member length > 0" + parentData.data().member.length > 0
        );
        if (parentData.data().member.length > 0) {
          parentData.data().member.map((target) => {
            functions.logger.log("target " + target);
            if (target !== snap.data().sender) {
              // functions.logger.log("targetId " + target);
              let name = "";
              if (parentData.data().name) {
                name = parentData.data().name;
              }
              if (parentData.data().type === "private") {
                db.collection(`userDetail/${target}/chatMessage`)
                  .add({
                    chatroom: parentData.data().id,
                    message: snap.data().text,
                    name: name,
                    timestamp: snap.data().timeStamp,
                    readed: false,
                  })
                  .then();
              } else {
                db.collection(`userDetail/${target}/chatMessage`)
                  .add({
                    thumbnail: parentData.data().thumbnail,
                    chatroom: parentData.data().id,
                    message: snap.data().text,
                    name: name,
                    timestamp: snap.data().timeStamp,
                    readed: false,
                  })
                  .then();
              }
            } else {
              functions.logger.log("sender " + snap.data().sender);
            }
          });
        } else {
          functions.logger.log(
            "member length " + parentData.data().member.length
          );
        }
      })
      .catch((e) => functions.logger.error(e));
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
