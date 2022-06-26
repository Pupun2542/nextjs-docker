import { doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { useApp, useUser } from "./local";

const useMappedGroupData = (gid) => {
  const { db, auth } = useApp();
  const getUser = useUser();

  const [raw, loading, error] = useDocument(doc(db, "group", gid));
  const [mappedmember, setmappedmember] = useState({});
  const [data, setData] = useState({});
  const fetchuser = async () => {
    const search = await getUser(raw.member)
    
    // setmappedmember(await getUser(raw.member))
  }
    
  
  useEffect(()=> {
    if (!loading) {
        fetchuser();
    }
  },[loading, raw])

  useEffect(()=> {
    if (Object.values(mappedmember).length > 0) {
        const arrgrpmember = Object.entries(mappedmember);
        let mappeddocdata = {
            ...raw,
            creator: Object.fromEntries([arrgrpmember.find(([k, v])=>v.uid === raw.creator)]),
            member: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>raw.member.includes(v.uid))),
            staff: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>raw.staff.includes(v.uid))),
            commentuser: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>raw.commentuser.includes(v.uid))),
          };
          if (raw.chara) {
            const arrgrpchara = Object.entries(raw.chara);
            let newChara = [];
            arrgrpchara.map(([k, v])=> {
              const refname = mappedmember[v.parentId].displayName;
              newChara = [...newChara, [k, {...v, parentName: refname}]];
            });
            mappeddocdata = {
              ...mappeddocdata,
              chara: Object.fromEntries(newChara),
            };
          }
          if (raw.pendingmember) {
            mappeddocdata = {
              ...mappeddocdata,
              pendingmember: Object.fromEntries(arrgrpmember.filter(([k, v], i)=>raw.pendingmember.includes(v.uid))),
            };
          }
    }


  }, mappedmember)

  return <div>useMappedGroupData</div>;
};

export default useMappedGroupData;
