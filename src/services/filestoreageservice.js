import "../config/firebase.config";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  uploadBytes,
  uploadString,
  deleteObject,
} from "firebase/storage";
import { getApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import imageCompression from "browser-image-compression";

const app = getApp();
const store = getStorage(app);
const auth = getAuth(app);

export async function Uploadprofileimg(file, creator) {
  const file2 = await compressImage(file);
  const storeRef = ref(store, `images/${creator}/${creator}${Date.now()}.jpg`);
  const snapsnot = await uploadString(storeRef, file2, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}
export async function Uploadprofilebannerimg(file, creator) {
  const storeRef = ref(store, `images/${creator}/${creator}${Date.now()}.jpg`);
  const snapsnot = await uploadString(storeRef, file, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export async function UploadBannerImage(file, creator, group) {
  if (!file) {
    return;
  }
  const storageref = ref(
    store,
    `group/${group}/uploadImages/${creator}${Date.now()}.jpg`
  );

  const snapsnot = await uploadString(storageref, file, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}
export async function UploadBannerSquareImage(file, creator, group) {

  if (!file) {
    return;
  }
  const storageref = ref(
    store,
    `group/${group}/uploadImages/${creator}${Date.now()}.jpg`
  );

  // const compressed = await compressImage(file, 500)

  const snapsnot = await uploadString(storageref, file, "data_url");
  const downloadurl = await getDownloadURL(snapsnot.ref);
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
          `group/${group}/album/${creator}${
            Date.now() + Math.floor(Math.random() * 1000)
          }.jpg`
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

export async function UploadGroupAlbumImage(file, creator, group, album) {
  if (file) {
    const storeRef = ref(
      store,
      `group/${group}/album/${album}/${creator}${
        Date.now() + Math.floor(Math.random() * 1000)
      }.jpg`
    );
    const snapsnot = await uploadString(storeRef, file, "data_url");
    const downloadurl = await getDownloadURL(snapsnot.ref);
    return { dlurl: downloadurl, path: snapsnot.ref.fullPath };
    // return { dlurl: file, path: ""};
  }
  return undefined;
}

export async function UploadChatImage(file, creator, crid) {
  const storeRef = ref(store, `chatrooms/${crid}/${creator}${Date.now()}.jpg`);
  const snapsnot = await uploadString(storeRef, file, "data_url");
  // console.log(snapsnot.ref)
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export async function UploadCharaImage(file, creator, group) {
  const storeRef = ref(
    store,
    `group/${group}/chara/${creator}${Date.now()}.jpg`
  );
  const snapsnot = await uploadString(storeRef, file, "data_url");
  // console.log(snapsnot.ref)
  const downloadurl = await getDownloadURL(snapsnot.ref);
  return downloadurl;
}

export function getpathfromUrl(url) {
  return ref(store, url);
}

export const getpMutiPathfromUrl = (url) => {
  return url.map((lnk) => ref(store, lnk));
};

export const deleteImage = async (path) => {
  const storeRef = ref(store, path);
  await deleteObject(storeRef);
}

export const compressImage = async (dataurl, maxWidth = 250) => {
  const file = await imageCompression.getFilefromDataUrl(
    dataurl,
    "default.jpg",
    Date.now()
  );
  const compress = await imageCompression(file, {
    maxWidthOrHeight: maxWidth,
  });
  const ret = await imageCompression.getDataUrlFromFile(compress);
  return ret;
};
