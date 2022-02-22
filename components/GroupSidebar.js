import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import style from "../styles/groupsidebar.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp } from "../src/hook/local";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

function GroupSidebar() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  const CurrentUser = () => {
    const [user, load, error] = useAuthState(auth);
    useEffect(() => {
      const Fetchdata = async () => {
        if (user) {
          const ref = await getDoc(doc(db, "userDetail", user.uid));

          if(ref.exists()){
            const pinned = ref.data().PinnedGroup;
            if (pinned){
              const q = query(
                collection(db, "group"),
                where("__name__", "in", pinned)
              );
              const QuerySnapshot = await getDocs(q);
              
              setCommu(
                QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              );
            }
            
          }


          setLoading(false);
        }
      };
      Fetchdata();
    }, [user]);
    if (user) {
      return (
        <div>
          <Row>
            <h5 className={style.sideMain} >Main Hall</h5>
            <h5>
              <Menu/>
            </h5>
          </Row>
          <Row>
            <h5 className={style.sidePinned} >Pinned</h5>
            {!loading &&
              commu.map((value, index) => {
                // console.log(value.id);
                return (
                  <div key={index} className={style.pinned}>
                    <Link href={"/group/" + value.id}>
                      <a className={style.textpinned}>
                        <h5>{value.Name}</h5>
                      </a>
                    </Link>
                  </div>
                );
              })}
          </Row>
        </div>
      );
    }
    return <div></div>;
  };
  return CurrentUser();

  // console.log(commu.length);
}

function Menu() {
  return (
    <div>
      <Row className={style.padsidebar}>
        <Link href="/group/">
          <a className={style.sideNewest}> 
            {/* <img src="PngItem_2135957.png" height={30} width={30}></img>&nbsp; */}
          Newest</a>
        </Link>
      </Row>
      <Row className={style.padsidebar}>
        <Link href="/group/?bws=mygroup">
          <a className={style.sideGroup}>
            {/* <img src="PngItem_2135957.png" height={30} width={30}></img>&nbsp; */}
          My Group</a>
        </Link>
      </Row>
    </div>
  );
}

export default GroupSidebar;
