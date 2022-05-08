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
} from '@chakra-ui/react'

function GroupCard() {
  const Router = useRouter();
  const { bws } = Router.query;

  const {app, auth, db} = useApp();

  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchdata = async () => {
      if (bws == "mygroup") {
        if (auth.currentUser) {
          const q = query(
            collection(db, "group"),
            where("Creator", "==", auth.currentUser.uid)
          );
          const QuerySnapshot = await getDocs(q);
          // QuerySnapshot.docs.map((doc) => doc.data());
          setCommu(
            QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setLoading(false);
        }
      } else {
        const q = query(
          collection(db, "group"),
          orderBy("createAt", "desc")
        );
        const QuerySnapshot = await getDocs(q);
        setCommu(
          QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setLoading(false);
      }
    };
    Fetchdata();
  }, [bws]);

  return (
    <Box
      bg={"#d4d4d4"}
    >
      {!loading &&
        commu.map((value, index) => {
          return (
            <Flex
              onClick={() => {
                Router.push("/group/" + value.id);
              }}
              bg={"#9A9A9A"}
              mr={5}
              ml={5}
              mt={2}
              mb={1.5}
              h={'auto'}
              borderRadius={10}
              _hover={{
                background:"#535353"
              }}
              // as="button"
              cursor="pointer"
            >
              <Center
                minH={216}
                minW={384}
              >
                <img src={value.banner} height="216" width="384"></img>
              </Center>
              
              <VStack ml={5}>
                <Box
                  className={style.Communame}
                  color="black"
                  maxW={606}
                  w={556}
                >
                  <Box>
                    [{value.tag}]{value.name}
                  </Box>
                </Box>

                <Wrap
                  w={556}
                  maxW={606}
                  h={30}
                >
                  {value.genre.map((tag) => {
                    return <WrapItem
                              bg={"#6768AB"}
                              className={style.genre}
                              m={1}
                              borderRadius={10}
                              p={2}
                          >{tag}</WrapItem>;
                  })}
                </Wrap>
              </VStack>
            </Flex>
          );
        })}
    </Box>
  );
}

export default GroupCard;