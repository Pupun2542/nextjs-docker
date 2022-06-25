import React from "react";
import {
  addDoc,
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

const UseChatManager = (isOpen, onOpen, onClose) => {
  const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
  const { auth, app, db } = useApp();

  // const handleMessage = (user, id) => {
  //   let roomId = "";
  //   getDocs(
  //     query(
  //       collection(db, "chatrooms"),
  //       where("member", "array-contains", user.uid),
  //       where("type", "==", "private")
  //     )
  //   ).then((docs) => {
  //     if (!docs.empty) {
  //       const docId = docs.docs.find((v) => v.data().member.includes(id));
  //       if (docId) {
  //         changeTab(docId.data().id);
  //       } else {
  //         addDoc(collection(db, "chatrooms"), {
  //           member: [user.uid, id],
  //           type: "private",
  //         }).then((created) => {
  //           roomId = created.id;
  //           updateDoc(doc(db, "chatrooms", created.id), {
  //             id: created.id,
  //           }).then(() => changeTab(created.id));
  //         });
  //       }
  //     } else {
  //       addDoc(collection(db, "chatrooms"), {
  //         member: [user.uid, id],
  //         type: "private",
  //       }).then((created) => {
  //         roomId = created.id;
  //         changeTab(roomId);
  //         updateDoc(doc(db, "chatrooms", created.id), {
  //           id: created.id,
  //         }).then(() => changeTab(created.id));
  //       });
  //     }
  //   });
  // };

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

  return { handlePrivateMessage };
};

export default UseChatManager;
