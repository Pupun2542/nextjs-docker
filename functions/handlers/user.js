const {db, admin} = require("../utils/admin");

exports.getuser = (req, res) =>{
  db.collection("userDetail").doc(req.params.uid).get().then((doc)=>{
    if (doc.exists) {
      return res.status(200).json(doc.data());
    }
  });
};

exports.getbatchUser = async (req, res) =>{
  const toget = req.body.users;
  console.log(toget);
  if (toget && Array.isArray(toget)) {
    let identifiers = [];
    toget.map((user)=>{
      identifiers = [...identifiers, {uid: user}];
    });
    try {
      const tosend = await admin.auth().getUsers(identifiers);
      const users = tosend.users.map((user)=>({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }),
      );
      return res.status(200).json(users);
    } catch (error) {
      res.status(400).send("bad request");
    }
  } else {
    return res.status(400).send("uid must be in array format");
  }
};
