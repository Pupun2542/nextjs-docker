/* eslint-disable max-len */
const {db, admin} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.getuser = (req, res) => {
  db.collection("userDetail")
      .doc(req.params.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(200).json(doc.data());
        }
      });
};

exports.getDetailedUsers = async (req, res) => {
  const snap = await db
      .collection("userDetail")
      .where("uid", "in", req.body.users)
      .get();
  if (!snap.empty) {
    console.log(req.body.users);
    console.log(snap.docs);
    return res.status(200).json(snap.docs.map((doc)=>doc.data()));
  } else {
    return res.status(404).send("users not found");
  }
};

exports.getbatchUser = async (req, res) => {
  const toget = req.body.users;
  // console.log(toget);
  if (toget && Array.isArray(toget)) {
    let identifiers = [];
    toget.map((user) => {
      identifiers = [...identifiers, {uid: user}];
    });
    try {
      const tosend = await admin.auth().getUsers(identifiers);
      const users = tosend.users.map((user) => ({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }));
      return res.status(200).json(users);
    } catch (error) {
      res.status(400).send("bad request");
    }
  } else {
    return res.status(400).send("uid must be in array format");
  }
};

exports.getUserByName = async (req, res) => {
  const toget = req.body.user;
  const tosend = await admin.auth().getUsers([{displayName: toget}]);
  const users = tosend.users.map((user) => ({
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  }));
  return res.status(200).json(users);
};

exports.addfriend = async (req, res) => {
  if (req.user) {
    if (req.body.uid) {
      const userref = db.collection("userDetail").doc(req.body.uid);
      const result = await userref.get();
      if (result.exists) {
        if (result.data().pendingFriend && !result.data().pendingFriend.includes(req.user.uid)) {
          await userref.update({
            pendingFriend: admin.firestore.FieldValue.arrayUnion(req.user.uid),
          });
          sendNotifications(req.body.uid, "301", req.user.uid, "", "", `/profile/${req.body.uid}?tab=friend`);
          return res.status(200).send("requst friend complete");
        } else {
          if (!result.data().pendingFriend) {
            await userref.update({
              pendingFriend: admin.firestore.FieldValue.arrayUnion(req.user.uid),
            });
            sendNotifications(req.body.uid, "301", req.user.uid, "", "", `/profile/${req.body.uid}?tab=friend`);
            return res.status(200).send("requst friend complete");
          } else {
            return res.status(400).send("already requst friend");
          }
        }
      } else {
        return res.status(404).send("user not found");
      }
    } else {
      return res.status(404).send("user not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.removefriend = async (req, res) => {
  if (req.user) {
    if (req.body.uid) {
      const batch = db.batch();
      const userref = db.collection("userDetail").doc(req.body.uid);
      const userref2 = db.collection("userDetail").doc(req.user.uid);
      batch.update(userref, {
        friend: admin.firestore.FieldValue.arrayRemove(req.body.uid),
      });
      batch.update(userref2, {
        friend: admin.firestore.FieldValue.arrayRemove(req.body.uid),
      });
      await batch.commit();
      return res.status(200).send("remove friend complete");
    } else {
      return res.status(404).send("user not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.acceptfriend = async (req, res) => {
  if (req.user) {
    if (req.body.uid) {
      const docref1 = db.collection("userDetail").doc(req.user.uid);
      const docref2 = db.collection("userDetail").doc(req.body.uid);
      const result = await docref1.get();
      if (result.exists) {
        if (result.data().pendingFriend.includes(req.body.uid)) {
          const batch = db.batch();
          batch.update(docref1, {
            friend: admin.firestore.FieldValue.arrayUnion(req.body.uid),
          });
          batch.update(docref2, {
            friend: admin.firestore.FieldValue.arrayUnion(req.user.uid),
          });
          batch.update(docref1, {
            pendingFriend: admin.firestore.FieldValue.arrayRemove(req.body.uid),
          })
          await batch.commit();
          sendNotifications(req.body.uid, "302", req.user.uid, "", "", `/profile/${req.user.uid}`);
          return res.status(200).send("remove friend complete");
        }
      }
    }
  }
};
exports.rejectfriend = async (req, res) => {
  if (req.user) {
    if (req.body.uid) {
      const userref = db.collection("userDetail").doc(req.user.uid);
      const result = await userref.get();
      if (result.exists) {
        if (result.data().pendingFriend.includes(req.body.uid)) {
          await userref.update({
            pendingFriend: admin.firestore.FieldValue.arrayRemove(req.body.uid),
          });
          return res.status(200).send("remove friend complete");
        } else {
          return res.status(400).send("not pending friend");
        }
      } else {
        return res.status(404).send("user not found");
      }
    } else {
      return res.status(404).send("user not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.removeaddfriend = async (req, res) => {
  if (req.user) {
    if (req.body.uid) {
      const userref = db.collection("userDetail").doc(req.body.uid);
      const result = await userref.get();
      if (result.exists) {
        if (result.data().pendingFriend.includes(req.user.uid)) {
          await userref.update({
            pendingFriend: admin.firestore.FieldValue.arrayRemove(req.user.uid),
          });
          return res.status(200).send("remove friend complete");
        } else {
          return res.status(400).send("not pending friend");
        }
      } else {
        return res.status(404).send("user not found");
      }
    } else {
      return res.status(404).send("user not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
