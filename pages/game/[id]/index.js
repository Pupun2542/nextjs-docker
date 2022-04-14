import React, { useState, useEffect }  from "react";
import CustomNavbar from "../../../components/navbar";
import {
    getFirestore,
    getDoc,
    query,
    QuerySnapshot,
    collection,
    where,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    setDoc,
  } from "firebase/firestore";
  import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import Link from "next/link";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
// import GroupSidebar from "../../../components/GroupSidebar";
import { useApp } from "../../../src/hook/local";
import { UpdateUserPinGroup } from "../../../src/services/firestoreservice";
// import style from "../../../styles/groupdetail.module.css";
import Head from "next/head";
import {
  Box,
  Center,
  Flex,
  VStack,
  Spacer,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Button,
  Input,
  HStack
} from "@chakra-ui/react";
// import Footer from "../../../components/footer";
import {
  Heart,
  PushPin,
  CalendarBlank,
  DotsThreeVertical,
} from "phosphor-react";
import { SSRProvider } from "react-bootstrap";

const Game = () => {

    const app = useApp();
    const db = getFirestore(app);
    const auth = getAuth(app);
    const Router = useRouter();

    // useEffect(() => {
    //     if (!loading && !user) {
    //         Router.push("/login")
    //     }
    // }, [user, loading])

    const [ nickname, setNickName ] = useState("");
    // const [ user, loading ] = useAuthState(auth) 
    
    


    return (
        <SSRProvider>
            <Head>
                <title> Comuthor | Werewolf </title>
            </Head>

                <CustomNavbar />
                <Center>
            <Flex>
                <Box  minWidth="200px" bg="#FBBC43" color="white">
                    <Text align="center" > players </Text>
                </Box>
                <Box minWidth="900px" bg="#EA4545" color="white">
                    <Text align="center" > พื้นที่สำหรับเล่น </Text>
                </Box>
                <Box minWidth="350px" bg="#72994C" color="white">
                    <Text align="center" > chat </Text>
                </Box>
            </Flex>
                </Center>

        </SSRProvider>
    );
}
 
export default Game;