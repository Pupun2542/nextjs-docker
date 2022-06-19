/* eslint-disable max-len */
const {db} = require("../utils/admin");

exports.getChatHeader = async (req, res) =>{
  if (req.user) {
    const user = req.user.uid;
    const doc = await db.collection("chatrooms").doc(req.params.crid).get();
    if (doc.exists) {
      if (doc.data().member.includes(user)) {
        return res.status(200).json(doc.data());
        //     const identifierschk = doc.data().member.reduce((all, one, i) => {
        //       const ch = Math.floor(i/100);
        //       all[ch] = [].concat((all[ch]||[]), one);
        //       return all;
        //     }, []);
        //     // const userDetail = [];
        //     const userDetail = await Promise.all(identifierschk.map(async (identifiers)=>{
        //       const newidentifers = identifiers.map((id)=>{
        //         return {uid: id};
        //       });
        //       return await admin.auth().getUsers(newidentifers);
        //     }));
        //     const spreadUserDetail = userDetail.map((detail)=>(detail.users));
        //     const mergedUserDetail = [].concat(...spreadUserDetail);
        //     const mappedUserData = mergedUserDetail.map((detail)=>({
        //       uid: detail.uid,
        //       displayName: detail.displayName,
        //       photoURL: detail.photoURL,
        //     }));
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
