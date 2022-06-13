import "../config/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  uploadString
} from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
// import { store } from "./firebaseadminservice";

const app = getApp();
const store = getStorage(app);
const auth = getAuth(app);

export function Uploadprofileimg(file, name) {
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

export async function UploadBannerImage(file, creator) {
  // const file = new File([file], name)
  if (!file) {
    return;
  }
  // const blob = new Blob(file);
  const storageref = ref(store, `publicResource/uploadImages/${creator}${Date.now()}.jpg`);
  
  const snapsnot = await uploadString(storageref, file, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
  // console.log(downloadurl)
  return downloadurl
}

export async function UploadDoc(file, creator){
  const storageref = ref(
    store,
    `publicResource/documents/mainDocument_${creator}${Date.now()}.pdf`
  );
  const snapshot = await uploadBytes(storageref, file);
  const downloadurl = getDownloadURL(snapshot.ref);
  // console.log(downloadurl)
  return downloadurl
}

export async function UploadGroupCommentImage(file, creator, group) {
  const storeRef = ref(
    store,
    `group/${group}/comments/${creator}${Date.now()}.jpg`
  );
  const snapsnot = await uploadString(storeRef, file, "data_url");
  console.log(snapsnot.ref)
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export function getpathfromUrl(url) {
  return ref(store, url) 
}