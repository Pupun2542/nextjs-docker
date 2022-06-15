import "../config/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
// import { store } from "./firebaseadminservice";

const app = getApp();
const store = getStorage(app);
const auth = getAuth(app);

export async function Uploadprofileimg(file, creator) {
  const storeRef = ref(store, `images/${creator}/${creator}${Date.now()}.jpg`);
  const snapsnot = await uploadString(storeRef, file, "data_url");
  // console.log(snapsnot.ref)
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export async function UploadBannerImage(file, creator) {
  // const file = new File([file], name)
  if (!file) {
    return;
  }
  // const blob = new Blob(file);
  const storageref = ref(
    store,
    `publicResource/uploadImages/${creator}${Date.now()}.jpg`
  );

  const snapsnot = await uploadString(storageref, file, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
  // console.log(downloadurl)
  return downloadurl;
}

export async function UploadDoc(file, creator) {
  const storageref = ref(
    store,
    `publicResource/documents/mainDocument_${creator}${Date.now()}.pdf`
  );
  const snapshot = await uploadBytes(storageref, file);
  const downloadurl = getDownloadURL(snapshot.ref);
  // console.log(downloadurl)
  return downloadurl;
}

export async function UploadGroupCommentImage(file, creator, group) {
  const storeRef = ref(
    store,
    `group/${group}/comments/${creator}${Date.now()}.jpg`
  );
  const snapsnot = await uploadString(storeRef, file, "data_url");
  // console.log(snapsnot.ref)
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export async function UploadGroupImage(files, creator, group) {
  if (Array.isArray(files)) {
    const downloadurl = await Promise.all(
      files.map(async (file) => {
        const storeRef = ref(
          store,
          `group/${group}/album/${creator}${Date.now()}.jpg`
        );
        const snapsnot = await uploadString(storeRef, file, "data_url");
        // console.log(snapsnot.ref)
        const downloadurl = await getDownloadURL(snapsnot.ref);
        return downloadurl;
      })
    );
    return downloadurl;
  }
  return undefined;
}

export function getpathfromUrl(url) {
  return ref(store, url);
}

export const getpMutiPathfromUrl = (url) =>{
  return url.map((lnk)=>(ref(store, lnk)));
}
