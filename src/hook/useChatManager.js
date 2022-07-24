import React from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, updateProfile } from "firebase/auth";
import { useApp, useTab } from "./local";

const UseChatManager = () => {
  const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
  const { auth, app, db } = useApp();

  const handlePrivateMessage = async (user, id) => {
    const snapshot = await getDocs(
      query(
        collection(db, "chatrooms"),
        where("member", "array-contains", user.uid),
        where("type", "==", "private")
      )
    );
    const docId = snapshot.docs.find((v) => v.data().member.includes(id));
    if (docId) {
      changeTab(docId.id);
    } else {
      const ref = await addDoc(collection(db, "chatrooms"), {
        member: [user.uid, id],
        type: "private",
      });
      changeTab(ref.id);
    }
  };

  const handleCommuGroupMessage = async (user, gid, groupName) => {
    const snapshot = await getDocs(
      query(
        collection(db, "chatrooms"),
        where("type", "==", "group"),
        where("gid", "==", gid)
      )
    );
    if (!snapshot.empty) {
      const docId = snapshot.docs[0];
      changeTab(docId.id);
    } else {
        const ref = await addDoc(collection(db, "chatrooms"), {
          member: [user.uid],
          type: "group",
          name: groupName,
        });
        await updateDoc(doc(db, "group", gid),{
          mainchatgroup: ref.id
        })
        changeTab(ref.id);
      }
    }

  const goToCommuGroupMessage = async (data, id, user) => {
    // console.log(Object.keys(data.member).includes(user.uid))
    if (data.mainchatgroup) {
      if (Object.keys(data.member).includes(user.uid)) {
        console.log("case 1")
        changeTab(data.mainchatgroup);
      } else {
        console.log("case 2")
        await updateDoc(doc(db, "chatrooms", id), {
          member: arrayUnion(user.uid),
        });
        changeTab(data.mainchatgroup);
      }
    } else {
      alert("คอมมูยังไม่มีแช็ทกลุ่ม")
    }
  };

  return {
    handlePrivateMessage,
    handleCommuGroupMessage,
    goToCommuGroupMessage,
  };
};

export default UseChatManager;
