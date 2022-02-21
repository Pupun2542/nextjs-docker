import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  getFirestore,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { useApp } from "../hook/local";
// import { db } from "./firebaseadminservice";

const app = getApp();
const db = getFirestore(app);

export async function UpdateUserDetail(user) {
  const ref = doc(db, "userDetail", user);

  const docsnap = await getDoc(ref);
  if (docsnap.exists()) {
    await updateDoc(ref, { lastnamechange: serverTimestamp() });
  } else {
    await setDoc(ref, {
      userid: user,
      lastnamechange: serverTimestamp(),
    });
  }
}
export async function UpdateUserGroup(user, groupId) {
  const ref = doc(db, "userDetail", user);

  const docsnap = await getDoc(ref);
  if (docsnap.exists()) {
    const currentGroup = docsnap.data().currentGroup;
    if (currentGroup) {
      await updateDoc(ref, {
        currentGroup: [...currentGroup, groupId],
      });
    } else {
      await updateDoc(ref, {
        currentGroup: [groupId],
      });
    }
  }
}

export async function UpdateUserPinGroup(user, groupId) {
  const ref = doc(db, "userDetail", user);

  const snap = await getDoc(ref);
  if (snap) {
    const data = snap.data();
    const PinnedGroups = data.PinnedGroup
    if (PinnedGroups) {
      if (PinnedGroups.length < 10) {
        if (PinnedGroups.includes(groupId)) {
            console.log(PinnedGroups.includes(groupId), PinnedGroups.indexOf(groupId)) 
            console.log("remove pin ", groupId)
            // console.log("Group: ", PinnedGroups, "After splice: " , PinnedGroups.splice(0,1))
            // const sp = PinnedGroups.splice(PinnedGroups.indexOf(groupId),1)
            // console.log(sp)
          await updateDoc(ref, {
            PinnedGroup: data.PinnedGroup.filter((removeId) => removeId !== groupId)
          });
        } else {
            console.log("add pin ", groupId)
          await updateDoc(ref, {
            PinnedGroup: [...data.PinnedGroup, groupId],
          });
        }
      } else {
        //   console.log(data.PinnedGroup.length)
        alert("ปักหมุดได้มากสุด 10 กลุ่ม กรุณาถอนปักหมุดออกก่อน");
      }
    } else {
      await updateDoc(ref, {
        PinnedGroup: [groupId],
      });
    }
  } else {
    await updateDoc(ref, {
      PinnedGroup: [groupId],
    });
  }
}

export async function initializeUserDb(user) {
  // console.log(user)
  const ref = doc(db, "userDetail", user.uid);
  const docsnap = await getDoc(ref);
  if (!docsnap.exists()) {
    await setDoc(ref, {
      userId: user.uid,
      displayName: user.displayName
    });
  }
}
