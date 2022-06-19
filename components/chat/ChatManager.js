import React from 'react'
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
import { useApp, useTab } from '../../src/hook/local';

const UseChatManager = (isOpen, onOpen, onClose) => {
    const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
    const { auth, app, db } = useApp();

    const remove = () => {
        removeTab(tabState.opentab);
        // changeTab("");
        CloseTab();
        onClose();
      };
    
      const onChatSent = async (user, msg, image) => {
        if (msg) {
          await updateDoc(doc(db, "chatrooms", tabState.opentab), {
            lastmsg: msg,
            sender: user.displayName,
            senderId: user.uid,
            readedby: [user.uid],
            timestamp: serverTimestamp(),
          })
            .then()
            .catch((e) => console.log(e));
          await addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
            sender: user.displayName,
            senderId: user.uid,
            text: msg,
            timestamp: serverTimestamp(),
          });
          setMsg("");
        }
        if (image) {
          const storeRef = ref(
            store,
            `chatrooms/${tabState.opentab}/${auth.currentUser.uid}${Date.now()}`
          );
          const snapshot = await uploadString(storeRef, image, "data_url");
          const url = await getDownloadURL(snapshot.ref);
          await addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
            sender: user.displayName,
            senderId: user.uid,
            image: url,
            timestamp: serverTimestamp(),
          });
          await updateDoc(doc(db, "chatrooms", tabState.opentab), {
            lastmsg: user.displayName + " ได้ส่งรูป",
            sender: user.displayName,
            senderId: user.uid,
            readedby: [user.uid],
            timestamp: serverTimestamp(),
          });
          setImage(null);
        }
      };

      const handleMessage = (user, id) => {
        console.log(user, id)
        let roomId = "";
        getDocs(
          query(
            collection(db, "chatrooms"),
            where("member", "array-contains", user.uid),
            where("type", "==", "private")
          )
        ).then((docs) => {
          if (!docs.empty) {
            //ถ้าเจอ doc
            const docId = docs.docs.find((v) => v.data().member.includes(id));
            if (docId) {
              //ถ้า doc เป็นของเราจริงๆ
              changeTab(docId.data().id);
            } else {
              //ถ้าไม่ใช่
              addDoc(collection(db, "chatrooms"), {
                member: [user.uid, id],
                memberDetail: [
                  {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                  },
                  {
                    uid: id,
                    displayName: userDetail.displayName,
                    photoURL: userDetail.photoURL,
                  },
                ],
                type: "private",
              }).then((created) => {
                roomId = created.id;
                updateDoc(doc(db, "chatrooms", created.id), {
                  id: created.id,
                }).then(() => changeTab(created.id));
              });
            }
            // console.log("not empty")
          } else {
            // console.log("empty")
            addDoc(collection(db, "chatrooms"), {
              member: [user.uid, id],
              memberDetail: [
                {
                  uid: user.uid,
                  displayName: user.displayName,
                  photoURL: user.photoURL,
                },
                {
                  uid: id,
                  displayName: userDetail.displayName,
                  photoURL: userDetail.photoURL,
                },
              ],
              type: "private",
            }).then((created) => {
              // console.log("created")
              roomId = created.id;
              changeTab(roomId);
              updateDoc(doc(db, "chatrooms", created.id), {
                id: created.id,
              }).then(() => changeTab(created.id));
            });
          }
        });
      };

  return { remove, onChatSent, handleMessage }
}

export default UseChatManager