const {db} = require("../utils/admin");

exports.sendNotifications = (reciever, type, triggerer, group, object, path) =>{
  db.collection("notifications").add({
    reciever: reciever,
    notitype: type,
    triggerer: triggerer,
    group: group,
    object: object,
    timestamp: Date.now(),
    path: path,
  });
};
