import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  Box,
  Text,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Center,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { useApp, useUser } from "../../src/hook/local";
import { Replypost } from "./groupreply";
import { Heart, ChatCenteredText, DotsThreeVertical, X } from "phosphor-react";
import axios from "axios";
import { getpathfromUrl } from "../../src/services/filestoreageservice";
export const Commentpost = ({
  cdoc,
  commenters,
  setrpymsg,
  setImage,
  rpymsg,
  image,
  editMessage,
  setEditMessage,
  editReplyMessage,
  setEditReplyMessage,
  onCommentDelete,
}) => {
  let commentdoc = cdoc;
  const [message, setMessage] = useState("");
  const [lovecount, setLovecount] = useState(0);
  const { db, auth } = useApp();
  const [reply, setReply] = useState([]);
  const [loadlimit, setloadlimit] = useState(20);
  const getuser = useUser();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [editMode, setEditMode] = useState(false);
  // const [editMessage, setEditMessage] = useState(commentdoc.message);
  const inputFileRef = useRef(null);
  const [love, setLove] = useState(false);
  const commentinputref = useRef(null);

  useEffect(() => {
    if (cdoc.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    if (rpymsg) {
      onOpen();
      // commentinputref.current.focus();
      // console.log(commentinputref.current)
    }
    setMessage(cdoc.message);
    setLovecount(cdoc.love.length);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "group", cdoc.gid, "comments", cdoc.cid, "replies"),
        limit(loadlimit),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          const creators = snapshot.docs.map((doc) => doc.data().uid);
          // console.log(creators);
          let missing = [];
          let notmissing = [];
          creators.map((id) => {
            if (Object.keys(commenters).includes(id)) {
              notmissing = [...notmissing, id];
            } else {
              missing = [...missing, id];
            }
          });
          // console.log(missing, notmissing, commenters);
          if (missing.length > 0) {
            getuser(missing).then((found) => {
              let foundmissing = found;
              if (Object.keys(commenters).length > 0) {
                // console.log()
                const arrcommenters = Object.entries(commenters);
                const mappedcommenters = Object.fromEntries([
                  arrcommenters.filter(([k, v]) =>
                    Object.keys(commenters).includes(k)
                  ),
                ]);
                if (mappedcommenters) {
                  foundmissing = [
                    ...foundmissing,
                    ...Object.values(mappedcommenters),
                  ];
                }
              }
              // console.log(foundmissing);
              setReply(
                snapshot.docs.map((doc) => ({
                  ...doc.data(),
                  creator: foundmissing[doc.data().uid],
                  cid: cdoc.cid,
                  rid: doc.id,
                  gid: cdoc.gid,
                }))
              );
            });
          } else {
            if (Object.keys(commenters).length > 0) {
              const arrcommenters = Object.entries(commenters);
              // console.log(arrcommenters);
              const mappedcommenters = Object.fromEntries(
                arrcommenters.filter(([k, v]) =>
                  Object.keys(commenters).includes(k)
                )
              );
              // console.log(mappedcommenters);
              setReply(
                snapshot.docs.map((doc) => ({
                  ...doc.data(),
                  creator: mappedcommenters[doc.data().uid],
                  cid: cdoc.cid,
                  rid: doc.id,
                  gid: cdoc.gid,
                }))
              );
            }
          }
        }
      },
      (e) => {
        console.log(e);
      }
    );

    return () => {
      unsubscribe();
      setLove(false);
      onClose();
      setLovecount(0);
      setMessage("");
    };
  }, [cdoc, loadlimit]);

  useEffect(()=>{
    setEditMessage(cdoc.message)
  },[editMode])

  useEffect(() => {
    // console.log(isOpen, rpymsg);
    if (isOpen && rpymsg && rpymsg !== "") {
      const end = rpymsg.length;
      commentinputref.current.setSelectionRange(end, end);
      commentinputref.current.focus();
    }
  }, [isOpen, rpymsg]);

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/unlove`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLovecount(lovecount-1)
        setLove(false);
      }
    } else {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/love`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (res.status === 200) {
        setLovecount(lovecount+1)
        setLove(true);
      }
    }
  };
  const handleMessage = async () => {
    const token = await auth.currentUser.getIdToken();
    let imageURL = "";
    if (image) {
      imageURL = await UploadGroupCommentImage(
        image,
        auth.currentUser.uid,
        cdoc.gid
      );
    }
    axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/reply/create`,
      {
        message: rpymsg,
        imageURL: imageURL,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setrpymsg("");
    setImage(null);
  };

  const handleUploadFile = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const handleFile = () => {
    inputFileRef.current.click();
  };
  const handleImagePaste = (e) => {
    if (e.clipboardData.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.clipboardData.files[0]);
    }
  };

  const resizeTextArea = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (commentdoc.imageURL) {
      const path = getpathfromUrl(commentdoc.imageURL);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/delete`,
        {
          bucket: path.bucket,
          filepath: path.fullPath,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    setrpymsg("");
    setImage(null);
    // console.log(getpathfromUrl(commentdoc.imageURL))
    onCommentDelete();
  };

  const handleEdit = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/group/${cdoc.gid}/comment/${cdoc.cid}/update`,
      {
        message: editMessage,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
      if (res.status === 200) {
        setMessage(editMessage);
        setEditMode(false);
      } else {
        alert(res.data);
      }
    
    // setMessage(editMessage);
    // console.log(getpathfromUrl(commentdoc.imageURL))
  };

  return (
    <Flex
      p={2.5}
      fontFamily={"Mitr"}
      width="100%"
      backgroundColor="#FFFFFF"
      boxShadow="0 0 2px #000000"
      borderRadius={10}
      marginTop="10px"
    >
      <Center flexGrow={1} w={75} h={70} mr={2.5}>
        <Avatar
          w={70}
          h={70}
          src={commentdoc.creator?.photoURL}
          rounded={"full"}
        />
      </Center>

      <Flex flexDir="column" flexGrow={10}>
        <Flex justifyContent="space-between">
          <Text fontSize={20}>
            {commentdoc.creator?.displayName
              ? commentdoc.creator?.displayName
              : "placeholder"}
            {"  " + cdoc.cid}
          </Text>

          <Text fontSize={10} mt={3} color={"GrayText"}>
            {commentdoc.timestamp
              ? parseDate(commentdoc.timestamp)
              : "01/01/1970:00.00"}
          </Text>
        </Flex>

        <Divider />
        {editMode ? (
          // <InputGroup>
          <Textarea
            resize="none"
            minHeight={11}
            onKeyDown={(e) => {
              if (e.key == "Enter" && !e.shiftKey) {
                handleEdit();
              } else if (e.key == "Escape") {
                // if (image != checkImage.current) {
                //   setImage(checkImage.current);
                // }
                setEditMode(false);
              }
            }}
            value={editMessage}
            onChange={(e) => setEditMessage(e.target.value)}
            width="100%"
            placeholder="Write Something"
            height="45px"
            backgroundColor="gray.100"
            mb={2.5}
          />
        ) : (
          //  <InputRightElement>
          //   <IconButton
          //     paddingTop={1}
          //     h={15}
          //     w={11}
          //     borderRadius={100}
          //     onClick={handleFile}
          //     icon={<ImageSquare size={32} weight="bold" />}
          //   />
          // </InputRightElement>
          // </InputGroup>
          <Box fontSize={14} minW={"625"} w={"auto"} maxW={600}>
            <Text whiteSpace="pre-line">
              {message ? message : ""}
            </Text>
          </Box>
        )}
        {/* <Input
          type="file"
          id="file"
          ref={inputFileRef}
          display="none"
          onChange={(e) => handleUploadFile(e)}
        /> */}

        {commentdoc.imageURL ? (
          <>
            <Box pos={"relative"}>
              <Image
                objectFit="cover"
                src={commentdoc.imageURL ? commentdoc.imageURL : ""}
                width="250px"
                height="250px"
                onClick={() => setModalOpen(true)}
              />

              {/* Edit รูป */}

              {/* {editMode ? (
                <IconButton
                  icon={<X size={16} color="black" />}
                  position="absolute"
                  top={0}
                  left={200}
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  onClick={() => setImage(null)}
                ></IconButton>
              ) : (
                <></>
              )} */}
            </Box>
            {/* <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              size="md"
            >
              <ModalOverlay
                bg="blackAlpha.300"
                backdropFilter="blur(10px) hue-rotate(90deg)"
              />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <Image src={image} />
                </ModalBody>
              </ModalContent>
            </Modal> */}
          </>
        ) : (
          <></>
        )}

        <Box>
          <Button
            mt={2}
            mr={2}
            p={2}
            w={"auto"}
            onClick={HandleLove}
            // backgroundColor={cdoc.data().love.includes(auth.currentUser.uid)? "red.400" : "white"}
            _hover={{
              backgroundColor: "gray.100",
            }}
          >
            <Box p={1}>
              <Heart
                size={16}
                color={"red"}
                weight={love ? "fill" : "regular"}
              />
            </Box>

            <Box p={1}>{lovecount}</Box>
          </Button>

          <Button mt={2} mr={2} onClick={onToggle}>
            <Box p={1}>
              <ChatCenteredText size={16} color="#000000" />
            </Box>

            <Box p={1}>{cdoc.replycount}</Box>
          </Button>
        </Box>
        {isOpen && (
          <>
            {cdoc.replycount > loadlimit && (
              <Text
                decoration="underline"
                onClick={() => setloadlimit(loadlimit + 20)}
              >
                Load more
              </Text>
            )}
            {/* {console.log(reply.reverse())} */}
            {isOpen &&
              reply
                .map((rdoc) => (
                  <Replypost
                    replydoc={rdoc}
                    message={editReplyMessage[rdoc.rid]}
                    setMessage={(msg) => setEditReplyMessage(rdoc.rid, msg)}
                  />
                ))
                .reverse()}
            <Textarea
              resize="none"
              minHeight={11}
              onKeyDown={(e) => {
                if (e.key == "Enter" && !e.shiftKey) {
                  handleMessage();
                }
                resizeTextArea(e);
              }}
              value={rpymsg}
              onChange={(e) => setrpymsg(e.target.value)}
              // onChange={(e) => console.log(e.target.)}
              width="100%"
              placeholder="Write Something"
              height="45px"
              backgroundColor="gray.100"
              onPaste={handleImagePaste}
              ref={commentinputref}
            />
            {image && (
              <Box pos={"relative"}>
                <Image
                  src={image}
                  width="250px"
                  height="250px"
                  objectFit="cover"
                />
                <IconButton
                  icon={<X size={16} color="black" />}
                  position="absolute"
                  top={0}
                  left={200}
                  backgroundColor="transparent"
                  _hover={{ backgroundColor: "transparent" }}
                  onClick={() => setImage(null)}
                ></IconButton>
              </Box>
            )}
          </>
        )}
      </Flex>
      <Menu>
        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
          <DotsThreeVertical size={30} />
        </MenuButton>
        <MenuList>
          {auth.currentUser.uid == commentdoc.creator.uid ? (
            <>
              <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </>
          ) : (
            <MenuItem>Report</MenuItem>
          )}
        </MenuList>
      </Menu>
      <Input
        type="file"
        id="file"
        ref={inputFileRef}
        display="none"
        onChange={(e) => handleUploadFile(e)}
      />
    </Flex>
  );
};

const parseDate = (seconds) => {
  const date = new Date(seconds._seconds * 1000);
  // const date = seconds.toDate();
  const formatted = date.toLocaleDateString("th-TH", {
    day: "numeric",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const spdate = formatted.split(" ");
  const formatted2 = `${spdate[0]} [${spdate[1]}]`;
  return formatted2;
};
