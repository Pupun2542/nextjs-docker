const {admin, db} = require("./admin");

module.exports = (req, res, next) =>{
  let idToken;
  if (req.headers.Authorization) {
    idToken = req.headers.Authorization;
    admin.auth().verifyIdToken(idToken).then((decodedToken)=>{
      req.user = decodedToken;
      // console.log(decodedToken);
      return db.collection("user").doc(req.user.uid).get().then((doc)=>{
        if (doc.exists) {
          return next();
        }
      });
    }).catch((e)=>{
      return res.status(403).send("error while verifying token ", e);
    });
  } else {
    req.user = undefined;
    return next();
  }
};
