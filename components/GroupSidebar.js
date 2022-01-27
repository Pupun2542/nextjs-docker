import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import style from "../styles/groupsidebar.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp } from "../src/hook/local";
import { useRouter } from "next/router";

function GroupSidebar() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
      const Fetchdata = async () => {
        if(user){
          const q = query(
            collection(db, "group"),
            where("Creator", "==", user.uid)
          );
          const QuerySnapshot = await getDocs(q);
          QuerySnapshot.docs.map((doc) => doc.data());
          setCommu(
            QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setLoading(false);
        }
      };
      Fetchdata();
    }, [user]);
    if (user) {

      
      return (
        <div>
          {!loading &&
            commu.map((value, index) => {
              // console.log(value.id);
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
    return <div></div>
  };
  return CurrentUser();

  // console.log(commu.length);
}

export default GroupSidebar;
