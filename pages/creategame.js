import React from "react";
import CustomNavbar from "../components/navbar";
import { useState, useEffect } from "react";
import { Container ,Row, Col, SSRProvider } from "react-bootstrap";
import {
    getFirestore,
    collection,
    addDoc
} from "firebase/firestore"
import Head from "next/head";
import  { getAuth } from "firebase/auth"
import { useApp } from "../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getBlob } from "firebase/storage";
import {    Box,
            Flex, 
            Center, 
            Circle, 
            Spacer, 
            Input, 
            Select, 
            VStack, 
            Checkbox, 
            Stack, 
            CheckboxGroup,
            Button} from "@chakra-ui/react"
import { async } from "@firebase/util";
import Link from "next/link";

const CreateGame = () => {

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

    const [numberplayers, setNumberplayers] = useState("");
    const [nameroom, setNameroom] = useState("");
    const [seerrole, setSeerrole] = useState("");
    const [mayorrole, setMayorrole] = useState("");

    const Submit = async (e) => {
        e.preventDefault();
        if (!gamesubmit) {
            setgamesubmit(
                "https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2Fimageplaceholder.png?alt=media&token=f5f9ea02-1b1d-404c-8fb4-4619892dc474"
            );
        }
    
    const gameRef = await addDoc(collection(db, "game"),{
        creator: auth.currentUser.uid,
        name: nameroom,
        number: numberplayers,
        seer: seerrole,
        mayor: mayorrole
    });
    setNumberplayers("");
    setSpecialroles("");
    setNameroom("");
    Router.push("/game/" + gameRef.id)
    };

    return (
        <SSRProvider>
            <Head>
                <link rel="shortcut icon" href="favicon.ico"></link>
                <title>Comuthor | game</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <CustomNavbar />
                <h1> Creategame </h1>
                <h4> สร้างเกม </h4>

                <p> ชื่อห้อง </p>
                <Input 
                    variant='flushed' 
                    type="text"
                    value={nameroom}
                    onChange={(e) => {
                        setNameroom(e.target.value);
                    }}
                placeholder='ใส่ชื่อห้อง' />

                <h5> number of player </h5>
                <p> จำนวนผู้เล่นกี่คน </p>
                <Select
                value={numberplayers}
                onChange={(e) => {
                    setNumberplayers(e.target.value);
                }}
                placeholder="เลือกจำนวนผู้เล่น">
                    <option value='7'> 7 คน </option>
                    <option value='8'> 8 คน </option>
                    <option value='9'> 9 คน </option>
                    <option value='10'> 10 คน </option>
                    <option value='11'> 11 คน </option>
                    <option value='12'> 12 คน </option>
                    <option value='13'> 13 คน </option>
                    <option value='14'> 14 คน </option>
                    <option value='15'> 15 คน </option>
                </Select>
                <Container>
                    <Row>
                        <Col>
                            <p> specialroles </p>
                            <p> บทบาทพิเศษที่จะให้มีในเกม </p>
                        </Col>
                    </Row>
                    <Row>
                        <CheckboxGroup>
                            <Row>
                                <Checkbox 
                                    value={seerrole}
                                    onClick={(e) => {
                                        setSeerrole(e.target.value)
                                    }}> Seer ผู้หยั่งรู้ </Checkbox>
                            </Row>
                            <Row>
                            <Checkbox 
                                value={mayorrole}
                                onClick={(e) => {
                                    setMayorrole(e.target.value)
                                }}> Mayor นายอำเภอ </Checkbox>
                            </Row>
                        </CheckboxGroup>
                    </Row>
                </Container>
                <Center>
                    <Button
                      onClick={Submit}
                      h={50}
                      w={150}
                      mb={20}
                    >
                      สร้างห้อง
                    </Button>
                  </Center>
        </SSRProvider>
    )
}
 
export default CreateGame;