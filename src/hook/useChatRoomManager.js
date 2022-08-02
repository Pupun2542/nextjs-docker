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
  arrayUnion
} from "firebase/firestore";
import React, { useEffect, useMemo, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { UploadChatImage } from "../services/filestoreageservice";
import { useApp, useTab, useUser } from "./local";

const useChatRoomManager = (crid, user, onClose) => {
  const { removeTab, CloseTab } = useTab();
  const { auth, db } = useApp();
  const [loadLimit, setLoadLimit] = useState(20);
  const getUser = useUser();
  const [mappedRoomDetail, setMappedRoomDetail] = useState({});
  const [mappedMessage, setMappedMessage] = useState([]);

  const [roomDetail, roomloading, error] = useDocumentData(
    doc(db, "chatrooms", crid)
  );
  const [messages, messageLoading, messageError] = useCollectionData(
    query(
      collection(db, "chatrooms", crid, "message"),
      orderBy("timestamp", "desc"),
      limit(loadLimit)
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
          setMappedMessage(
            messages.map((msg) => ({
              ...msg,
              sender: member.find((v, i) => v.uid == msg.senderId),
            }))
          );
        }
      }
    };
    mapped();
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

  const loadmore = () => {
    setLoadLimit(loadLimit + 20);
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
  };
};

export default useChatRoomManager;
