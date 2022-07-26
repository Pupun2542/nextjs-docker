const {db} = require("../utils/admin");

exports.sendNotifications = (
    reciever,
    type,
    triggerer,
    group,
    object,
    path,
    other,
) => {
  if (other) {
    db.collection("notifications").add({
      reciever: reciever,
      notitype: type,
      triggerer: triggerer,
      group: group,
      object: object,
      timestamp: Date.now(),
      path: path,
      other,
    });
  } else {
    db.collection("notifications").add({
      reciever: reciever,
      notitype: type,
      triggerer: triggerer,
      group: group,
      object: object,
      timestamp: Date.now(),
      path: path,
    });
  }
};
