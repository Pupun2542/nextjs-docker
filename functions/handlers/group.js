/* eslint-disable max-len */
const {admin, db} = require("../utils/admin");
const {sendNotifications} = require("../utils/notifications");

exports.createGroup = (req, res) => {
  const data = req.body;
  if (req.user) {
    return db.collection("group")
        .add({
          name: data.name.trim(),
          creator: req.user.uid,
          type: data.type,
          privacy: data.privacy,
          tag: data.tag,
          description: data.description.trim(),
          maxplayer: data.maxplayer,
          genre: data.genre,
          contactlink: data.contactlink,
          place: data.places,
          times: data.times,
          tws: data.tws,
          startDate: data.startDate,
          startDateRaw: data.startDateraw,
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
          member: [req.user.uid],
          commentuser: [],
          staff: [req.user.uid, ...data.staff],
          registrationlink: data.registrationlink,
          statuschecklink: data.statuschecklink,
          // banner916: data.banner916,
          // bannersqr: data.bannersqr,
          banner: data.bannerUrl,
          doclink: data.docUrl,
        })
        .then((ref) => {
          return res.status(200).send(ref.id);
        })
        .catch((e) => {
          return res.status(400).send("cannot add group : ", e);
        });
  } else {
    return res.status(401).send("forbidden : you must login to create group");
  }
};

exports.updateGroup = async (req, res) => {
  if (req.user) {
    const user = req.user.uid;
    const data = req.body;
    const docref = db.collection("group").doc(req.params.id);
    const doc = await docref.get();
    if (doc.exists) {
      await docref.update({
        name: data.name,
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
        startDateRaw: data.startDateraw,
        rating: data.rating,
        rule: data.rule,
        averageTime: data.averageTime,
        averageTimeUnit: data.averageTimeUnit,
        config: data.config,
        registrationlink: data.registrationlink,
        statuschecklink: data.statuschecklink,
        // banner916: data.banner916,
        // bannersqr: data.bannersqr,
        banner: data.bannerUrl,
        doclink: data.docUrl,
        commentcount: 0,
        commentuser: [],
      });
      sendNotifications([...doc.data().staff, ...doc.data().pinned], "002", user, req.params.id, "", `group/${req.params.id}`);
      return res.status(200).send("update group sucessful");
    } else {
      return res.status(403).send("forbidden");
    }
  } else {
    return res.status(401).send("unauthorized");
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
exports.acceptPlayer = (req, res)=>{
  // staff กด
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          return doc.ref.update({
            "member": admin.firestore.FieldValue.arrayUnion(id),
            "pendingmember": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            sendNotifications([...doc.data().staff, req.body.id], "007", user, req.params.id, id, `group/${req.params.id}/dashboard`);
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
  // staff กด
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "member": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            sendNotifications([...doc.data().staff, id], "008", user, req.params.id, id, `group/${req.params.id}`);
            return res.status(200).send("remove member success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove member : ", e);
          });
        }
      }
    });
  }
};
exports.joinGroup = (req, res)=>{
  // user กด
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      "pendingmember": admin.firestore.FieldValue.arrayUnion(user),
    }).then(()=>{
      docref.get().then((doc)=>{
        sendNotifications(doc.data().staff, "009", user, req.params.id, "", `group/${req.params.id}/dashboard?tab=member`);
      });
      return res.status(200).send("add new member success");
    }).catch((e)=>{
      return res.status(400).send("cannot add new member : ", e);
    });
  }
};
exports.rejectPendingPlayer = (req, res) =>{
  // staff กด
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "pendingmember": admin.firestore.FieldValue.arrayRemove(id),
          }).then(()=>{
            sendNotifications([...doc.data().staff, req.body.id], "010", user, req.params.id, id, `group/${req.params.id}`);
            return res.status(200).send("remove member success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove member : ", e);
          });
        }
      }
    });
  }
};

