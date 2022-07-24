import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useReducer,
} from "react";
import CustomNavbar from "../../../components/navbar";

import {
  Box,
  Flex,
  Center,
  Spacer,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Button,
  Text,
  Image,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  SimpleGrid,
} from "@chakra-ui/react";
import { CaretDown, ImageSquare } from "phosphor-react";

import { Info, Megaphone, X } from "phosphor-react";
import { GroupPost } from "../../../components/groupcomponents/post";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp, useUser } from "../../../src/hook/local";
import { useRouter } from "next/router";
import axios from "axios";
import { UploadGroupImage } from "../../../src/services/filestoreageservice";
import Gallery from "../../../components/groupcomponents/gallery";
import { Member } from "../../../components/groupcomponents/member";
import Setting from "../../../components/groupcomponents/setting";
import { GroupSinglePost } from "../../../components/groupcomponents/singlePost";
import { isEmptyOrSpaces } from "../../../src/services/utilsservice";
import { useGroupData } from "../../../src/hook/useGroupData";
import { usePost } from "../../../src/hook/usePost";
import { Skeletonpost } from "../../../components/groupcomponents/skeletonpost";
import Postsection from "../../../components/groupcomponents/Postsection";
import { GroupBar } from "../../../components/groupBar";

export const PostContext = createContext();
function dashboard() {
  const { app, auth, db } = useApp();
  const [user, userLoading, error] = useAuthState(auth);
  const Router = useRouter();
  const { id, pid, cid, rid } = Router.query;
  const [tabIndex, setTabIndex] = useState(0);
  const { data, loading, onRefresh } = useGroupData(id, user);

  if (!loading && data) {
    return (
      <Box bg={"#F3F5F8"}>
        <CustomNavbar />

        <Flex justifyContent={"center"}>
          <GroupBar id={id} data={data} user={user} />
          <Flex
            pt={55}
            fontFamily={"Sarabun"}
            justifyContent={"center"}
            boxShadow="base"
            minW={950}
            bg={"white"}
          >
            <Box
              minH={"calc(100vh - 55px)"}
              bg={"#F3F5F8"}
              minW={800}
              maxW={800}
              boxShadow="base"
            >

              <VStack w={"100%"} spacing={0}>
                <Flex w={"100%"}>
                  <Center
                    color={"white"}
                    pl={22}
                    w={"100%"}
                    maxW={800}
                    fontWeight={"700"}
                    minH={75}
                    fontSize={28}
                    bg={"#6768AB"}
                  >
                    [{data?.tag}] {data?.name}
                  </Center>

                  <Box p={1} bg={"#6768AB"} cursor={"pointer"}>
                    <Popover bg={"#6768AB"}>
                      <PopoverTrigger>
                        <Info color="#FFC75A" size={22} weight="fill" />
                      </PopoverTrigger>

                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody
                          whiteSpace={"pre-line"}
                          maxH={500}
                          overflowY={"auto"}
                          css={{
                            "&::-webkit-scrollbar": {
                              width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                              width: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              background: "#727272",
                              borderRadius: "24px",
                            },
                          }}
                        >
                          {data.description
                            ? data.description
                            : "ไม่มีคำอธิบายคอมมู"}
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Box>
                </Flex>

                <Tabs
                  w={"100%"}
                  maxW={800}
                  isFitted
                  index={tabIndex}
                  onChange={(e) => setTabIndex(e)}
                >
                  {/* หัว tab */}
                  <TabList mb="1em">
                    <Tab
                      _selected={{
                        color: "white",
                        bg: "#9A9AB0",
                        margin: "2",
                        borderRadius: "10",
                      }}
                      onClick={() =>
                        Router.replace(
                          "/group/" + id + "/dashboard",
                          undefined,
                          {
                            shallow: true,
                          }
                        )
                      }
                    >
                      Post
                    </Tab>
                    <Tab
                      _selected={{
                        color: "white",
                        bg: "#9A9AB0",
                        margin: "2",
                        borderRadius: "10",
                      }}
                    >
                      Gallery
                    </Tab>

                    <Tab
                      _selected={{
                        color: "white",
                        bg: "#9A9AB0",
                        margin: "2",
                        borderRadius: "10",
                      }}
                    >
                      Member
                    </Tab>
                    {/* {console.log(data)} */}
                    {data?.isStaff && (
                      <Tab
                        _selected={{
                          color: "white",
                          bg: "#9A9AB0",
                          margin: "2",
                          borderRadius: "10",
                        }}
                      >
                        Setting
                      </Tab>
                    )}
                  </TabList>

                  <TabPanels>
                    {/* Post */}
                    <TabPanel>
                      {/* ประกาศ */}
                      <Postsection data={data} pid={pid} user={user} id={id} />
                      {/* <Flex
                      w={"100%"}
                      bg={"white"}
                      boxShadow="base"
                      h={55}
                      borderRadius={10}
                    >
                      <Center
                        borderRightRadius={10}
                        bg={"#FBBC43"}
                        w={65}
                        transform={"auto"}
                        scaleX={"-1"}
                        color={"#FFFFFF"}
                      >
                        <Megaphone size={42} />
                      </Center>

                      <Box w={"81%"} p={4}></Box>

                      <Center w={"65"} color={"gray.500"}>
                        เพิ่มเติม
                      </Center>
                    </Flex>
                      กล่องข้อความ
                      <Flex
                        mt={3}
                        p={2}
                        boxShadow={"base"}
                        bg={"white"}
                        borderRadius={10}
                        cursor={"pointer"}
                      >
                        <Image
                          mr={2}
                          rounded={"100%"}
                          h={42}
                          w={42}
                          src={user.photoURL}
                        />
                        <Text
                          w="93%"
                          mt={2}
                          color={"GrayText"}
                          onClick={onOpen}
                        >
                          {message ? message : "Say Something"}
                        </Text>
                        <Input placeholder='Basic usage' w={'93%'} />
                      </Flex>
                      โพสต์
                      {console.log(post)}
                      <PostContext.Provider value={pack}>
                        {post &&
                          Array.isArray(post) &&
                          post.map((apost, i) => (
                            <GroupPost
                              post={getStateDataData(apost)}
                              key={i}
                              member={data.member}
                              onPostDelete={() => onPostDelete(i)}
                              mychara={data.mychara}
                              data={data}
                              gid={id}
                            />
                          ))}
                        {post.length > 0 && pid && (
                        <GroupSinglePost
                          post={getStateDataData(pid)}
                          member={data.member}
                          onPostDelete={() => onPostDelete(0)}
                          cid={cid}
                          rid={rid}
                          gid={id}
                          data={data}
                          mychara={data.mychara}
                        />
                      )}
                        {post.length == 0 &&
                          data &&
                          data.postcount &&
                          data.postcount > 0 && <Skeletonpost />}
                      </PostContext.Provider>

                      <Modal isOpen={isOpen} size={"3xl"} onClose={onClose}>
                        <ModalOverlay
                          bg="blackAlpha.300"
                          backdropFilter="blur(10px) hue-rotate(90deg)"
                        />
                        <ModalContent>
                          <ModalHeader fontFamily={"SarabunSB"}>
                            Create Post
                          </ModalHeader>
                          <ModalCloseButton />
                          <Divider />
                          <ModalBody>
                            <Flex mb={1}>
                              <Avatar
                                mr={2}
                                src={
                                  Object.keys(selectedchara).length > 0
                                    ? selectedchara.photoURL
                                    : ""
                                }
                              />
                              <Flex spacing={0} direction={"column"}>
                                <Text>
                                  {Object.keys(selectedchara).length > 0
                                    ? selectedchara.name
                                    : "Chara Name"}
                                </Text>
                                <Menu>
                                  <MenuButton
                                    as={Button}
                                    rightIcon={<CaretDown size={6} />}
                                    height={26}
                                    w={"auto"}
                                  >
                                    <Text fontSize="sm">
                                      {selectedchara.name}
                                    </Text>
                                  </MenuButton>

                                  <MenuList>
                                    {data.mychara &&
                                      Object.values(data.mychara).map(
                                        (cha, i) => (
                                          <MenuItem
                                            onClick={() =>
                                              setSelectedchara(cha)
                                            }
                                            key={i}
                                          >
                                            <Flex alignItems={"center"}>
                                              <Avatar
                                                src={cha.photoURL}
                                                w={8}
                                                h={8}
                                                mr={1}
                                              />
                                              <Text fontSize="sm">
                                                {cha.name}
                                              </Text>
                                            </Flex>
                                          </MenuItem>
                                        )
                                      )}
                                  </MenuList>
                                </Menu>
                              </Flex>
                            </Flex>

                            <Textarea
                              mt={1}
                              mb={2}
                              onChange={(e) => setMessage(e.target.value)}
                              value={message}
                              onPaste={handleImagePaste}
                              onKeyDown={resizeTextArea}
                            />
                            <Input
                              mt={2}
                              p={2}
                              h={"auto"}
                              display="none"
                              type="file"
                              ref={pasteInputRef}
                            />
                            <Input
                              type="file"
                              id="file"
                              ref={inputFileRef}
                              display="none"
                              onChange={(e) => handleUploadFile(e)}
                            />

                            <Center
                              w={"100%"}
                              bg={"#F3F5F8"}
                              mb={2}
                              rounded={5}
                            >
                              <Flex width={"100%"}>
                                <Center pl={3} pr={2} fontFamily={"SarabunSB"}>
                                  Tag
                                </Center>
                                <Center p={1} width={"100%"}>
                                  <Input width={"100%"} bg={"white"}></Input>
                                </Center>
                              </Flex>
                            </Center>
                            {image && (
                            <Box>
                              <Box></Box>
                              <Box
                                display={image.length > 2 ? "initial" : "none"}
                              ></Box>
                            </Box>
                          )}
                            <Box
                              w="100%"
                              height={150}
                              overflowX="auto"
                              overflowY="hidden"
                              whiteSpace="nowrap"
                              display={
                                image.length > 0 ? "inline-block" : "none"
                              }
                            >
                              {image.length > 0 &&
                                image.map((img, k) => (
                                  <Box
                                    key={k}
                                    display={"inline-block"}
                                    pos={"relative"}
                                  >
                                    <Image
                                      src={img}
                                      width={150}
                                      height={150}
                                      objectFit="cover"
                                    />
                                    <IconButton
                                      icon={<X size={16} color="black" />}
                                      position="absolute"
                                      top={"-6px"}
                                      left={114}
                                      backgroundColor="transparent"
                                      _hover={{
                                        backgroundColor: "transparent",
                                      }}
                                      onClick={() =>
                                        setImage(
                                          image.filter((v, i) => i !== k)
                                        )
                                      }
                                    ></IconButton>
                                  </Box>
                                ))}
                            </Box>
                            <Flex justifyContent={"flex-end"}>
                              <Button
                                leftIcon={<ImageSquare size={16} />}
                                onClick={handleFile}
                                fontFamily={"Sarabun"}
                                fontWeight={"light"}
                                fontSize={14}
                                boxShadow="base"
                              >
                                เพิ่มรูปภาพ
                              </Button>
                              <Spacer />
                              <Button
                                onClick={() => {
                                  handleSent();
                                  submitRef.current.disabled = true;
                                }}
                                disabled={
                                  (isEmptyOrSpaces(message) &&
                                    image.length == 0) ||
                                  Object.keys(selectedchara).length == 0
                                }
                                ref={submitRef}
                              >
                                Send
                              </Button>
                            </Flex>
                          </ModalBody>
                        </ModalContent>
                      </Modal> */}
                    </TabPanel>

                    {/* Gallery */}
                    <TabPanel>
                      {tabIndex == 1 && (
                        <Gallery gid={id} mychara={data.mychara} data={data} />
                      )}
                    </TabPanel>

                    {/* Member */}
                    <TabPanel>
                      {tabIndex == 2 && <Member data={data} gid={id} />}
                    </TabPanel>
                    {/* Settings */}
                    <TabPanel>
                      <SimpleGrid column={2} spacing={5}>
                        {tabIndex == 3 && <Setting data={data} gid={id} />}
                      </SimpleGrid>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  } else {
    return (
      <>
        <CustomNavbar />
        Loading
      </>
    );
  }
}
// console.log("test test")

export default dashboard;
