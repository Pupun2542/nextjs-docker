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
import Footer from "../../components/footer";


export default function Groups() {
  const { app, auth, db } = useApp();
  const Router = useRouter();

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      if (!loading && !user) {
        Router.push("/login");
      }
    }, [user, loading]);

    if (loading) {
      return (
        <CustomNavbar />
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
        <Box
          bg="#F3F3F3"
          overflowY={"auto"}
          // maxH={'960'}
          minH={950}
          maxH={"100vh"}
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#727272",
              borderRadius: "24px",
            },
          }}
        >

          <CustomNavbar />

          <Flex paddingTop={55}>
            <Box w={400}>
            </Box>

            <Spacer />

            <Center w={1000} bg={'#FFFFFF'} boxShadow={'base'}>
              <GroupCard />
            </Center>

            <Spacer />

            <Box w={400}>

            </Box>
          </Flex>
          <Footer />
        </Box>
      );
    }
    return <></>;
  };

  return CurrentUser();
}
