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
// import GroupCard from "../../components/GroupCard";
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
import GameCard from "../../components/GameCard";

const Games = () => {
    const {auth} = useApp();
    const Router = useRouter();
    const [ user, loading ] = useAuthState(auth);

    useEffect(() => {
        if(!loading && !user){
            Router.push("/login");
        }
    }, [user, loading]);

    return (
        <Box>

            <CustomNavbar />
            
            <Flex paddingTop={50}>
              <Box w={400}>
              </Box>

              <Spacer />

              <Center
                w={1000}
              >
                <GameCard />
              </Center>
              
              <Spacer />
              
              <Box w={400}>
              
              </Box>
            </Flex>

            <Footer />
        </Box>
    )
}
 
export default Games;