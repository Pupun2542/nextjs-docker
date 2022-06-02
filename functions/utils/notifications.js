const {admin, db} = require("../utils/admin");

exports.sendNotifications = (reciever, type, triggerer, group, object) =>{
  db.collection("notifications").add({
    reciever: reciever,
    notitype: type,
    triggerer: triggerer,
    group: group,
    object: object,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
  });
};
