import { ReactNode, useEffect, useRef, useState } from "react";
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
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";
import style from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";
import { SignIn } from "../components/signin";
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
  writeBatch,
} from "firebase/firestore";
import {
  useApp,
  useGroupHeader,
  useNotifications,
  useTab,
  useUser,
} from "../src/hook/local";
import { Chatsidebar } from "./chat/Chatsidebar";
import useSound from "use-sound";
import Notitab from "./notitab";
import { ChatBar } from "./ChatBar";

function CustomNavbar() {
  const { app, auth, db } = useApp();
  const { notidata, chatNotiData } = useNotifications();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const chatTabRef = useRef(null);
  const notiTabRef = useRef(null);
  const {
    isOpen: isNotiOpen,
    onOpen: onNotiOpen,
    onClose: onNotiClose,
    onToggle: onNotiToggle,
  } = useDisclosure();
  const {
    isOpen: isChatOpen,
    onOpen: onChatOpen,
    onClose: onChatClose,
    onToggle: onChatToggle,
  } = useDisclosure();
  const {
    isOpen: isSigninOpen,
    onOpen: onSigninOpen,
    onClose: onSigninClose,
  } = useDisclosure();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };
  const btnRef = React.useRef()
  const [data, setData] = useState(undefined);
  const [unreadChat, setUnreadChat] = useState([]);
  const [unreadnoti, setUnreadnoti] = useState([]);
  const [play] = useSound("/mixkit-shaker-bell-alert-599.mp3", {
    volume: 0.25,
  });
  const [playNoti] = useSound("/mixkit-happy-bell-alert-601.wav", {
    volume: 0.25,
  });
  const getgroup = useGroupHeader();

  const [isCSBExpanded, setCSBExpand] = useState(false);
  const onEnter = () => {
    setCSBExpand(true);
  };
  const onLeave = () => {
    setCSBExpand(false);
  };

  if (typeof window !== 'undefined') {
    document.addEventListener("mousedown", (e) => {
      if (chatTabRef.current && !chatTabRef.current.contains(e.target)) {
        onChatClose();
      }
    });
    document.addEventListener("mousedown", (e) => {
      if (notiTabRef.current && !notiTabRef.current.contains(e.target)) {
        onNotiClose();
      }
    });
  }
  useEffect(() => {
    let unsubscribe = () => { };
    if (user && !loading) {
      unsubscribe = onSnapshot(doc(db, "userDetail", user.uid), async (usrdoc) => {
        if (usrdoc.exists) {
          let pinnedgroup = [];
          if (usrdoc.data().pinned?.length > 0) {
            await Promise.all(
              usrdoc.data().pinned.map(async (gid) => {
                const grp = await getgroup(gid);
                pinnedgroup = [...pinnedgroup, grp];
              })
            );
          }
          setData({ ...usrdoc.data(), pinned: pinnedgroup });
        }
      })
    }
    return () => unsubscribe()
  }, [user, loading]);

  useEffect(() => {
    if (chatNotiData.length > 0 && user) {
      const unreadedItem = chatNotiData.filter(
        (v, i) => !v.readedby.includes(user.uid)
      );
      if (unreadedItem.length > 0) {
        play();
      }
      setUnreadChat(unreadedItem);
    }
  }, [chatNotiData]);

  useEffect(() => {
    if (notidata.length > 0) {
      const unreadedItem = notidata.filter((v, i) => v.readed == false);
      if (unreadedItem.length > 0) {
        playNoti();
      }
      setUnreadnoti(unreadedItem);
    }
  }, [notidata]);

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
            <Center
              bg="white"
              rounded={'full'}
              minHeight={38}
              borderWidth={2}
              borderColor={"black"}
              onClick={() => router.push("/profile/" + user.uid)}
            >
                <Avatar
                  h={41} w={41}
                  src={user.photoURL}
                  loading={"lazy"}
                />


              <Show above="lg">
                <Center width={"auto"} h={41} px={5}>
                  <Center fontFamily={"SarabunSB"} fontWeight={150} color={"black"}>
                    {user.displayName}
                  </Center>
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
          onClick={onSigninOpen}
          title="Login"
          color="#6768AB"
        >
          Login
        </Button>

        <Drawer
          isOpen={isSigninOpen}
          placement='right'
          onClose={onSigninClose}
          finalFocusRef={btnRef}
          size={'sm'}
        >
          <DrawerOverlay />
          <DrawerContent mt={55}>
            <DrawerCloseButton />
            <DrawerHeader>Sign in</DrawerHeader>

            <SignIn />

          </DrawerContent>
        </Drawer>
      </Center>
    );
  };

  const readNotification = () => {
    const batch = writeBatch(db);

    unreadnoti.map((noti) => {
      batch.update(doc(db, "userDetail", user.uid, "notification", noti.id), {
        readed: true,
      });
    });
    batch.commit();
  };

  return (
    <Box>
      <Box bg="#4C4D88" h="auto" w="100%" px={5} pos="fixed" zIndex={10000}>
        <Flex h={55} alignItems={"center"} justifyContent={"space-between"}>
          <Hide below="md">
            <Flex align={"center"} float={1} cursor="pointer">
              <Text
                className={style.Logonav}
                borderStyle={"black"}
                onClick={() => router.push("/")}
              >
                Comuthor
              </Text>
            </Flex>
          </Hide>

          {/* <Hide below="md">
            <Stack
              marginLeft="5"
              bg="white"
              rounded={10}
              borderWidth={2}
              borderColor={"black"}
            >
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
          </Hide> */}

          <Spacer />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              {user && (
                <>
                  <Menu>
                    <MenuButton
                      rounded="full"
                      variant="link"
                      cursor="pointer"
                      minW={0}
                      title="Chats"
                      onClick={onChatOpen}
                      position="relative"
                    >
                      <Center
                        bg="white"
                        minH={"38"}
                        minW={"38"}
                        rounded={50}
                        size={50}
                        borderColor={"black"}
                        borderWidth={2}
                      >
                        <Chats size={28} color="black" />
                      </Center>
                      {unreadChat.length > 0 && (
                        <Badge
                          bg="red"
                          rounded={100}
                          pos="absolute"
                          top={0}
                          left={6}
                        >
                          {unreadChat.length}
                        </Badge>
                      )}
                    </MenuButton>
                  </Menu>
                </>
              )}
              {user && (
                <Menu>
                  <MenuButton
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title="Notifications"
                    onClick={() => {
                      onNotiOpen();
                      readNotification();
                    }}
                    pos="relative"
                  >
                    <Center
                      bg="white"
                      minH={"38"}
                      minW={"38"}
                      rounded={50}
                      size={40}
                      borderColor={"black"}
                      borderWidth={2}
                    >
                      <Bell size={28} color="black" />
                      {unreadnoti.length > 0 && (
                        <Badge
                          bg="red"
                          rounded={100}
                          pos="absolute"
                          top={0}
                          left={6}
                        >
                          {unreadnoti.length}
                        </Badge>
                      )}
                    </Center>
                  </MenuButton>
                </Menu>
              )}
              <Menu>
                <MenuButton>
                  <Center
                    bg="white"
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    title="Commu"
                    minH={38}
                    minW={38}
                    borderColor={"black"}
                    borderWidth={2}
                  >
                    <UsersThree size={28} color="black" />
                  </Center>
                </MenuButton>

                <MenuList
                  bg={"white"}
                  minWidth={"auto"}
                  ml={-3}
                  mt={-1}
                  color={"black"}
                  cursor="pointer"
                  borderColor={"black"}
                  borderWidth={2}
                >
                  <MenuItem
                    minH="48px"
                    as={"a"}
                    onClick={() => router.push("/group")}
                    title="Main Hall"
                    _hover={{
                      backgroundColor: "gray.200",
                    }}
                  >
                    <House size={32} />
                  </MenuItem>

                  <MenuItem
                    minH="48px"
                    as={"a"}
                    onClick={() => router.push("/creategroup")}
                    title="Create Commu"
                    _hover={{
                      backgroundColor: "gray.200",
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
                      backgroundColor: "gray.200",
                    }}
                  >
                    <PushPin size={32} />
                  </MenuItem>
                </MenuList>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent borderWidth={2} borderColor={"black"}>
                    <ModalHeader bg={"gray.50"}>My Pinned</ModalHeader>
                    <ModalCloseButton rounded={"full"} />
                    <ModalBody>
                      {/* {console.log(data)} */}
                      {data?.pinned?.length > 0 &&
                        data.pinned.map((doc, k) => (
                          <Text
                            onClick={() => {
                              router.push("/group/" + doc.gid);
                              onClose();
                            }}
                            cursor={"pointer"}
                            key={k}
                            fontSize={18}
                            p={1}
                            _hover={{
                              borderRadius: '5',
                              backgroundColor: "gray.100",
                            }}
                          >
                            [{doc.tag}] {doc.name}
                          </Text>
                        ))}
                    </ModalBody>
                  </ModalContent>
                </Modal>

                {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}

                <Center
                  as="button"
                  onClick={
                    user ? () => router.push("/profile/" + user.uid) : () => { }
                  }
                >
                  <Loadthumbnail />
                </Center>

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
                        borderColor={"black"}
                        borderWidth={2}
                      >
                        <DotsThreeVertical size={28} color="black" />
                      </Center>
                    </MenuButton>

                    <MenuList
                      bg={"#FFFFFF"}
                      alignItems={"center"}
                      mr={-4}
                      color={"black"}
                      borderWidth={3}
                      borderColor={"black"}
                      w={100}
                      fontFamily={'Sarabun'}
                    >
                      <br />

                      <Center>
                        <Avatar
                          borderWidth={3}
                          borderColor={"black"}
                          size={"2xl"}
                          src={user.photoURL}
                        />
                      </Center>

                      <Center>
                        <Text
                          p={3}
                          fontSize={16}
                          fontFamily={'SarabunSB'}
                          fontWeight={"semibold"}
                        >
                          {user.displayName}
                        </Text>
                      </Center>

                      <MenuDivider />
                      {/* <MenuItem>Your Servers</MenuItem> */}
                      <MenuItem
                        fontFamily={'SarabunSB'}
                        _hover={{
                          backgroundColor: "gray.300",
                        }}
                        isDisabled
                      >
                        Account Settings
                      </MenuItem>
                      <MenuItem
                        fontFamily={'SarabunSB'}
                        onClick={() => router.push("/logout")}
                        _hover={{
                          backgroundColor: "gray.300",
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      <Chatsidebar user={user} db={db} isExpanded={isCSBExpanded} />

      <Box
        overflowY={"auto"}
        w="400px"
        h="auto"
        bg="white"
        pos="fixed"
        top="55px"
        right="85px"
        borderWidth={2}
        borderColor="black"
        borderRadius={10}
        display={isChatOpen ? "initial" : "none"}
        zIndex={20000}
        fontFamily={"Sarabun"}
        ref={chatTabRef}
      >
        <Box p={2} pl={5} pt={3} fontSize={23} fontWeight={700}>
          กล่องข้อความ
        </Box>
        <Box w={"100%"} onClick={onChatClose}>
          {chatNotiData ? (
            chatNotiData.map((data, k) => (
              <ChatNotiIcon data={data} user={user} key={k} />
            ))
          ) : (
            <></>
          )}
        </Box>

        <Center
          pt={"2.5"}
          pb={"2.5"}
          _hover={{
            bg: "gray.200",
          }}
        >
          ดูข้อความทั้งหมด
        </Center>
      </Box>

      <Box
        overflowY={"auto"}
        minW="300px"
        maxW={'500px'}
        h="auto"
        bg="white"
        pos="fixed"
        top="55px"
        right="85px"
        borderWidth={2}
        borderColor="black"
        borderRadius={10}
        display={isNotiOpen ? "initial" : "none"}
        zIndex={20000}
        fontFamily={"Sarabun"}
        ref={notiTabRef}
      >
        <Box p={2} pl={5} pt={3} fontSize={23} fontWeight={700}>
          การแจ้งเตือน
        </Box>

        <Flex direction={"column"} onClick={onNotiClose}>
          <Notitab bg={"facebook"} notidata={notidata} />
        </Flex>

        <Center
          pt={"2.5"}
          pb={"2.5"}
          _hover={{
            bg: "gray.200",
          }}
        >
          ดูแจ้งเตือนทั้งหมด
        </Center>
      </Box>
      {user && (<ChatBar chatnotidata={chatNotiData} user={user} isExpanded={isCSBExpanded} onEnter={onEnter} onLeave={onLeave} />)}

    </Box>
  );
}

const ChatNotiIcon = ({ data, user }) => {
  const { tabState, addTab, removeTab, changeTab, closeTab } = useTab();
  const getUser = useUser();
  // let thumbnail;
  // let name;
  const [display, setDisplay] = useState({
    thumbnail: null,
    name: null,
  });

  useEffect(() => {
    const getHeader = async () => {
      if (user && (data.type == "private" || data.type == "chara")) {
        const filteredname = data.member.find((v) => v !== user.uid);
        const detail = await getUser([filteredname]);
        const thumbnail = detail[0].photoURL;
        const name = detail[0].displayName;

        setDisplay({ thumbnail: thumbnail, name: name });
      } else {
        const thumbnail = data.thumbnail;
        const name = data.name;
        //
        setDisplay({ thumbnail: thumbnail, name: name });
      }
    };
    getHeader();
  }, [data, user]);

  const caltime = () => {
    // console.log(data.timestamp)
    const now = new Date(Date.now());
    // console.log(data)
    const sentdate = data.timestamp.toDate();

    // const nowYear = now.getFullYear();
    // const nowMonth = now.getMonth();

    const minusDate = now - sentdate;
    // console.log(now.getFullYear() - sentdate.getFullYear());

    if (
      now.getFullYear() - sentdate.getFullYear() > 0 &&
      Math.floor(minusDate / (30 * 3600 * 1000)) > 30
    ) {
      return now.getFullYear() - sentdate.getFullYear() + " ปี";
    } else if (
      now.getMonth() - sentdate.getMonth() > 0 &&
      Math.floor(minusDate / (30 * 3600 * 1000)) > 30
    ) {
      return now.getMonth() - sentdate.getMonth() + " เดือน";
    } else if (Math.floor(minusDate / (24 * 3600 * 1000)) > 0) {
      return Math.floor(minusDate / (24 * 3600 * 1000)) + " วัน";
    } else if (Math.floor(minusDate / (3600 * 1000)) > 0) {
      return Math.floor(minusDate / (3600 * 1000)) + " ชั่วโมง";
    } else if (Math.floor(minusDate / (60 * 1000)) > 0) {
      return Math.floor(minusDate / (60 * 1000)) + " นาที";
    } else {
      return Math.floor(minusDate / 1000) + " วินาที";
    }
  };

  // console.log(name)
  return (
    <Box
      w="100%"
      // bg={'tomato'}
      onClick={() => changeTab(data.id)}
      mt="2.5px"
      mb={"2.5px"}
      p={2}
      fontFamily={'Sarabun'}
      cursor="pointer"
      _hover={{
        bg: "gray.200",
      }}
    >
      <Flex justifyContent="space-between" marginLeft={2} marginRight={2}  >
        <Flex justifyContent="start">
          <Avatar
            src={display.thumbnail}
            // height="53px"
            // weight="53px"
            size={'md'}
            rounded={100}
            marginRight="15px"
          />
          <Box maxW={245} whiteSpace={"nowrap"} overflow={"hidden"} textOverflow={"ellipsis"}>
            <Text fontWeight={'bold'}>{display.name}</Text>
            <Text fontSize={14}>
              {data?.senderId == user?.uid ? "คุณ: " : ""} {data?.lastmsg}
            </Text>
          </Box>
        </Flex>
        {data.timestamp && <Text color={'gray.400'} fontSize={14}>{caltime()}</Text>}
      </Flex>
    </Box>
  );
};

export default CustomNavbar;
