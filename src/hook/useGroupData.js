import { doc, onSnapshot } from "firebase/firestore";
import React, { useRef, useState, useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useApp } from "./local";
import axios from "axios";

export const useGroupData = (gid, user) => {
  // console.log(gid, user)
  const {db} = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listenerData, setListenerData] = useState(null);
  // const [listenerData, listenerLoading, listenerError] = useDocumentData(doc(db, "group", gid));
  const memberRef = useRef(null);
  const charaRef = useRef(null);

  const fetchdata = async () => {
    const token = await user.getIdToken();
    const resdata = await axios.get(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (resdata.status === 200) {
      let mappedData = {
        ...data,
        ...resdata.data,
        isStaff: Object.keys(resdata.data.staff).includes(user.uid),
      };
      if (resdata.data.chara) {
        // console.log(resdata.data.chara);
        // console.log(
        //   Object.fromEntries(
        //     Object.entries(resdata.data.chara).filter(
        //       ([k, v], i) => v.parentId == user.uid
        //     )
        //   )
        // );
        mappedData = {
          ...mappedData,
          mychara: Object.fromEntries(
            Object.entries(resdata.data.chara).filter(
              ([k, v], i) => v.parentId == user.uid
            )
          ),
        };
      }
      memberRef.current = listenerData.member
      charaRef.current = listenerData.chara
      setData(mappedData);
      setLoading(false);
    } else {
      alert("something went wrong")
    }
  };

  useEffect(() => {
    if (listenerData && user && (listenerData.member !== memberRef.current || listenerData.chara !== charaRef.current )) {
      // console.log("algorithm return true")
      fetchdata();
    }
  }, [listenerData, user]);

  useEffect(()=> {
    let unsubscribe = ()=>{};
    if (gid) {
      unsubscribe = onSnapshot(doc(db, "group", gid), (doc)=> {
        if (doc.exists) {
          setListenerData(doc.data());
        }
      })
    }
  }, [gid])

  const onRefresh = () => {
    // fetchdata();
  }

  return {data, loading, onRefresh}

};
