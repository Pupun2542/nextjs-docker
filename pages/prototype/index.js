import React, { useEffect, useState } from "react";
import { Container, SSRProvider, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/navbar";

import {
  getFirestore,
  getDoc,
  query,
  QuerySnapshot,
  collection,
  where,
  getDocs,
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import GroupSidebar from "../../components/GroupSidebar";
import { useApp } from "../../src/hook/local";
import GroupCard from "../../components/GroupCard";
import style from "../../styles/group.module.css";
import Head from "next/head";
import { Box, VStack, HStack, Grid, GridItem, Image, Text } from "@chakra-ui/react";

export default function Groups() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const snap = await getDocs(query(collection(db, "prototype")));
      // console.log(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setData(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    return loadData();
  }, []);

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      if (!loading && !user) {
        Router.push("/login");
      }
    }, [user, loading]);

    if (loading) {
      return (
        <SSRProvider>
          <CustomNavbar />
        </SSRProvider>
      );
    }
    if (error) {
      return (
        <div>
          <p>Error: {error}</p>
        </div>
      );
    }

    if (user) {
      return (
        <SSRProvider>
          <Box className={style.groupbg}>
            <Head>
              <link rel="shortcut icon" href="favicon.ico"></link>
              <title>Comuthor</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <CustomNavbar />
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem colSpan={2}>
                <GroupSidebar />
              </GridItem>
              <GridItem colSpan={8} className={style.GroupCardpad}>
                {data &&
                  data.map((val, k) => (
                    <Box height={50} width={300} key={k} onClick={()=>Router.push("/prototype/"+val.id)} cursor={'pointer'}>
                      {console.log(val.Name)}
                      <Text color={'black'}>{val.Name}</Text>
                    </Box>
                  ))}
              </GridItem>
              <GridItem colEnd={12} className={style.colright}>
                <Box className={style.create}>
                  <a href="/creategroup" className={style.textcreate}>
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FPlus.png?alt=media&token=802be6cb-0fc7-4bf4-b532-0d82bf418805"
                      height={30}
                      width={30}
                    ></Image>
                    &nbsp;CREATE COMMU
                  </a>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </SSRProvider>
      );
    }
    return <></>;
  };

  return CurrentUser();
}
