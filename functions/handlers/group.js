/* eslint-disable max-len */
const {admin, db} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createGroup = (req, res) => {
  const data = req.body;
  if (req.user) {
    db.collection("group")
        .add({
          name: data.name,
          creator: req.user.uid,
          type: data.type,
          privacy: data.privacy,
          tag: data.tag,
          description: data.description,
          maxplayer: data.maxplayer,
          genre: data.genre,
          contactlink: data.contactlink,
          place: data.places,
          times: data.times,
          tws: data.tws,
          startDate: data.startDate,
          // startDateRaw: data.startDateraw,
          rating: data.rating,
          rule: data.rule,
          averageTime: data.averageTime,
          averageTimeUnit: data.averageTimeUnit,
          createAt: admin.firestore.FieldValue.serverTimestamp(),
          config: data.config,
          lastpush: admin.firestore.FieldValue.serverTimestamp(),
          viewer: [],
          love: [],
          pinned: [],
          members: [],
          staff: [req.user.uid],
          registrationlink: data.registrationlink,
          statuschecklink: data.statuschecklink,
          banner916: data.banner916,
          bannersqr: data.bannersqr,
          banner: data.bannerurl,
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
      name: data.name,
      creator: data.creator,
      type: data.type,
      privacy: data.privacy,
      tag: data.tag,
      description: data.description,
      maxplayer: data.maxplayer,
      genre: data.genre,
      contactlink: data.contactlink,
      place: data.places,
      times: data.times,
      tws: data.tws,
      startDate: data.startdate,
      // startDateRaw: data.startdateraw,
      rating: data.rating,
      rule: data.rule,
      averageTime: data.averageTime,
      averageTimeUnit: data.averageTimeUnit,
      config: data.config,
      registrationlink: data.registrationlink,
      statuschecklink: data.statuschecklink,
      banner916: data.banner916,
      bannersqr: data.bannersqr,
      banner: data.bannerurl,
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
    res.status(401).send("unauthorized");
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
              return doc.ref.delete()
                  .then(() => {
                    return res.status(200).send("delete group sucessful");
                  })
                  .catch((e) => {
                    return res.status(400).send("cannot delete group : ", e);
                  });
            } else {
              return res.status(401).send("unauthorized");
            }
          } else {
            return res.status(404).send("group not found");
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
          return doc.ref.update({
            "member": admin.firestore.FieldValue.arrayUnion(id),
          }).then(()=>{
            sendNotifications(doc.data().staff, "007", user, doc.data().name, id, `${doc.id}`);
            return res.status(200).send("add new member success");
          }).catch((e)=>{
            return res.status(400).send("cannot add new member : ", e);
          });
        }
        return res.status(401).send("unauthorized");
      }
      return res.status(404).send("group not found");
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
              let grpmember = {};
              admin.auth().getUsers(doc.data().member).then((member)=>{
                member.users.map((auser)=>{
                  grpmember = {...grpmember,
                    [auser.uid]: {
                      uid: auser.uid,
                      displayName: auser.displayName,
                      photoURL: auser.photoURL,
                    }};
                });
                const arrgrpmember = Object.entries(grpmember);
                const mappeddocdata = {
                  ...doc.data(),
                  creator: Object.fromEntries(arrgrpmember.find(([k, v])=>v.id === doc.data().creator)),
                  member: grpmember,
                  staff: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().staff.includes(v.id))),
                };
                data = [...data, mappeddocdata];
                return;
              });
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
            snap.forEach((doc) => {
              let grpmember = {};
              admin.auth().getUsers(doc.data().member).then((member)=>{
                member.users.map((auser)=>{
                  grpmember = {...grpmember,
                    [auser.uid]: {
                      uid: auser.uid,
                      displayName: auser.displayName,
                      photoURL: auser.photoURL,
                    }};
                });
                const arrgrpmember = Object.entries(grpmember);
                const mappeddocdata = {
                  ...doc.data(),
                  creator: Object.fromEntries(arrgrpmember.find(([k, v])=>v.id === doc.data().creator)),
                  member: grpmember,
                  staff: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().staff.includes(v.id))),
                };
                data = [...data, mappeddocdata];
                return;
              });
            });
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
  // const user = req.user.uid;
  // res.status(200).send("test success");
  db.collection("group").doc(req.params.gid).get().then((doc)=>{
    if (doc.exists) {
      const data = doc.data();
      // console.log(data.privacy, req.user, data.member);
      if (data.privacy == "private" && req.user && data.member.includes(req.user.uid) || data.privacy != "private") {
        let identifiers = [];
        doc.data().member.map((mem)=> {
          identifiers = [...identifiers, {uid: mem}];
        });
        admin.auth().getUsers(identifiers).then((member)=>{
          // console.log(member.users);
          let grpmember = {};
          member.users.map((auser)=>{
            grpmember = {...grpmember,
              [auser.uid]: {
                uid: auser.uid,
                displayName: auser.displayName,
                photoURL: auser.photoURL,
              }};
          });
          // console.log("405:", grpmember);
          const arrgrpmember = Object.entries(grpmember);
          // console.log("407", arrgrpmember);
          // console.log("408", arrgrpmember.find(([k, v])=>v.uid === doc.data().creator));

          const mappeddocdata = {
            ...doc.data(),
            creator: Object.fromEntries([arrgrpmember.find(([k, v])=>v.uid === doc.data().creator)]),
            member: grpmember,
            staff: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().staff.includes(v.uid))),
          };
          const senddata = {...data, ...mappeddocdata};
          console.log("before send");
          return res.status(200).json(senddata);
          // return res.status(200).json("sent");
        });
      } else {
        return res.status(403).send("this is private group");
      }
    } else {
      return res.status(404).send("cannot find group");
    }
  });
};
exports.JoinDebug = (req, res) =>{
  if (req.user) {
    // const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.gid).get().then((doc)=>{
      if (doc.exists) {
        return doc.ref.update({
          "member": admin.firestore.FieldValue.arrayUnion(id),
        }).then(()=>{
          // sendNotifications(doc.data().staff, "007", user, doc.data().name, id, `${doc.id}`);
          return res.status(200).send("add new member success");
        }).catch((e)=>{
          return res.status(400).send("cannot add new member : ", e);
        });
      }
      return res.status(404).send("group not found");
    });
  } else {
    return res.status(401).send("unauthorized");
  }
  // return res.status(200).send("add new member success");
};
