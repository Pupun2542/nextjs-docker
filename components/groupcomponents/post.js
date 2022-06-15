import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Center,
  Flex,
  HStack,
  Tag,
  Divider,
  Image,
  Button,
  Spacer,
  IconButton,
  Input,
  Textarea,
  useDisclosure,
  Avatar,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  Heart,
  ChatCenteredText,
  Eye,
  DotsThreeVertical,
  ImageSquare,
  X,
  PaperPlaneRight,
} from "phosphor-react";
import { GroupComment } from "./comment";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useApp, useUser } from "../../src/hook/local";
import axios from "axios";
import { getpathfromUrl, UploadGroupCommentImage, getpMutiPathfromUrl } from "../../src/services/filestoreageservice";

export const GroupPost = ({
  post,
  member,
  openReply,
  setOpenReply,
  setEditComment,
  onGoingComment,
  setOnGoingComment,
  onPostDelete,
}) => {
  const creator = Object.values(post.creator)[0];
  const getUser = useUser();
  // console.log();
  const { auth, db } = useApp();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [comment, setComment] = useState([]);
  const [fetchlimit, setFetchlimit] = useState(20);
  const [message, setMessage] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [love, setLove] = useState(false);
  const [lovecount, setLovecount] = useState(0);
  const inputFileRef = useRef(null);
  const [editMessage, setEditMessage] = useState("");
  const [editMode ,setEditMode] = useState(false);

  useEffect(()=>{
    setEditMessage(post.message)
  },[editMode])

  useEffect(() => {
    if (post.love.includes(auth.currentUser.uid)) {
      setLove(true);
    }
    setText(post.message);
    // setMessage(cdoc.message);
    setLovecount(post.love.length);
    const unsubscribe = onSnapshot(
      query(
        collection(db, "group", post.gid, "posts", post.pid, "comments"),
        orderBy("timestamp", "desc"),
        limit(fetchlimit)
      ),
      (snapshot) => {
        if (!snapshot.empty) {
          let mappedcommentData = [];
          Promise.all(
            snapshot.docs.map(async (doc) => {
              let creator = {};
              // console.log(member, doc.data().uid)
              if (member[doc.data().uid]) {
                creator = member[doc.data().uid];
              } else {
                const usr = await getUser([doc.data().uid]);
                creator = usr[0];
              }
              mappedcommentData = [
                ...mappedcommentData,
                {
                  ...doc.data(),
                  creator: creator,
                  cid: doc.id,
                  pid: post.pid,
                  gid: post.gid,
                },
              ];
            })
          ).then(() => {
            setComment(mappedcommentData);
          });
        }
      }
    );
    return () => {
      unsubscribe();
      onClose();
      setComment([])
      setLove(false);
      setLovecount(0);
      setText("");
    };
  }, [post]);

  const resizeTextArea = (e) => {
    if(!isEmptyOrSpaces(message)) {
      e.target.style.height = "inherit";
      e.target.style.height = `${e.target.scrollHeight}px`;
    } else {
      e.target.style.height = "inherit";
      e.target.style.height = `42px`;
    }
    // In case you have a limitation
    // e.target.style.height = `${Math.min(e.target.scrollHeight, limit)}px`;
  };
  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }
  const handleSent = async () => {
    if (!isEmptyOrSpaces(message) || image) {
      let dlurl = "";
      if (image) {
        dlurl = await UploadGroupCommentImage(image, auth.currentUser.uid, post.gid);
        // console.log(dlurl);

      }
      const token = await auth.currentUser.getIdToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/comment/create`,
        { message: message, imageUrl: dlurl, charaId: "" },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessage("");
      setImage("");
    }
  };

  const HandleLove = async () => {
    const token = await auth.currentUser.getIdToken();
    if (love) {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/unlove`,
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
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/love`,
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

  const handleEdit = async () => {
    const token = await auth.currentUser.getIdToken();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/update`,
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
        setText(editMessage);
        setEditMode(false);
      } else {
        alert(res.data);
      }
  
  };

  const handleDelete = async () => {
    const token = await auth.currentUser.getIdToken();
    if (post.imageUrl.length > 0) {
      
      const path = getpMutiPathfromUrl(post.imageUrl);
      const bucket = path[0].bucket;
      const fullpath = path.map((pat)=>(pat.fullpath));
      console.log(fullpath);
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/delete`,
        {
          bucket: bucket,
          filepath: fullpath,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } else {
      axios.post(
        `${process.env.NEXT_PUBLIC_USE_API_URL}/post/${post.gid}/${post.pid}/delete`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    }
    setMessage("");
    setImage(null);
    onPostDelete();
    setComment([]);
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


  if (post) {
    return (
      <Flex mt={3} p={2} boxShadow={"base"} bg={"white"} borderRadius={10}>
        <Box w={"6%"}>
          <Avatar
            mr={2}
            rounded={"100%"}
            h={42}
            w={42}
            src={creator.photoURL}
            name={creator.displayName}
          />
        </Box>
        <Box pl={2} pr={2} w={"90%"}>
          <HStack spacing={4}>
            <Box>{creator.displayName}</Box>

            {/* <Tag variant="solid" colorScheme="gray">
              Day 1
            </Tag>
  
            <Tag variant="solid" colorScheme="gray">
              Cut scene
            </Tag> */}
          </HStack>

          <HStack spacing={4} fontSize={14} color={"GrayText"}>
            <Box>{creator.displayName}</Box>
            <Box>
              {post.timestamp ? parseDate(post.timestamp) : "01/01/1970:00.00"}
            </Box>
          </HStack>

          <Divider mb={2} />

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
              {text ? text : ""}
            </Text>
          </Box>
        )}

          <Center mt={3} w={"100%"} borderRadius={10} boxShadow={"base"}>
            <Box display={"flex"} overflowX="auto" overflowY="hidden" whiteSpace="nowrap" alignContent={"center"}>
              {post.imageUrl &&
                post.imageUrl.map((img, k) => (
                  <Image
                    key={k}
                    size={300}
                    color="#100e0e"
                    weight="light"
                    src={img}
                    objectFit={"contain"}
                    display={"inline-block"}
                  />
                ))}
            </Box>
          </Center>

          <HStack spacing={4} fontSize={14} color={"GrayText"} pt={2}>
            <Button
              leftIcon={<Heart 
                weight={love ? "fill" : "regular"}
              />}
              color={love ? "red" : "black"}
              width={"40%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
              onClick={HandleLove}
              
            >
              {lovecount}
            </Button>
            <Button
              leftIcon={<ChatCenteredText />}
              color="black"
              width={"100%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
              onClick={onToggle}
            >
              {(post.comment > comment.length? post.comment : comment.length)}
            </Button>
            <Button
              leftIcon={<Eye />}
              color="black"
              width={"40%"}
              fontSize={16}
              fontWeight={"light"}
              boxShadow={"base"}
              variant="solid"
            >
              {post.view}
            </Button>
          </HStack>
          {isOpen &&
            comment &&
            comment
              .map((cmt, i) => (
                <GroupComment
                  comment={cmt}
                  key={i}
                  member={member}
                  openReply={openReply[cmt.cid]}
                  setOpenReply={(state) => setOpenReply(state, cmt.cid)}
                  onGoingReply={onGoingComment[cmt.cid]}
                  setOnGoingReply={(value)=>setOnGoingComment(value, cmt.cid)}
                  editComment={value}
                  setEditComment={(state)=>setEditComment(state, cmt.cid)}
                />
              ))
              .reverse()}
          <Flex mt={2}>
            <Box w={"8%"} mr={1}>
              <Avatar
                mr={2}
                rounded={"100%"}
                h={42}
                w={42}
                src={auth.currentUser.photoURL}
                name={auth.currentUser.displayName}
              />
            </Box>
            <Textarea
              resize="none"
              minHeight={11}
              width="100%"
              placeholder="Write Something"
              height="42px"
              backgroundColor="gray.100"
              value={message}
              onKeyDown={(e) => {
                resizeTextArea(e);
                // if (e.key == "Enter" && !e.shiftKey) {
                //   // console.log('message sent')
                //   handleSent();
                // }
              }}
              onChange={(e) => setMessage(e.target.value)}
              onPaste={handleImagePaste}
            />
            <Box pl={2} whiteSpace="nowrap">
              <IconButton rounded={"full"} icon={<ImageSquare size={28} />} mr={2} onClick={handleFile} />
              <IconButton rounded={"full"} icon={<PaperPlaneRight size={28} />} onClick={handleSent} />
            </Box>
          </Flex>
          {image&&(
          <Box pos={"relative"}>
            <Image
              src={image}
              width="250px"
              height="250px"
              onClick={() => setModalOpen(true)}
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
        </Box>
        <Menu>
        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
          <DotsThreeVertical size={30} />
        </MenuButton>
        <MenuList>
          {auth.currentUser.uid == post.uid ? (
            <>
            {console.log(post)}
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
  } else {
    return <>ยังไม่มีโพสต์ใหม่</>;
  }
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
  // console.log(formatted2)
  return formatted2;
  // console.log(seconds.toDate());
};
