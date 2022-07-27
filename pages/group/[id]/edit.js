import React from "react";
import CustomNavbar from "../../../components/navbar";
import { useState, useEffect, useRef } from "react";
import { useApp } from "../../../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  Box,
} from "@chakra-ui/react";
import { Createcommuform } from "../../../components/commuforms/createcommuform";
import Footer from "../../../components/footer";
import axios from "axios";

export default function Edit() {
  const { app, auth, db } = useApp();
  const [user, loading, error] = useAuthState(auth);
  const Router = useRouter();
  const { id } = Router.query;

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login");
    }
  }, [user, loading]);
  const [data, setData] = useState(null)

  useEffect(() => {
    const Fetchdata = async () => {
      // console.log(auth.currentUser)
      const token = await user.getIdToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      let data = res.data;
      if (Object.keys(data.staff).includes(user.uid))
      setData(data);
    };
    if (!loading && !user) {
      Router.push("/login");
    } else {
      if (id && user) {
        Fetchdata();
      }
    }
  }, [user, loading, id]);
  return (
    <Box>
      <Box bg="#FDFDFD" maxW={1980}>
        <CustomNavbar />
        <Createcommuform data={data} gid={id}/>
        <Footer/>
      </Box>
    </Box>
  );
}
