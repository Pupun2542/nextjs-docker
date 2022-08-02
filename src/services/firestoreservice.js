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
import { UploadBannerImage, UploadDoc } from "./filestoreageservice";
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
          await updateDoc(ref, {
            PinnedGroup: data.PinnedGroup.filter((removeId) => removeId !== groupId)
          });
        } else {
          await updateDoc(ref, {
            PinnedGroup: [...data.PinnedGroup, groupId],
          });
        }
      } else {
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

export async function creategroup(body) {
  const docref = addDoc(collection(db, "group"), {
    "name": data.communame,
    "creator": data.creator,
    "type": data.type,
    "privacy": data.privacy,
    "tag": data.hashtag,
    "description": data.description,
    "maxplayer": data.maxplayer,
    "genre": data.genre,
    "contactlink": data.contactlink,
    "place": data.places,
    "times": data.times,
    "tws": data.TWs,
    "startDate": data.startdate,
    "startDateRaw": data.startdateraw,
    "rating": data.rating,
    "rule": data.rule,
    "averageTime": data.averagetime,
    "averageTimeUnit": data.averagetimeunit,
    "createAt": serverTimestamp(),
    "config": data.config,
    "lastpush": serverTimestamp(),
    "viewer": [],
    "love": [],
    "members": [data.creator],
    "staff": [data.creator], 
    "registrationlink": data.registrationlink,
    "statuschecklink":data.statuschecklink,
  })
  const bannerurl = await UploadBannerImage(data.banner, data.creator, docref);
  const docurl = await UploadDoc();
}