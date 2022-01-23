import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import Link from "next/link";
import { getAuth } from "firebase/auth";

function GroupSidebar() {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchdata = async () => {
      const q = query(
        collection(db, "group"),
        where("Creator", "==", auth.currentUser.uid)
      );
      const QuerySnapshot = await getDocs(q);
      QuerySnapshot.docs.map(doc => doc.data())
      setCommu(QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    Fetchdata();
  }, []);
  // console.log(commu.length);
  return (
    <div>
      {!loading&&commu.map((value, index) => {
        console.log(value.id);
        return (
          <div key={index}>
            <Link href={"/group/" + value.id}>
              <a>
                <h3>{value.Name}</h3>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default GroupSidebar;
