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
} from "phosphor-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import {
  useCollection,
  useCollectionDataOnce,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";

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
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }
  // const [data, setData] = useState([]);
  // const [snapshot] = useCollectionOnce(
  //   collection(db, "UserDetail", user.uid, "pinnedGroup")
  // );

  // useEffect(()=>{
  //   if (user){
  //     const QuerySnapshot = query(collection(db, "UserDetail", user.uid, "pinnedGroup"))
  //     getDocs(QuerySnapshot).then(q=>{
  //       console.log(q.docs)
  //     })
  //   }

  // },[])

  // useEffect(() => {
  //   if (user && !loading) {
  //     getDocs(collection(db, "UserDetail", user.uid, "pinnedGroup")).then(
  //       (snapshot) => {
  //         setData(
  //           snapshot.docs.map((doc) => {
  //             doc.data();
  //           })
  //         );
  //       }
  //     );
  //   }
  // },[user, loading]);

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

                  {/* <MenuItem
                    minH="48px"
                    as={"button"}
                    title="Main Hall"
                    onClick={onOpen}
                  >
                    <PushPin size={32} />
                  </MenuItem> */}
                </MenuList>

                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>My Pinned</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      {/* {console.log(snapshot.docs)} */}
                      {/* {snapshot &&
                        snapshot.docs.map((doc) => (
                          <Text
                            onClick={router.push("/group/" + doc.data().id)}
                          >
                            [{doc.data().tag}]{doc.data().name}
                          </Text>
                        ))} */}
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
                      <MenuItem className={style.prName} isDisabled>
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
    </>
  );
}

export default CustomNavbar;
