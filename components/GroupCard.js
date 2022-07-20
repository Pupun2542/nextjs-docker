import React, { useEffect, useState } from "react";
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
import {
  Eye,
  PushPin,
  Heart,
} from "phosphor-react";
import { useRouter } from "next/router";
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
  Image,
  Divider,
} from '@chakra-ui/react'

function GroupCard() {
  const Router = useRouter();
  const { bws } = Router.query;

  const { app, auth, db } = useApp();

  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);
  const chooseColor = (rating) => {
    // let color = "";
    if (rating === "NC-21 (ไม่เหมาะสำหรับเยาวชน)") {
      return "#EA4545";
      // console.log(d.data().rating);
    } else if (rating === "R-18 (เหมาะสำหรับอายุ 18 ปีขึ้นไป)") {
      return "#FF912B";
      // console.log(d.data().rating);
    } else if (rating === "R-13 (เหมาะสำหรับอายุ 13 ปีขึ้นไป)") {
      return "#FBBC43";
      // console.log(d.data().rating);
    } else {
      return "#72994C";
      // console.log(d.data().rating);
    }

  }

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
          QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id, color: chooseColor(doc.data().rating) }))
        );
        setLoading(false);
      }
    };
    Fetchdata();
  }, [bws]);

  return (
    <Flex
      justifyContent={'center'}
      bg={'white'}
      direction={'column'}
    >
      {!loading &&
        commu.map((value, index) => {
          return (
            <Flex
              onClick={() => {
                if (value.member.includes(auth.currentUser.uid)) {
                  Router.push("/group/" + value.id + "/dashboard");
                } else {
                  Router.push("/group/" + value.id);
                }
              }}
              bg={"#F3F3F3"}
              mr={5}
              ml={5}
              mt={2}
              mb={1.5}
              p={5}
              w={900}
              h={'auto'}
              boxShadow={'0px 0px 2px rgba(0, 0, 0.25)'}
              borderRadius={10}
              _hover={{
                background: "gray.300"
              }}
              // as="button"
              cursor="pointer"
              justifyContent={'center'}
            >
              <Center w={'50%'}>
                <Image src={value.banner} borderRadius={5} height="216" width="384" />
              </Center>

              <VStack ml={5} w={'50%'}>
                <Box
                  // bg={'tomato'}
                  color="black"
                  w={'100%'}
                  fontSize={24}
                  fontFamily={'Mitr'}
                  borderBottomWidth={2}
                  borderBottomColor={'black'}
                >
                  <Box>
                    [{value.tag}]&#160;{value.name}
                  </Box>
                  {/* <Box
                    fontSize={14}
                  >
                    นาย A, นายB และอีก 1 คน
                  </Box> */}
                </Box>

                <Wrap
                  w={456}
                  maxW={415}
                  minH={115}
                >
                  {value.genre.map((tag) => {
                    return <WrapItem
                      bg={"white"}
                      m={1}
                      borderRadius={10}
                      pt={1} pb={1} pl={2} pr={2}
                      fontFamily={'Mitr'}
                      borderWidth={2}
                      borderColor={'black'}
                    >{tag}</WrapItem>;
                  })}

                  {value.tws.map((tag) => {
                    return <WrapItem
                      bg={"#EA4545"}
                      m={1}
                      borderRadius={10}
                      pt={1} pb={1} pl={2} pr={2}
                      fontFamily={'Mitr'}
                      color={'white'}
                    >{tag}
                    </WrapItem>;
                  })}

                  {/* <Center> */}
                  <WrapItem
                      bg={value.color}
                      m={1}
                      borderRadius={10}
                      pt={1} pb={1} pl={2} pr={2}
                      fontFamily={'Mitr'}
                      color={'white'}
                    >{value.rating.split(" ", 1)[0]}
                    </WrapItem>
                  {/* </Center> */}
                </Wrap>

                <Wrap fontFamily={'Mitr'} w={'100%'}>
                  {/* <Eye size={26} />
                  <Box>100</Box> */}
                  <Heart size={26} />
                  <Box>{value.love?.length}</Box>
                  <PushPin size={26} />
                  <Box>{value.pinned?.length}</Box>
                </Wrap>
              </VStack>
            </Flex>
          );
        })}
    </Flex>
  );
}

export default GroupCard;