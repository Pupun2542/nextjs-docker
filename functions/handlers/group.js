/* eslint-disable max-len */
const {admin, db} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createGroup = (req, res) => {
  const data = req.body;
  if (req.user) {
    db.collection("group")
        .add({
          name: data.communame,
          creator: data.creator,
          type: data.type,
          privacy: data.privacy,
          tag: data.hashtag,
          description: data.description,
          maxplayer: data.maxplayer,
          genre: data.genre,
          contactlink: data.contactlink,
          place: data.places,
          times: data.times,
          tws: data.TWs,
          startDate: data.startdate,
          startDateRaw: data.startdateraw,
          rating: data.rating,
          rule: data.rule,
          averageTime: data.averagetime,
          averageTimeUnit: data.averagetimeunit,
          createAt: admin.firestore.FieldValue.serverTimestamp(),
          config: data.config,
          lastpush: admin.firestore.FieldValue.serverTimestamp(),
          viewer: [],
          love: [],
          pinned: [],
          members: [data.creator],
          staff: [data.creator],
          registrationlink: data.registrationlink,
          statuschecklink: data.statuschecklink,
        })
        .then(() => {
          res.status(200).send("add group sucessful");
        })
        .catch((e) => {
          res.status(400).send("cannot add group : ", e);
        });
  } else res.status(503).send("forbidden : you must login to create group");
};

exports.updateGroup = (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const data = req.body;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      name: data.communame,
      creator: data.creator,
      type: data.type,
      privacy: data.privacy,
      tag: data.hashtag,
      description: data.description,
      maxplayer: data.maxplayer,
      genre: data.genre,
      contactlink: data.contactlink,
      place: data.places,
      times: data.times,
      tws: data.TWs,
      startDate: data.startdate,
      startDateRaw: data.startdateraw,
      rating: data.rating,
      rule: data.rule,
      averageTime: data.averagetime,
      averageTimeUnit: data.averagetimeunit,
      config: data.config,
      registrationlink: data.registrationlink,
      statuschecklink: data.statuschecklink,
    }).then(() => {
      docref.get().then((doc)=>{
        db.collection("notifications").add({
          reciever: doc.data().staff,
          notitype: "002",
          triggerer: user,
          group: doc.data().name,
          object: "",
          timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
      });
      res.status(200).send("update group sucessful");
    }).catch((e) => {
      res.status(400).send("cannot update group : ", e);
    });
  } else {
    res.status(403).send("forbidden");
  }
};

exports.deleteGroup = (req, res) => {
  if (req.user) {
    db.collection("group")
        .doc(req.params.id)
        .get()
        .then((doc)=>{
          if (doc.exists) {
            if (doc.data().staff.includes(req.user.uid)) {
              doc.ref.delete()
                  .then(() => {
                    res.status(200).send("delete group sucessful");
                  })
                  .catch((e) => {
                    res.status(400).send("cannot delete group : ", e);
                  });
            }
          }
        });
  }
};

exports.addPlayer = (req, res)=>{
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "member": admin.firestore.FieldValue.arrayUnion(id),
          }).then(()=>{
            sendNotifications(doc.data().staff, "007", user, doc.data().name, id);
            return res.status(200).send("add new member success");
          }).catch((e)=>{
            return res.status(400).send("cannot add new member : ", e);
          });
        }
      }
    });
  }
};
exports.removePlayer = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "member": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            sendNotifications(doc.data().staff, "008", user, doc.data().name, id);
            return res.status(200).send("remove member success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove member : ", e);
          });
        }
      }
    });
  }
};
exports.addPendingPlayer = (req, res)=>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      "pendingmember": admin.firestore.FieldValue.arrayUnion(user),
    }).then(()=>{
      docref.get().then((doc)=>{
        sendNotifications(doc.data().staff, "009", user, doc.data().name, "");
        db.collection("notifications").add({
          reciever: doc.data().staff,
          notitype: "009",
          triggerer: user,
          group: doc.data().name,
          object: "",
        });
      });

      return res.status(200).send("add new member success");
    }).catch((e)=>{
      return res.status(400).send("cannot add new member : ", e);
    });
  }
};
exports.removePendingPlayer = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "pendingmember": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            return res.status(200).send("remove member success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove member : ", e);
          });
        }
      }
    });
  }
};

