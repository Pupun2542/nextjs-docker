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
import { Fuego, FuegoProvider, useCollection  } from '@nandorojo/swr-firestore'



function GroupSidebar() {
  const app = getApp();
  const fuego = new Fuego(app.options);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  // const [commuData, setCommuData] = useState([]);

  const {data, update, error} = useCollection("group");
  if (error){
    console.log("error")
  }
  if (!data) return (
    <h1>Loading...</h1>
  )




  // useEffect(() => {
  //   const Fetchdata = async () => {
  //     const q = query(
  //       collection(db, "group"),
  //       where("Creator", "==", auth.currentUser.uid)
  //     );
  //     const QuerySnapshot = await getDocs(q);
  //     setCommu(QuerySnapshot.docs.map((doc) => ({ ...doc })));
  //   };
  //   Fetchdata();
  //   // setCommuData(QuerySnapshot.docs.map((doc) => ({ ...doc.data() })));
  // }, []);
  // console.log(commu.length);
  return (
    <div>
      {commu.map((value, index) => {
        // console.log(value.data());
        return (
          <div key={index}>
            <Link href={"/group/" + value.id}>
              <a>
                <h3>LINK</h3>
              </a>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default GroupSidebar;
