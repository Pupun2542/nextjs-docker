const {admin} = require("./admin");
exports.getUsersById = async (id) => {
  let identifiers = [];
  id.map((idd)=> {
    identifiers = [...identifiers, {uid: idd}];
  });
  const identifierschk = identifiers.reduce((all, one, i) => {
    const ch = Math.floor(i/100);
    all[ch] = [].concat((all[ch]||[]), one);
    return all;
  }, []);
  let grpmember = {};
  await Promise.all(identifierschk.map(async (identifiers)=>{
    const result = await admin.auth().getUsers(identifiers);
    result.users.map((auser)=>{
      grpmember = {...grpmember,
        [auser.uid]: {
          uid: auser.uid,
          displayName: auser.displayName,
          photoURL: auser.photoURL,
        }};
    });
  }));
  return grpmember;
};
