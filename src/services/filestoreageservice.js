import "../config/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  getBlob
} from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { useCallback, useState } from "react";
import { async } from "@firebase/util";
import { useApp } from "../hook/local";
import { useDropzone } from "react-dropzone";
import { Modal } from "react-bootstrap";
// import { store } from "./firebaseadminservice";

export function Uploadprofileimg(file, name) {
  const app = getApp();
  const store = getStorage(app);
  const auth = getAuth(app);
  // const [fileURL, setfileURL] = useState("");
  // console.log(file.name)
  if (!file) {
    // console.log("returned")
    return;
  }
  const storageref = ref(store, `profileimg/${name}`);
  const uploadtask = uploadBytesResumable(storageref, file);

  uploadtask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadtask.snapshot.ref).then((url) => {
        updateProfile(auth.currentUser, { photoURL: url });
      });
    }
  );
}

export async function UploadBannerImage(file, name) {
  // const file = new File([file], name)
  const app = getApp();
  const store = getStorage(app);
  if (!file) {
    return;
  }
  // const blob = new Blob(file);
  const storageref = ref(store, `group/banner/${name}`);
  // const uploadtask = uploadBytesResumable(storageref, file);
  const upl = await uploadBytes(storageref, blob);
  const downloadurl = await getDownloadURL(storageref);

  return downloadurl
}
export async function UploadTempImage(file) {
  const name = Math.floor(Math.random()*10000000000)+".jpg"
  const app = getApp();
  const store = getStorage(app);
  if (!file) {
    return;
  }
  // const blob = new Blob(file);
  const storageref = ref(store, `group/temp/${name}`);
  // const uploadtask = uploadBytesResumable(storageref, file);
  const upl = await uploadBytes(storageref, blob);
  const downloadurl = await getDownloadURL(storageref);
}