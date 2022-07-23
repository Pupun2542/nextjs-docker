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
              bg={"#F3F5F8"}
              mr={5}
              ml={5}
              mt={2}
              mb={1.5}
              p={5}
              w={900}
              h={'auto'}
              boxShadow={'base'}
              borderRadius={10}
              _hover={{
                background: "gray.200"
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
                  fontFamily={'Sarabun'}
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
                      pt={0.5} pb={0.5} pl={2} pr={2}
                      fontFamily={'Sarabun'}
                      borderWidth={2}
                      fontSize={14}
                      borderColor={'black'}
                    >{tag}</WrapItem>;
                  })}

                  {value.tws.map((tag) => {
                    return <WrapItem
                      bg={"#EA4545"}
                      m={1}
                      borderRadius={10}
                      pt={0.5} pb={0.5} pl={2} pr={2}
                      fontFamily={'Sarabun'}
                      fontSize={14}
                      color={'white'}
                      
                    >
                      <Center minWidth={35}>
                        {tag}
                      </Center>
                    </WrapItem>;
                  })}

                  {/* <Center> */}
                  <WrapItem
                    bg={value.color}
                    m={1}
                    borderRadius={10}
                    pt={0.5} pb={0.5} pl={2} pr={2}
                    fontFamily={'Sarabun'}
                    fontSize={13}
                    color={'white'}
                    justifyItems={'center'}
                  >
                    <Center minWidth={35}>{value.rating.split(" ", 1)[0]}</Center>
                  </WrapItem>
                  {/* </Center> */}
                </Wrap>

                <Wrap
                  bg={'white'}
                  fontFamily={'Sarabun'}
                  w={'100%'}
                  boxShadow={'base'}
                  p={1}
                  rounded={5}
                >
                  {/* <Eye size={26} />
                  <Box>100</Box> */}
                  <Center
                    bg={'#F3F5F8'}
                    p={1}
                    rounded={5}
                    w={'30%'}
                  >
                    <Heart size={26} />
                    <Box pl={5}>{value.love?.length}</Box>
                  </Center>

                  <Center
                    bg={'#F3F5F8'}
                    p={1}
                    rounded={5}
                    w={'30%'}
                  >
                    <PushPin size={26} />
                    <Box pl={5}>{value.pinned?.length}</Box>
                  </Center>

                </Wrap>
              </VStack>
            </Flex>
          );
        })}
    </Flex>
  );
}

export default GroupCard;