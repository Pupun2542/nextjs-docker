import React, { useEffect, useState } from "react";
import { Container, SSRProvider, Row, Col, Form } from "react-bootstrap";
import style from "../styles/groupcard.module.css";
import { useApp } from "../src/hook/local";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import {
  Box,
  Flex,
  Center,
  Stack,
  Spacer,
  Text,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Button
} from '@chakra-ui/react'

const GameCard = () => {
    const Router = useRouter();
    // const { bws } = Router.query;

    const { app, auth, db } = useApp();

    const [ game, setGame ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const Fetchdata = async () => {
            const q = query(
                collection(db, "game")
            );
            const QuerySnapshot = await getDocs(q);
            setGame(
                QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            )
            setLoading(false);
            // console.log(game.length)
        };
        return Fetchdata();
    });

    return (
        <Box>
            {!loading && game.map((value) => {
                return (
                    <SSRProvider>
                    <Box
                        bg={'fdfdfd'}
                        boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                        borderRadius={10}
                        mt='10px'
                        mb='10px'
                        width='1000px'
                        height='65px'
                        fontFamily={'Mitr'}
                    >
                            <Box>
                                <Flex direction={['column', 'row']} >
                                    <Box w='850px' >
                                        <Text
                                            p='5'
                                            ml='10px'
                                        > {value.Name} </Text>
                                    </Box>
                                    <Box
                                        p='3'
                                        align='Right'
                                    >
                                        <Button
                                            onClick={() => {
                                                Router.push("/game/" + value.id);                                                
                                            }}
                                        >
                                            เข้าห้องเลย
                                        </Button>
                                    </Box>
                                </Flex>
                            </Box>
                    </Box>
                  </SSRProvider>
                )
            })}
        </Box>
    )
}
 
export default GameCard;