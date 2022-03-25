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
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import GroupSidebar from "../../components/GroupSidebar";
import { useApp } from "../../src/hook/local";
import GroupCard from "../../components/GroupCard";
import style from "../../styles/group.module.css";
import Head from "next/head";
import { 
  Box,
  Flex,
  Spacer,
  Center,
  Button,
 } from '@chakra-ui/react';


export default function Groups() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  // const [data, setData] = useState([]);

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
          <Box bg="#FDFDFD">
            <Head>
              <link rel="shortcut icon" href="favicon.ico"></link>
              <title>Comuthor</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>

            <CustomNavbar />
            
            <Flex>
              <Box>
                <GroupSidebar />
              </Box>

              <Spacer />

              <Center
                w={1000}
              >
                <GroupCard />
              </Center>
              
              <Spacer />
              
              <Box w={400}>
              
              </Box>
            </Flex>
          </Box>
        </SSRProvider>
      );
    }
    return <></>;
  };

  return CurrentUser();
}
