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
// import style from "../../styles/group.module.css";
import Head from "next/head";
import { 
  Box,
  Flex,
  Spacer,
  Center,
  Button,
  VStack,
 } from '@chakra-ui/react';
 import GameCard from "../../components/GameCard";
 import Footer from "../../components/footer";

 const Game = () => {

    const app = useApp();
    const db = getFirestore(app);
    const auth = getAuth(app)
    const Router = useRouter();
    const [ user, loading ] = useAuthState(auth);

    useEffect(() => {
        if (!loading && !user) {
            Router.push("/login")
        }
    } , [user, loading])

    

     return (
         <SSRProvider>
             <Head>
                <link rel="shortcut icon" href="favicon.ico"></link>
                <title> Comuthor | Lobby </title>
             </Head>

             <CustomNavbar />
            <Center>
             <Flex>
                 <Spacer />
             </Flex>
             <VStack w={1000} boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' fontFamily={'Mitr'}>
             <Box>
                <GameCard />
             </Box>
             </VStack>
             </Center>

            <Footer />

         </SSRProvider>
     );
 }
  
 export default Game;