exports.invitePlayer = async (req, res)=>{
  // user กด
  if (req.user) {
    const user = req.user.uid;
    const ids = req.body.id;
    // console.log(id);
    const groupref = db.collection("group").doc(req.params.id);
    const batch = db.batch();
    const group = await groupref.get();
    if (group.exists) {
      if (group.data().staff.includes(user)) {
        const pending = ids.map((i)=> i.uid);
        pending.map((i)=> batch.update(groupref, "member", admin.firestore.FieldValue.arrayUnion(i)));
        await batch.commit();
        pending.forEach((i)=> {
          sendNotifications([...group.data().staff, ...pending], "011", user, req.params.id, i, `group/${req.params.id}/dashboard`);
        });
        return res.status(200).send("success");
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("group no foud");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.cancelPending = (req, res) =>{
  // user กด
  if (req.user) {
    const user = req.user.uid;
    const id = req.body.id;
    db.collection("group").doc(req.params.id).get().then((doc)=>{
      if (doc.exists) {
        if (doc.data().pendingmember.includes(user)) {
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
        if (doc.data().staff.includes(user)) {
          doc.ref.update({
            "staff": admin.firestore.FieldValue.arrayUnion(id),
            "member": admin.firestore.FieldValue.arrayUnion(id),
          }).then(()=>{
            sendNotifications([...doc.data().staff, req.body.id], "005", user, req.params.id, id, `group/${req.params.id}`);
            return res.status(200).send("add new staff success");
          }).catch((e)=>{
            return res.status(400).send("cannot add new staff : ", e);
          });
        } else {
          return res.status(403).send("forbidden");
        }
      } else {
        return res.status(404).send("not found");
      }
    });
  } else {
    return res.status(401).send("unauthorized");
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
            sendNotifications([...doc.data().staff, req.body.id], "006", user, req.params.id, id, `group/${req.params.id}/`);
            return res.status(200).send("remove staff success");
          }).catch((e)=>{
            return res.status(400).send("cannot remove staff : ", e);
          });
        }
      }
    });
  }
};

