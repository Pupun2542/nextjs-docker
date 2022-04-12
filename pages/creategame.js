import React, { useState, useEffect } from "react";
import CustomNavbar from "../components/navbar";
import {
    Container,
    Row,
    Col,
    SSRProvider
} from "react-bootstrap"
import Head from "next/head";
import { getAuth } from "firebase/auth";
import { useApp } from "../src/hook/local"
import { useRouter } from "next/router";
import { 
    Box,
    Flex,
    Center,
    VStack,
    Select,
    Checkbox,
    CheckboxGroup,
    Input,
    Button,
    Divider
} from "@chakra-ui/react"
import { async } from "@firebase/util";
import { Check } from "phosphor-react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const CreateGame = () => {

    const app = useApp();
    const db = getFirestore(app);
    const auth = getAuth(app);
    const [ user, loading ] = useAuthState(auth);
    const Router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            Router.push("/login");
        }
    }, [user, loading])

    const [ numberofplayers, setNumberofPlayer] = useState("");
    const [ roomname, setRoomName ] = useState("");
    const [ seer, setSeer ] = React.useState(false);
    const [ mayor, setMayor ] = React.useState(false);

    const Submit = async (e) => {
        e.preventDefault();

        const gameRef = await addDoc(collection(db, "game"), {
            creator: auth.currentUser.uid,
            Roomname: roomname,
            Number: numberofplayers,
            Seer: seer,
            Mayor: mayor 
        });
        Router.push("/game/" + gameRef.id )

        setNumberofPlayer("");
        setRoomName("");

    };

    return (
        <SSRProvider>
            <Head>
                <link rel="shortcut icon" href="favicon.ico"></link>
                <title> Comuthor | Game </title>
            </Head>
            <Box>
                <CustomNavbar />
                    <Center>
                        <Box>
                            <h1> Creategame | สร้างเกม </h1>
                        </Box>
                    </Center>
                    <VStack align="left">
                        <p> Room name | ชื่อห้อง </p>
                        <Input 
                            type="text"
                            value={roomname}
                            onChange={(e) => {
                                setRoomName(e.target.value);
                            }}
                            placeholder = "ใส่ชื่อห้อง"
                        />
                    </VStack>
                    {/* <Divider orientation="horizontal" color="black" /> */}
                    <VStack align="left">
                        <h4> Number of player | จำนวนผู้เล่น </h4>
                    </VStack>
                    <Select
                        value={numberofplayers}
                        onChange={(e) => {
                            setNumberofPlayer(e.target.value);
                        }}
                        placeholder="เลือกจำนวนผู้เล่น"
                    >
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
                    <VStack align="left">
                        <p> Specialrole | บทบาทพิเศษที่จะให้มีในเกม </p>
                        <Checkbox
                            isChecked={seer}
                            onChange={() => setSeer(!seer)}
                        >
                            Seer : ผู้หยั่งรู้
                        </Checkbox>
                        <Checkbox
                            isChecked={mayor}
                            onChange={() => setMayor(!mayor)}
                        >
                            Mayor : นายอำเภอ
                        </Checkbox>
                    </VStack>
                    <Center>
                        <Button
                            onClick={Submit}
                            h={50}
                            w={150}
                            mb={20}
                        >
                            สร้างห้องโลดดด
                        </Button>
                    </Center>
            </Box>
        </SSRProvider>
    );
}
 
export default CreateGame;