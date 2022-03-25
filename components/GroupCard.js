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
  Text,
} from '@chakra-ui/react'

function GroupCard() {
  const Router = useRouter();
  const { bws } = Router.query;

  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
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
    <Box>
      {!loading &&
        commu.map((value, index) => {
          return (
            <Flex
              onClick={() => {
                Router.push("/group/" + value.id);
              }}
              bg={"#d4d4d4"}
              m={5}
            >
              <Center>
                <img src={value.banner} height="216" width="384"></img>
              </Center>
              
              <Stack>
                <Center
                  className={style.Communame}
                  color="black"
                >
                  <h2>
                    [{value.tag}]{value.Name}
                  </h2>
                </Center>
                <Flex
                  w={'auto'}
                >
                  {value.genre.map((tag) => {
                    return <Text
                              bg={"#6768AB"}
                              className={style.genre}
                              m={1}
                          >{tag}</Text>;
                  })}
                </Flex>
              </Stack>
            </Flex>
          );
        })}
    </Box>
  );
}

export default GroupCard;