exports.addStaff = (req, res)=>{
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().creator == user) {
          doc.ref.update({
            "staff": admin.firestore.FieldValue.arrayUnion(id),
          }).then(()=>{
            sendNotifications(doc.data().staff, "005", user, doc.data().name, id);
            return res.status(200).send("add new staff success");
          }).catch((e)=>{
            return res.status(400).send("cannot add new staff : ", e);
          });
        }
      }
    });
  }
};
exports.removeStaff = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().creator == user) {
          doc.ref.update({
            "staff": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            sendNotifications(doc.data().staff, "006", user, doc.data().name, id);
            return res.status(200).send("remove staff success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove staff : ", e);
          });
        }
      }
    });
  }
};

exports.addChara = (req, res) =>{
  // todo
};
exports.removeChara = (req, res) =>{
  // todo
};

exports.groupLove = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      love: admin.firestore.FieldValue.arrayUnion(user),
    }).then(()=>{
      docref.get().then((doc)=>{
        sendNotifications(doc.data().staff, "004", user, doc.data().name, "");
      });
      return res.status(200).send("loved");
    }).catch((e)=>{
      return res.status(400).send("cannot love : ", e);
    });
  }
};
exports.groupUnlove = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      love: admin.firestore.FieldValue.arrayRemove(user),
    }).then(()=>{
      return res.status(200).send("unloved");
    }).catch((e)=>{
      return res.status(400).send("cannot unlove : ", e);
    });
  }
};
exports.groupPin = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      pinned: admin.firestore.FieldValue.arrayUnion(user),
    }).then(()=>{
      docref.get().then((doc)=>{
        sendNotifications(doc.data().staff, "003", user, doc.data().name, "");
      });
      return res.status(200).send("loved");
    }).catch((e)=>{
      return res.status(400).send("cannot loved : ", e);
    });
  }
};
exports.groupUnpin = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      love: admin.firestore.FieldValue.arrayRemove(user),
    }).then(()=>{
      return res.status(200).send("loved");
    }).catch((e)=>{
      return res.status(400).send("cannot loved : ", e);
    });
  }
};

exports.getAllGroup = (req, res) => {
  const query = req.query;
  const sortedby =
    query.sortedby && query.sortedby == 1 ? "createAt" : "lastpush";
  const order = query.order && query.order == "asc" ? "asc" : "desc";
  let length = query.loadlength && query.loadlength > 0 ? query.loadlength : 20;
  let data = [];
  if (req.user) {
    db.collection("group")
        .where("privacy", "==", "private")
        .where("member", "array-contains", req.user.uid)
        .orderBy(sortedby, order)
        .limit(length)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            snapshot.forEach((doc) => {
              data = [...data, doc.data()];
            });
            length -= snapshot.size;
          }
          return;
        });
  }
  if (length > 0) {
    db.collection("group")
        .where("privacy", "==", "public")
        .orderBy(sortedby, order)
        .limit(length)
        .get()
        .then((snap) => {
          if (!snap.empty) {
            snap.forEach((doc) => (data = [...data, doc.data()]));
          }
          return;
        });
  }
  if (data.length > 0) {
    res.status(200).json(data);
  } else {
    res.status(404).send("cannot find any group");
  }
};

exports.getGroup = (req, res) =>{
  const user = req.user.uid;
  db.collection("group").doc(req.params.gid).get().then((doc)=>{
    if (doc.exists) {
      const data = doc.data();
      if (data.privacy == "private" && data.member.includes(user)) {
        return res.status(200).json(data);
      } else {
        return res.status(403).send("this is private group");
      }
    } else {
      return res.status(404).send("cannot find group");
    }
  });
};
