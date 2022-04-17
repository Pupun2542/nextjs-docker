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
import reactDom from "react-dom";
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
import {
  useCollection,
  useCollectionDataOnce,
  useCollectionOnce,
  useDocumentDataOnce,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
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
  const app = getApp();
  const auth = getAuth(app);
  const db = getFirestore(app);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [chatTab, setChatTab] = useState([]);

  // useEffect(() => {
  //   if (user && !loading) {
  //     const QuerySnapshot = query(
  //       collection(db, "userDetail", user.uid, "pinnedGroup")
  //     );
  //     getDocs(QuerySnapshot).then((snapshot) => {
  //       setData(snapshot.docs().map((doc) => doc));
  //     });
  //   }
  // }, [user, loading]);

  // useEffect(() => {
  //   if (user && !loading) {
  //     const QuerySnapshot = query(
  //       collection(
  //         db,
  //         "userDetail",
  //         user.uid,
  //         "chatMessage",
  //         where("readed", "==", "unread"),
  //         orderBy("timestamp", "asc")
  //       )
  //     );

  //     const unsubscribe = onSnapshot(QuerySnapshot, (snapshot) => {
  //       let unreadtab = [];
  //       snapshot.docChanges().map((doc) => {
  //         if (doc.type == "added") {
  //           const id = doc.data().chatroom;
  //           if (!unreadtab.includes(id) && unreadtab.length < 5) {
  //             unreadtab = [...unreadtab, id];
  //           }
  //         }
  //       });
  //       setUnreadMessage(unreadtab);
  //     });
  //     return () => unsubscribe();
  //   }
  // }, [user, loading]);

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
            <Center bg="#6768AB" rounded={50} minHeight={38}>
              <Center px={0}>
                <Avatar h={41} w={41} src={user.photoURL} />
              </Center>

              <Show above="lg">
                <Center width={"auto"} h={38} px={5}>
                  <p className={style.prName}>{user.displayName}</p>
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
      <Box bg="black" h="auto" w="auto" px={5}>
        <Flex h={55} alignItems={"center"} justifyContent={"space-between"}>
          <Show above="md">
            <Flex align={"center"} float={1} cursor="pointer">
              <Text className={style.Logonav} onClick={() => router.push("/")}>
                Comuthor
              </Text>
            </Flex>
          </Show>

          <Show above="md">
            <Stack spacing={4} marginLeft="5" bg="white" rounded={10}>
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
          </Show>

          <Spacer />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>
              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    minH={50}
                    title="Chats"
                    // isDisabled
                    onClick={() => router.push("/chat")}
                  >
                    <Center
                      bg="#FFC75A"
                      minH={"38"}
                      minW={"38"}
                      rounded={50}
                      size={50}
                      padding={1}
                    >
                      <Chats size={32} color="#6768AB" />
                    </Center>
                  </MenuButton>

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

              {user && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title="Notifications"
                  >
                    <Center
                      bg="#FFC75A"
                      minH={"38"}
                      minW={"38"}
                      rounded={50}
                      size={40}
                      padding={1}
                    >
                      <Bell size={32} color="#6768AB" />
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

              <Menu>
                <MenuButton>
                  <Center
                    as={Button}
                    bg="#FFC75A"
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    title="Commu"
                    minH={41}
                    minW={41}
                  >
                    <UsersThree size={32} color="#6768AB" />
                  </Center>
                </MenuButton>

                <MenuList
                  bg={"#343434"}
                  minWidth={"auto"}
                  ml={-3}
                  mt={-1}
                  color={"white"}
                >
                  <MenuItem
                    minH="48px"
                    as={"a"}
                    href="/group"
                    title="Main Hall"
                  >
                    <House size={32} />
                  </MenuItem>

                  <MenuItem
                    minH="48px"
                    as={"a"}
                    href="/creategroup"
                    title="Create Commu"
                  >
                    <Plus size={32} />
                  </MenuItem>

                  <MenuItem
                    minH="48px"
                    as={"button"}
                    title="Pin"
                    onClick={onOpen}
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
                        data.map((doc) => (
                          <Text
                            onClick={() => router.push("/group/" + doc.id)}
                            cursor={"pointer"}
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
                      as={Button}
                      rounded="full"
                      variant="link"
                      cursor="pointer"
                      minW={0}
                      title="Account"
                    >
                      <Center
                        bg="#FFC75A"
                        minH={"38"}
                        minW={"38"}
                        rounded={50}
                        size={38}
                        padding={1}
                      >
                        <DotsThreeVertical size={32} color="#6768AB" />
                      </Center>
                    </MenuButton>

                    <MenuList
                      bg={"#343434"}
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
                        <p className={style.prName}>{user.displayName}</p>
                      </Center>

                      <br />

                      <MenuDivider />
                      {/* <MenuItem>Your Servers</MenuItem> */}
                      <MenuItem className={style.prName} onClick={()=>router.push("/profile/"+user.uid)}>
                        Account Settings
                      </MenuItem>
                      <MenuItem
                        className={style.prName}
                        onClick={() => router.push("/logout")}
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
      {chatTab.length > 0 ? (
        chatTab.map((tab) => (
          <Flex position="fixed" right={3} bottom={0} alignItems="flex-end">
            <ChatIcon
              tab={tab}
              user={user.uid}
              setChatTab={setChatTab}
              chatTab={chatTab}
              db={db}
            />
          </Flex>
        ))
      ) : (
        <></>
      )}
    </>
  );
}
const ChatIcon = ({ tab, user, setChatTab, db, chatTab }) => {
  const QueryUnreadedSnapshot = query(
    collection(db, "userDetail", user, "chatMessage"),
    where("readed", "==", false)
  );
  const [unreadedSnapshot] = useCollection(QueryUnreadedSnapshot);
  const unreadnum = unreadedSnapshot.docs.length;

  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  return (
    <>
      {unreadnum &&
        unreadnum.length >
          0(
            <Center
              float="left"
              background="#343434"
              rounded={100}
              color={"white"}
              w={50}
              h={50}
              _hover={{
                backgroundColor: "#4D4D88",
              }}
              onClick={onToggle}
              marginBottom="3"
            >
              <Chats size={32} />
              <Badge>{unreadnum}</Badge>
            </Center>
          )}
      {isOpen && (
        <ChatBox
          tab={tab}
          user={user}
          onClose={onClose}
          setTab={setChatTab}
          isOpen={isOpen}
          db={db}
          chatTab={chatTab}
        />
      )}
    </>
  );
};

const ChatBox = ({ tab, user, onClose, setTab, isOpen, db, chatTab }) => {
  const [chatRoomData] = useDocumentDataOnce(doc(db, "chatrooms", tab));
  const QuerySnapshot = query(collection(db, "chatrooms", tab, "message"));
  const [snapshot] = useCollection(QuerySnapshot);
  const removetab = () => {
    setTab([...chatTab.filter((v, i) => v != tab)]);
    onClose();
  };

  return (
    <Box
      display={isOpen ? "flex" : "none"}
      background="tomato"
      width={340}
      height={455}
      float="left"
      marginRight={5}
    >
      <Box>
        <Image
          src={chatRoomData.thumbnail}
          w={25}
          h={25}
          rounded="full"
          float="left"
          marginLeft={5}
        />
        <Box>{chatRoomData.name}</Box>
        <IconButton
          onClick={onClose}
          icon={<Minus size={32} weight="bold" />}
          float={"left"}
        />
        <IconButton
          onClick={removetab}
          icon={<X size={32} weight="bold" />}
          float={"left"}
        />

        <Box overflowY="scroll">
          {snapshot.docs.map((doc, k) => (
            <Flex
              flexDirection={
                doc.data().senderId == user.uid ? "row-reverse" : "row"
              }
              key={k}
              alignItems={"center"}
              padding="20px"
              maxH={500}
            >
              {/* {console.log()} */}
              <Box fontFamily={"Mitr"}>
                {doc.data().senderId == user.uid ? (
                  <Box minW={280} maxW={320} marginBottom={5}>
                    <Text fontSize={12}>{doc.data().sender}</Text>
                    <Text
                      fontSize={16}
                      backgroundColor={"blue.100"}
                      rounded="5"
                      fontFamily={"Mitr"}
                      p={2}
                    >
                      {doc.data().text}
                    </Text>
                    {console.log()}
                    {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                  </Box>
                ) : (
                  <Box minW={280} maxW={320} marginBottom={5}>
                    <Text fontSize={12}>{doc.data().sender}</Text>
                    <Text
                      fontSize={16}
                      fontFamily="Mitr"
                      backgroundColor={"red.200"}
                      rounded="5"
                      p={2}
                    >
                      {doc.data().text}
                    </Text>
                    {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                  </Box>
                )}
              </Box>
            </Flex>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CustomNavbar;
