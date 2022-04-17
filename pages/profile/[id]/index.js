import React, { useEffect, useState } from "react";
import { useApp } from "../../../src/hook/local";
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { Box, Text } from "@chakra-ui/react";

export default function profile() {
  const router = useRouter();
  const { id } = router.query;
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    // console.log(id);
    const loaduserDetail = async () => {
      if (!loading) {
        const detail = await getDoc(doc(db, "userDetail", id));
        //    console.log(detail.data())
        if (detail.exists) {
          setUserDetail(detail.data());
        }
      }
    };
    loaduserDetail();
  }, [loading, id]);

  return <Box>{userDetail && <Text>{userDetail.displayName}</Text>}</Box>;
}
