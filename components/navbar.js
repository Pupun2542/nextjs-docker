import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  HStack,
  VStack,
  useColorMode,
  Center,
  Image,
  Text,
  Spacer,
  Input,
  InputLeftElement,
  InputGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Hide,
  Show,
  Badge,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import style from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";

import {
  UsersThree,
  Plus,
  House,
  DotsThreeVertical,
  Chats,
  Bell,
  MagnifyingGlass,
  PushPin,
  Minus,
  X,
} from "phosphor-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useApp, useNotifications, useUser } from "../src/hook/local";
// import ChatBox from "./chat";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function CustomNavbar() {
  // const app = getApp();
  // const auth = getAuth(app);
  // const db = getFirestore(app);
  const {app, auth, db} = useApp();
  const { notidata, chatNotiData } = useNotifications()
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { isOpen: isNotiOpen, onOpen: onNotiOpen, onClose: onNotiClose } = useDisclosure();
  // const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose } = useDisclosure();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };
  const [data, setData] = useState([]);
  const [unreadChat, setUnreadChat] = useState([]);
  const [unreadnoti, setUnreadnoti] = useState([]);
  // const userdata = useUser()
  // const 

  useEffect(() => {
    if (user && !loading) {
      const QuerySnapshot = query(
        collection(db, "userDetail", user.uid, "pinnedGroup")
      );
      getDocs(QuerySnapshot).then((snapshot) => {
        // console.log(snapshot.docs)
        if (snapshot.size > 0){
          setData(snapshot.docs.map((doc) => doc.data()));
        }
      });
    }
  }, [user, loading]);

  useEffect(()=>{
    if (chatNotiData.length>0){
      setUnreadChat(chatNotiData.filter((v,i)=> v.readed == false));
    }
  },[chatNotiData])
  useEffect(()=>{
    if (notidata.length>0){
      setUnreadnoti(notidata.filter((v,i)=> v.readed == false));
    }
  },[notidata])

  const Loadthumbnail = () => {
    if (user) {
      return (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
            minH={0}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Center bg="white" rounded={50} minHeight={38} borderWidth={2} borderColor={'black'}>
              <Center px={0}>
                <Avatar h={41} w={41} src={user.photoURL} />
              </Center>

              <Show above="lg">
                <Center width={"auto"} h={41} px={5}>
                  <Center fontFamily={'Mitr'} fontWeight={150} color={'black'}>{user.displayName}</Center>
                </Center>
              </Show>
            </Center>
          </MenuButton>
        </Menu>
      );
    }

    if (loading) {
      return <div>loading user</div>;
    }
    return (
      <Center bg={"#FFC75A"} rounded={"10"}>
        <Button
          variant="primary"
          onClick={() => router.push("/login")}
          title="Login"
          color="#6768AB"
        >
          Login
        </Button>
      </Center>
    );
  };

  return (
    <>
      <Box bg="#4C4D88" h="auto" w="auto" px={5}>
        <Flex h={55} alignItems={"center"} justifyContent={"space-between"}>
          <Hide below="md">
            <Flex align={"center"} float={1} cursor="pointer">
              <Text className={style.Logonav} borderStyle={'black'} onClick={() => router.push("/")}>
                Comuthor
              </Text>
            </Flex>
          </Hide>  
            

          <Hide below="md">
            <Stack marginLeft="5" bg="white" rounded={10} borderWidth={2} borderColor={'black'}>
              <InputGroup>
                <InputLeftElement 
                  pointerEvents="none"
                  children={<MagnifyingGlass color="black" />}
                />
                <Input
                  placeholder="ค้นหาบน Comuthor"
                  className={style.search}
                  isDisabled
                />
              </InputGroup>
            </Stack>
          </Hide>

          <Spacer />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              {user && (
                <Menu>
                  <MenuButton
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title="Chats"
                  >
                    <Center
                      bg="white"
                      minH={"38"}
                      minW={"38"}
                      rounded={50}
                      size={50}
                      borderColor={'black'}
                      borderWidth={2}
                    >
                      <Chats size={28} color="black" />
                    </Center>
                    {unreadChat.length>0&&(<Badge bg="red" rounded={100} pos="absolute" top={0} left={6}>{unreadChat.length}</Badge>)}
                  </MenuButton>
                  
                  {/* <Box>
                    {chatNotiData?
                      chatNotiData.map((data)=>(
                        <Box> */}
                          {/* <Image src={data.thumbnail} sizes={16} rounded /> */}
                          {/* <Text>{data.name}</Text>
                          <Text>{data.message}</Text>
                        </Box>
                      ))
                    :(
                      <></>
                    )}
                  </Box> */}
                  
                </Menu>
              )}

              {user && (
                <Menu>
                  <MenuButton
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title="Notifications"
                  >
                    <Center
                      bg="white"
                      minH={"38"}
                      minW={"38"}
                      rounded={50}
                      size={40}
                      borderColor={'black'}
                      borderWidth={2}
                    >
                      <Bell size={28} color="black" />
                      {unreadnoti.length>0&&(<Badge bg="red" rounded={100} pos="absolute" top={0} left={6}>{unreadnoti.length}</Badge>)}
                      
                    </Center>
                    
                  </MenuButton>
                </Menu>
              )}

              {/* <MenuList minWidth={"auto"} ml={-1}>

                        <MenuItem minH="48px" as={"a"} href="#" title='Main Hall'>
                          <House size={32} /> 
                        </MenuItem>

                        <MenuItem minH="48px" as={"a"} href="#" title='Create Commu'>
                          <Plus size={32} />
                        </MenuItem>
                        
                      </MenuList> */}

              <Menu >
                <MenuButton>
                  <Center
                    bg="white"
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    title="Commu"
                    minH={38}
                    minW={38}
                    borderColor={'black'}
                    borderWidth={2}
                  >
                    <UsersThree size={28} color="black" />
                  </Center>
                </MenuButton>

                <MenuList
                  bg={"#6768AB"}
                  minWidth={"auto"}
                  ml={-3}
                  mt={-1}
                  color={"black"}
                  
                >
                  <MenuItem
                    minH="48px"
                    as={"a"}
                    href="/group"
                    title="Main Hall"
                    _hover={{
                      backgroundColor: 'gray.400'
                    }}
                  >
                    <House size={32} />
                  </MenuItem>

                  <MenuItem
                    minH="48px"
                    as={"a"}
                    href="/creategroup"
                    title="Create Commu"
                    _hover={{
                      backgroundColor: 'gray.400'
                    }}
                  >
                    <Plus size={32} />
                  </MenuItem>

                  <MenuItem
                    minH="48px"
                    as={"button"}
                    title="Pin"
                    onClick={onOpen}
                    _hover={{
                      backgroundColor: 'gray.400'
                    }}
                  >
                    <PushPin size={32} />
                  </MenuItem>
                </MenuList>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>My Pinned</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {data.length > 0 &&
                        data.map((doc,k) => (
                          <Text
                            onClick={() => router.push("/group/" + doc.id)}
                            cursor={"pointer"}
                            key={k}
                          >
                            [{doc.tag}]{doc.name}
                          </Text>
                        ))}
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}

                <Loadthumbnail />

                {user && (
                  <Menu>
                    <MenuButton
                      rounded="full"
                      variant="link"
                      cursor="pointer"
                      minW={0}
                      title="Account"
                    >
                      <Center
                        bg="white"
                        minH={"38"}
                        minW={"38"}
                        rounded={50}
                        size={38}
                        padding={1}
                        borderColor={'black'}
                        borderWidth={2}
                      >
                        <DotsThreeVertical size={28} color="black" />
                      </Center>
                    </MenuButton>

                    <MenuList
                      bg={"#6768AB"}
                      alignItems={"center"}
                      mr={-4}
                      color={"white"}
                    >
                      <br />

                      <Center>
                        <Avatar size={"2xl"} src={user.photoURL} />
                      </Center>

                      <br />

                      <Center>
                        <Box className={style.prName}>{user.displayName}</Box>
                      </Center>

                      <br />

                      <MenuDivider />
                      {/* <MenuItem>Your Servers</MenuItem> */}
                      <MenuItem 
                        className={style.prName}
                        _hover={{
                          backgroundColor: 'gray.400'
                        }} 
                        onClick={()=>router.push("/profile/"+user.uid)}
                      >

                        Account Settings
                      </MenuItem>
                      <MenuItem
                        className={style.prName}
                        onClick={() => router.push("/logout")}
                        _hover={{
                          backgroundColor: 'gray.400'
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>

                    {/* <MenuList minWidth={"auto"} ml={-1}>

                        <MenuItem minH="48px" as={"a"} href="#" title='Main Hall'>
                          <House size={32} /> 
                        </MenuItem>

                        <MenuItem minH="48px" as={"a"} href="#" title='Create Commu'>
                          <Plus size={32} />
                        </MenuItem>
                        
                      </MenuList> */}
                  </Menu>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}


export default CustomNavbar;
