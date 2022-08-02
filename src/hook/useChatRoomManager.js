import {
  addDoc,
  collection,
  doc,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  runTransaction,
  arrayUnion,
  getDoc,
  getDocs,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  useCollection,
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { UploadChatImage } from "../services/filestoreageservice";
import { useApp, useTab, useUser } from "./local";

const useChatRoomManager = (crid, user, onClose) => {
  const { removeTab, CloseTab } = useTab();
  const { auth, db } = useApp();
  const [loadLimit, setLoadLimit] = useState(10);
  const getUser = useUser();
  const [mappedRoomDetail, setMappedRoomDetail] = useState({});
  const [mappedMessage, setMappedMessage] = useState([]);
  const lastmsgref = useRef(null);
  const topmsgref = useRef(false);

  const [roomDetail, roomloading, error] = useDocumentData(
    doc(db, "chatrooms", crid)
  );
  const [messages, messageLoading, messageError] = useCollection(
    query(
      collection(db, "chatrooms", crid, "message"),
      orderBy("timestamp", "desc"),
      limit(50)
    )
  );

  useEffect(() => {
    const mapped = async () => {
      if (!roomloading) {
        const member = await getUser(roomDetail.member);
        setMappedRoomDetail({
          ...roomDetail,
          member: member,
          name: getName(member),
          thumbnail: getThumbnail(member),
        });
        if (!messageLoading) {
          const toAdded = [];
          messages.docChanges().forEach((doc) => {
            if (doc.type === "added") {
              toAdded.push({
                ...doc.doc.data(),
                sender: member.find((v, i) => v.uid == doc.doc.data().senderId),
              });
            }
          });
          setMappedMessage([...mappedMessage, ...toAdded]);
          lastmsgref.current = messages.docs[messages.size - 1];
          // setMappedMessage(
          //   messages.map((msg) => ({
          //     ...msg,
          //     sender: member.find((v, i) => v.uid == msg.senderId),
          //   }))
          // );
        }
      }
    };
    mapped();
    return () => topmsgref.current == false;
  }, [roomDetail, roomloading, messageLoading]);

  const getName = (member) => {
    if (roomDetail.type == "private") {
      const opp = member.find((v) => v.uid != user.uid);
      return opp.displayName;
    } else {
      return roomDetail.name;
    }
  };
  const getThumbnail = (member) => {
    if (roomDetail.type == "private") {
      const opp = member.find((v) => v.uid != user.uid);
      return opp.photoURL;
    } else {
      return roomDetail.thumbnail;
    }
  };

  const loading = roomloading || messageLoading;

  const loadmore = async () => {
    if (lastmsgref.current) {
      const newmsg = await getDocs(
        query(
          collection(db, "chatrooms", crid, "message"),
          orderBy("timestamp", "desc"),
          limit(50),
          startAfter(lastmsgref.current)
        )
      );
      if (!roomloading) {
        const member = await getUser(roomDetail.member);
        setMappedRoomDetail({
          ...roomDetail,
          member: member,
          name: getName(member),
          thumbnail: getThumbnail(member),
        });
        if (!messageLoading) {
          const toAdded = [];
          newmsg.docChanges().forEach((doc) => {
            if (doc.type === "added") {
              toAdded.push({
                ...doc.doc.data(),
                sender: member.find((v, i) => v.uid == doc.doc.data().senderId),
              });
            }
          });
          setMappedMessage([...mappedMessage, ...toAdded]);
          lastmsgref.current = newmsg.docs[newmsg.size - 1];
          if (newmsg.size < loadLimit) {
            topmsgref.current == true;
          }
        }
      }
    }
  };

  const handleSent = async (uid, msg, img) => {
    let dlurl = "";
    if (img) {
      dlurl = await UploadChatImage(img, uid, crid);
    }
    addDoc(collection(db, "chatrooms", crid, "message"), {
      senderId: uid,
      text: msg,
      image: dlurl,
      flag: msg ? 0 : 1,
      timestamp: serverTimestamp(),
    });
    updateDoc(doc(db, "chatrooms", crid), {
      senderId: uid,
      lastmsg: msg,
      flag: msg ? 0 : 1,
      readedby: [uid],
      timestamp: serverTimestamp(),
    });
  };
  const onRemove = () => {
    removeTab(crid);
    CloseTab();
    onClose();
  };
  const handleFocus = async () => {
    const userDocRef = doc(db, "chatrooms", crid);
    try {
      await runTransaction(db, async (transaction) => {
        const data = await transaction.get(userDocRef);
        transaction.update(userDocRef, {
          readedby: arrayUnion(user.uid),
        });
      });
    } catch (e) {
      console.log("update fail ", e);
    }
  };
  return {
    mappedRoomDetail,
    mappedMessage,
    loading,
    loadmore,
    handleSent,
    onRemove,
    handleFocus,
    topmsgref: topmsgref.current,
  };
};

export default useChatRoomManager;
