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
import { Col, Row } from "react-bootstrap";

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
        if (user) {
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
          <Row>
            <h5>Main Hall</h5>
            <h5>
              <Menu />
            </h5>
          </Row>
          <Row>
            <h5>Pinned</h5>
            {!loading &&
              commu.map((value, index) => {
                // console.log(value.id);
                return (
                  <div key={index}>
                    <Link href={"/group/" + value.id}>
                      <a>
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
      <Row>
        <Link href="/group/">
          <a>Newest</a>
        </Link>
      </Row>
      <Row>
        <Link href="/group/?bws=mygroup">
          <a>My Group</a>
        </Link>
      </Row>
    </div>
  );
}

export default GroupSidebar;
