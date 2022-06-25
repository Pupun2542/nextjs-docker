import { useState } from "react";
import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { UploadCharaImage } from "../services/filestoreageservice";
import { useApp } from "./local";

const useCharaList = (data, gid) => {
  const { auth, db } = useApp();
  const [chara, setChara] = useState(
    data.chara ? Object.values(data.chara) : []
  );
  const [charaSearchResult, setCharaSearchResult] = useState([]);

  const onSearchChara = (str) => {
    setCharaSearchResult(chara.filter((v, i) => v.name.includes(str)));
  };
  const onAddChara = async (data) => {
    const token = await auth.currentUser.getIdToken();
    const photoURL = "";
    if (data.image) {
      photoURL = await UploadCharaImage(data.image, auth.currentUser.uid, gid);
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/addchara`,
      {
        name: data.name,
        photoURL: photoURL,
        docLink: data.docLink,
        description: data.description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      setChara([...chara, res.data]);
    }
  };
  const onRemoveChara = async (id) => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/removechara`,
      {
        caid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      const newChara = chara.filter((v, i) => v.refererId != id);
      setChara(newChara);
    }
  };
  const onUpdateChara = async (id, data) => {
    const token = await auth.currentUser.getIdToken();
    const photoURL = "";
    if (data.image) {
      if (data.image.startsWith("https://")) {
        photoURL = data.image;
      } else {
        photoURL = await UploadCharaImage(
          data.image,
          auth.currentUser.uid,
          gid
        );
      }
    }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${gid}/updatechara`,
      {
        name: data.name,
        photoURL: photoURL,
        docLink: data.docLink,
        description: data.description,
        caid: id,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (res.status === 200) {
      let changechara = [...chara];
      const changeIndex = chara.findIndex((v) => v.refererId == id);
      changechara[changeIndex] = {
        ...changechara[changeIndex],
        name: data.name,
        photoURL: photoURL,
        description: data.description,
      };
      setChara(changechara);
    }
  };

  const getDetailedChara = async (caid) => {
    const charadoc = await getDoc(doc(db, "group", gid, "chara", caid));
    return charadoc.data();
  };

  return {
    chara,
    charaSearchResult,
    onSearchChara,
    onAddChara,
    onUpdateChara,
    onRemoveChara,
    getDetailedChara,
  };
};

export default useCharaList;
