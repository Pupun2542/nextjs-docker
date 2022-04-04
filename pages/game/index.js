import React,{ useEffect, useState } from "react";
import { Container, SSRProvider, Row, Col } from "react-bootstrap";
import CustomNavbar from "../../components/navbar";
import {
    getFirestore,
    getDoc,
    collection,
    query,
    where
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useApp } from "../../src/hook/local";
import Link from "next/link";
import Head from "next/head";
import { Box, Flex, Spacer, Center } from '@chakra-ui/react';
import GameCard from "../../components/GameCard";

const Game = () => {

    const app = useApp();
    const db = getFirestore(app);
    const auth = getAuth(app);
    const [user, loading] = useAuthState(auth);
    const Router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            Router.push("/login");
        }
    }, [user, loading]);

    return (
        <SSRProvider>
            <Box bg="#FDFDFD">
                <Head>
                    <link rel="shortcut icon" href="favicon.ico"></link>
                    <title> Comuthor </title>
                </Head>
                <Box>
                    <CustomNavbar />
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
            </Box>
        </SSRProvider>
    );
}
 
export default Game;