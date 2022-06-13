const {admin, db} = require("./admin");

module.exports = (req, res, next) =>{
  let idToken;
  // console.log(req.headers.authorization);
  if (req.headers.authorization) {
    idToken = req.headers.authorization;
    admin.auth().verifyIdToken(idToken).then((decodedToken)=>{
      req.user = decodedToken;
      // console.log(decodedToken);
      return db.collection("userDetail").doc(req.user.uid).get().then((doc)=>{
        if (doc.exists) {
          return next();
        }
        return res.status(403).send("error while verifying token ");
      });
    }).catch((e)=>{
      return res.status(403).send("error while verifying token ", e);
    });
  } else {
    // console.log(req.headers);
    req.user = undefined;
    return next();
  }
};
