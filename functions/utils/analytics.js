const {admin, db} = require("../utils/admin");

exports.addAnalytics = (gid, pid, uid, type) => {
  db.collection("analytics").add({
    pid: pid,
    gid: gid,
    uid: uid,
    type: type,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });
};
