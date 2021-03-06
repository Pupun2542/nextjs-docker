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

  const handleCommuGroupMessage = async (user, gid, group) => {
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
          name: group.name,
          gid: gid,
          thumbnail: group.bannersqr || ""
        });
        await updateDoc(doc(db, "group", gid),{
          mainchatgroup: ref.id
        })
        changeTab(ref.id);
      }
    }

  const goToCommuGroupMessage = async (gid, user) => {
    const snapshot = await getDocs(
      query(
        collection(db, "chatrooms"),
        where("type", "==", "group"),
        where("gid", "==", gid)
      )
    );
    if (!snapshot.empty) {
      const docId = snapshot.docs[0];
      if (docId.data().member.includes(user.uid)) {
        changeTab(docId.id);
      } else {
        await updateDoc(doc(db, "chatrooms", docId.id), {
          member: arrayUnion(user.uid),
        });
        changeTab(docId.id);
      }
    } else {
      alert("??????????????????????????????????????????????????????????????????")
    }
  };

  return {
    handlePrivateMessage,
    handleCommuGroupMessage,
    goToCommuGroupMessage,
  };
};

export default UseChatManager;
