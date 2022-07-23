import React, { useEffect, useState } from "react";
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
import { ChatBar } from "../../components/ChatBar";


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
          bg={'#F3F5F8'}
          minH={950}
        >

          <CustomNavbar />

          <Flex
            boxShadow={'base'}
            justifyContent={'center'}
            paddingTop={55}
          >

            <Center bg={'white'} boxShadow={'base'} flexDir={'column'} >
              {/* <Button
                fontFamily={'Mitr'}
                fontWeight='hairline'
                mt={1}
                size='lg'
                bg={'#343434'}
                color={'#FFC75A'}
                onClick={() => Router.push("/creategroup")}
              >
                สร้างคอมมูนิตี้
              </Button> */}

              <GroupCard />
            </Center>
          </Flex>
          <Footer />
        </Box>
      );
    }
    return <></>;
  };

  return CurrentUser();
}