exports.addChara = async (req, res) =>{
  if (req.user) {
    const groupRef = db.collection("group").doc(req.params.id);
    const groupdoc = await groupRef.get();
    if (groupdoc.exists&&groupdoc.data().member.includes(req.user.uid)) {
      const addRes = await groupRef.collection("chara").add({
        name: req.body.name,
        photoURL: req.body.photoURL,
        parentId: req.user.uid,
        docLink: req.body.docLink,
        description: req.body.description,
      });
      await db.runTransaction(async (trans)=> {
        const ref = await trans.get(groupRef);
        trans.update(groupRef, {
          chara: {...ref.data().chara, [addRes.id]: {
            name: req.body.name,
            photoURL: req.body.photoURL,
            parentId: req.user.uid,
            refererId: addRes.id,
            description: req.body.description,
            docLink: req.body.docLink,
          }},
        });
      });
      return res.status(200).json({
        name: req.body.name,
        photoURL: req.body.photoURL,
        description: req.body.description,
        parentId: req.user.uid,
        refererId: addRes.id,
      });
    } else {
      return res.status(403).send("forbidden");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.removeChara = async (req, res) =>{
  if (req.user) {
    const groupRef = db.collection("group").doc(req.params.id);
    await db.runTransaction(async (trans)=> {
      const doc = await trans.get(groupRef);
      if (doc.exists) {
        const entries = Object.entries(doc.data().chara);
        const newEntries = entries.filter(([k, v], i)=> k != req.body.caid);
        const obj = Object.fromEntries(newEntries);
        trans.update(groupRef, {
          chara: obj,
        });
      } else {
        return res.status(404).send("group not found");
      }
    });
    await groupRef.collection("chara").doc(req.body.caid).delete();
    return res.status(200).send("delete success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.updateChara = async (req, res) => {
  if (req.user) {
    const groupRef = db.collection("group").doc(req.params.id);
    await db.runTransaction(async (trans)=> {
      const doc = await trans.get(groupRef);
      if (doc.exists) {
        const newObj = {...doc.data().chara, [req.body.caid]: {
          ...doc.data().chara[req.body.caid],
          name: req.body.name,
          photoURL: req.body.photoURL,
          description: req.body.description,
          docLink: req.body.docLink,
        }};
        trans.update(groupRef, {
          chara: newObj,
        });
      } else {
        return res.status(404).send("group not found");
      }
    });
    await groupRef.collection("chara").doc(req.body.caid).update({
      name: req.body.name,
      photoURL: req.body.photoURL,
      docLink: req.body.docLink,
      description: req.body.description,
    });
    return res.status(200).send("delete success");
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.groupLove = (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    docref.update({
      love: admin.firestore.FieldValue.arrayUnion(user),
    }).then(()=>{
      docref.get().then((doc)=>{
        sendNotifications(doc.data().staff, "004", user, req.params.id, "", `group/${req.params.id}/`);
      });
      return res.status(200).send("loved");
    }).catch((e)=>{
      return res.status(400).send("cannot love : ", e);
    });
  } else {
    return res.status(401).send("unauthorized");
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
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.groupPin = async (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    const userdocref = db.collection("userDetail").doc(user);
    const doc = await docref.get();
    if (doc.exists) {
      const batch = db.batch();
      batch.update(docref, {
        pinned: admin.firestore.FieldValue.arrayUnion(user),
      });
      batch.update(userdocref, {
        pinned: admin.firestore.FieldValue.arrayUnion(req.params.id),
      });
      await batch.commit();
      sendNotifications(doc.data().staff, "003", user, req.params.id, "", `group/${req.params.id}`);
      return res.status(200).send("pinned");
    } else {
      return res.status(404).send("not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
exports.groupUnpin = async (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const docref = db.collection("group").doc(req.params.id);
    const userdocref = db.collection("userDetail").doc(user);
    const doc = await docref.get();
    if (doc.exists) {
      const batch = db.batch();
      batch.update(docref, {
        pinned: admin.firestore.FieldValue.arrayRemove(user),
      });
      batch.update(userdocref, {
        pinned: admin.firestore.FieldValue.arrayRemove(req.params.id),
      });
      await batch.commit();
      return res.status(200).send("unpinned");
    } else {
      return res.status(404).send("not found");
    }
  } else {
    return res.status(401).send("unauthorized");
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
      if (data.privacy == "private" && req.user && data.member.includes(req.user.uid) || data.privacy != "private") {
        let identifiers = [];
        doc.data().member.map((mem)=> {
          identifiers = [...identifiers, {uid: mem}];
        });
        doc.data().commentuser.map((mem)=> {
          identifiers = [...identifiers, {uid: mem}];
        });
        if (doc.data().pendingmember) {
          doc.data().pendingmember.map((mem)=> {
            identifiers = [...identifiers, {uid: mem}];
          });
        }
        const identifierschk = identifiers.reduce((all, one, i) => {
          const ch = Math.floor(i/100);
          all[ch] = [].concat((all[ch]||[]), one);
          return all;
        }, []);

        Promise.all(identifierschk.map((identifiers)=> admin.auth().getUsers(identifiers))).then((result)=>{
          const member = result[0];
          let grpmember = {};
          member.users.map((auser)=>{
            grpmember = {...grpmember,
              [auser.uid]: {
                uid: auser.uid,
                displayName: auser.displayName,
                photoURL: auser.photoURL,
              }};
          });
          const arrgrpmember = Object.entries(grpmember);
          let mappeddocdata = {
            ...doc.data(),
            creator: Object.fromEntries([arrgrpmember.find(([k, v])=>v.uid === doc.data().creator)]),
            member: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().member.includes(v.uid))),
            staff: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().staff.includes(v.uid))),
            commentuser: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().commentuser.includes(v.uid))),
          };
          if (doc.data().chara) {
            // console.log(doc.data().chara);
            const arrgrpchara = Object.entries(doc.data().chara);
            // console.log(arrgrpchara);
            let newChara = [];
            arrgrpchara.map(([k, v])=> {
              console.log(v.parentId);
              const refname = grpmember[v.parentId].displayName;
              newChara = [...newChara, [k, {...v, parentName: refname}]];
            });
            // console.log(Object.fromEntries(newChara));
            mappeddocdata = {
              ...mappeddocdata,
              chara: Object.fromEntries(newChara),
            };
          }
          if (doc.data().pendingmember) {
            mappeddocdata = {
              ...mappeddocdata,
              pendingmember: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>doc.data().pendingmember.includes(v.uid))),
            };
          }
          const senddata = {...data, ...mappeddocdata};
          return res.status(200).json(senddata);
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

exports.addAlbum = async (req, res) => {
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const group = await groupref.get();
    if (group.exists && group.data().member.includes(req.user.uid)) {
      const data = req.body.data;
      await groupref.collection("album").doc(req.body.aid).set({
        "name": data.name,
        "type": data.type,
        "uid": data.uid,
        "description": data.description,
        "thumbnail": data.thumbnail,
        "mediaList": data.mediaList,
      });
      return res.status(200).send("create album success");
    } else {
      return res.status(403).send("forbidden");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};

exports.getAlbums = async (req, res) => {
  if (req.user) {
    const groupref = db.collection("group").doc(req.params.gid);
    const group = await groupref.get();
    if (group.exists && group.data().member.includes(req.user.uid)) {
      const albumsnapshot = await groupref.collection("album").get();
      const albums = albumsnapshot.docs.map((doc)=>doc.data());
      return albums;
    } else {
      return res.status(403).send("forbidden");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};


