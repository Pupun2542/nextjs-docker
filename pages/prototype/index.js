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
  doc,
} from "firebase/firestore";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import GroupSidebar from "../../components/GroupSidebar";
import { useApp } from "../../src/hook/local";
import GroupCard from "../../components/GroupCard";
import style from "../../styles/group.module.css";
import Head from "next/head";
import {
  Box,
  VStack,
  HStack,
  Grid,
  GridItem,
  Image,
  Text,
  Spacer,
  Center,
  Button,
  Flex
} from "@chakra-ui/react";
import { Flag, Handshake, HouseLine, PushPin } from "phosphor-react";

export default function Groups() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const Router = useRouter();
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const snap = await getDocs(query(collection(db, "prototype")));
      // console.log(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setData(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    return loadData();
  }, []);

  const CurrentUser = () => {
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
      if (!loading && !user) {
        Router.push("/login");
      }
    }, [user, loading]);

    if (loading) {
      return (
        <SSRProvider>
          <CustomNavbar />
        </SSRProvider>
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
        <SSRProvider>
          <Box className={style.groupbg}>
            <Head>
              <link rel="shortcut icon" href="favicon.ico"></link>
              <title>Comuthor</title>
              <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
              />
            </Head>
            <CustomNavbar />
            <Grid templateColumns="repeat(12, 1fr)">
              <GridItem colSpan={2}>
                <Box w={400}>
                  <VStack>
                    <Button
                      bg="#535353"
                      w={400}
                      h={50}
                      borderLeftRadius={0}
                      marginTop={2}
                      _hover={{
                        color: "Black",
                        background: "#CBD5E0",
                      }}
                    >
                      {/* Notification */}
                      <Center></Center>

                      <Spacer />

                      <Center className={style.sideGroup}>Main Hall</Center>

                      <Spacer />

                      <Center
                        h={50}
                        w={50}
                        bg={"#6768AB"}
                        borderRightRadius={6}
                        mr={-4}
                      >
                        <HouseLine size={32} />
                      </Center>
                    </Button>

                    <Button
                      bg="#535353"
                      w={400}
                      h={50}
                      borderLeftRadius={0}
                      marginTop={0}
                      _hover={{
                        color: "Black",
                        background: "#CBD5E0",
                      }}
                      isDisabled
                    >
                      {/* Notification */}
                      <Center></Center>

                      <Spacer />

                      <Center className={style.sideGroup}>Pin</Center>

                      <Spacer />

                      <Center
                        h={50}
                        w={50}
                        bg={"#6768AB"}
                        borderRightRadius={6}
                        mr={-4}
                      >
                        <PushPin size={32} />
                      </Center>
                    </Button>

                    <Button>
                      {!loading &&
                        commu.map((value, index) => {
                          // console.log(value.id);
                          return (
                            <Flex
                              key={index}
                              bg="#888888"
                              h={10}
                              w={400}
                              borderRightRadius={6}
                              mt={0}
                              mb={0}
                              _hover={{
                                background: "#E2E8F0",
                                color: "black",
                              }}
                            >
                              {/* Display Commu */}
                              <Center></Center>

                              <Spacer />

                              <Link href={"/group/" + value.id}>
                                <Center>
                                  <h5 className={style.pin}>{value.Name}</h5>
                                </Center>
                              </Link>

                              <Spacer />
                              {/* Notification */}
                              <Center></Center>
                            </Flex>
                          );
                        })}
                    </Button>

                    <Button
                      bg="#535353"
                      w={400}
                      h={50}
                      borderLeftRadius={0}
                      marginTop={1}
                      _hover={{
                        color: "Black",
                        background: "#CBD5E0",
                      }}
                      isDisabled
                    >
                      {/* Notification */}

                      <Center></Center>

                      <Spacer />

                      <Center className={style.sideGroup}>My Group</Center>
                      {/* เพิ่มแถบคอมมูที่เราสร้างขึ้นมาเหมือน Pin */}
                      <Spacer />

                      <Center
                        h={50}
                        w={50}
                        bg={"#6768AB"}
                        borderRightRadius={6}
                        mr={-4}
                      >
                        <Handshake size={32} />
                      </Center>
                    </Button>
                  </VStack>
                </Box>
              </GridItem>
              <GridItem colSpan={8} className={style.GroupCardpad}>
                {data &&
                  data.map((val, k) => (
                    <Box
                      height={50}
                      width={300}
                      key={k}
                      onClick={() => Router.push("/prototype/" + val.id)}
                      cursor={"pointer"}
                    >
                      {console.log(val.Name)}
                      <Text color={"black"}>{val.Name}</Text>
                    </Box>
                  ))}
              </GridItem>
              <GridItem colEnd={12} className={style.colright}>
                <Box className={style.create}>
                  <a href="/creategroup" className={style.textcreate}>
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FPlus.png?alt=media&token=802be6cb-0fc7-4bf4-b532-0d82bf418805"
                      height={30}
                      width={30}
                    ></Image>
                    &nbsp;CREATE COMMU
                  </a>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </SSRProvider>
      );
    }
    return <></>;
  };

  return CurrentUser();
}
