/* eslint-disable max-len */
const {db} = require("../utils/admin");

exports.getChatHeader = async (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const doc = await db.collection("chatrooms").doc(req.params.crid).get();
    if (doc.exists) {
      if (doc.data().member.includes(user)) {
        return res.status(200).json(doc.data());
      } else {
        return res.status(403).send("forbidden");
      }
    } else {
      return res.status(404).send("not found");
    }
  } else {
    return res.status(401).send("unauthorized");
  }
};
