const {db} = require("../utils/admin");

exports.getuser = (req, res) =>{
  db.collection("userDetail").doc(req.params.uid).get().then((doc)=>{
    if (doc.exists) {
      return res.status(200).json(doc.data());
    }
  });
};
