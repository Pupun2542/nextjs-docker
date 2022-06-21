import React, { useEffect, useState } from "react";
import { getDocs, collection, where, query } from "firebase/firestore";
import { useApp } from "./local";

const useUserSearch = () => {
  const [searchStr, setSearchStr] = useState("");
  const [result, setResult] = useState([]);
  const {db} = useApp();
  useEffect(() => {
    const search = async () => {
      const snap = await getDocs(
        query(
          collection(db, "userDetail"),
          where("displayName", ">=", searchStr),
          where("displayName", "<", searchStr + "\uf8ff")
        )
      );
      if (!snap.empty) {
        setResult(
          snap.docs.map((doc) => ({
            uid: doc.data().uid,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
          }))
        );
      }
    };
    if (searchStr.length > 2) {
      search();
    } else {
        setResult([]);
    }
  }, [searchStr]);

  return { searchStr, setSearchStr, result };
};

export default useUserSearch;
