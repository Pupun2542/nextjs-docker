import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../src/hook/local";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollection,
  useCollectionOnce,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  deleteField,
  doc,
  increment,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  Box,
  Text,
  Image,
  Input,
  Flex,
  Divider,
  useDisclosure,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  VStack,
} from "@chakra-ui/react";
import {
  Heart,
  DotsThreeVertical,
  ChatCenteredText,
  ImageSquare,
  X,
} from "phosphor-react";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const Comments = ({ id }) => {
  const { app, auth, db } = useApp();
  const store = getStorage(app);
  const q = query(
    collection(db, "group", id, "comments"),
    orderBy("timestamp", "desc")
  );
  const [snapshot, loading, error] = useCollection(q);
  // const [replyState, setReplyState] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const inputFileRef = useRef(null);

  const handleMessage = () => {
    if (image) {
      const storeRef = ref(
        store,
        `group/${id}/comments/${auth.currentUser.uid}${Date.now()}`
      );
      console.log(storeRef.name);
      uploadString(storeRef, image, "data_url").then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collection(db, "group", id, "comments"), {
            thumbnail: auth.currentUser.photoURL,
            displayName: auth.currentUser.displayName,
            userId: auth.currentUser.uid,
            message: message,
            timestamp: serverTimestamp(),
            love: [],
            imageURL: url,
            imageRef: storeRef.fullPath,
          });
        });
      });
    } else {
      addDoc(collection(db, "group", id, "comments"), {
        thumbnail: auth.currentUser.photoURL,
        displayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        message: message,
        timestamp: serverTimestamp(),
        love: [],
      });
    }
    setMessage("");
    setImage(null);
    // console.log(image);
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

  if (snapshot) {
    //   console.log(snapshot.size)
    return (
      <Box
        marginLeft="100px"
        marginRight="100px"
        marginTop="20px"
        marginBottom="50px"
        fontFamily={"Mitr"}
      >
        <Text fontSize={32} fontWeight={"bold"}>
          ความคิดเห็น - [number]
        </Text>
        <Box>
          <InputGroup>
            <Input
              onKeyDown={(e) => {
                // console.log(e.key)
                if (e.key == "Enter" && !e.shiftKey) {
                  // console.log('message sent')
                  handleMessage();
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              width="100%"
              placeholder="Write Something"
              height="45px"
              backgroundColor="gray.100"
            />
            <InputRightElement>
              <IconButton
                paddingTop={1}
                h={15}
                w={11}
                borderRadius={100}
                onClick={handleFile}
                icon={<ImageSquare size={32} weight="bold" />}
              />
            </InputRightElement>
          </InputGroup>
          <Input
            type="file"
            id="file"
            ref={inputFileRef}
            display="none"
            onChange={(e) => handleUploadFile(e)}
          />
          {image ? (
            <Box pos={"relative"}>
              <Image src={image} width="250px" height="250px" />
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
          ) : (
            <></>
          )}
        </Box>

        {snapshot.docs.map((doc, k) => (
          <Commentpost cdoc={doc} id={id} key={k} />
        ))}
      </Box>
    );
  }
  if (loading) {
    <Box
      marginLeft="100px"
      marginRight="100px"
      marginTop="30px"
      marginBottom="50px"
    >
      <Text fontSize={32} fontWeight={"bold"}>
        ความคิดเห็น - [number]
      </Text>
      <Box>
        <Input
          onKeyDown={(e) => {
            // console.log(e.key)
            if (e.key == "Enter" && !e.shiftKey) {
              // console.log('message sent')
              handleMessage();
            }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          width="100%"
          placeholder="Write Something"
          height="45px"
          backgroundColor="gray.100"
          mb={2.5}
        />
      </Box>
      Loading
    </Box>;
  }
  return (
    <Box
      marginLeft="100px"
      marginRight="100px"
      marginTop="30px"
      marginBottom="50px"
    >
      <Text fontSize={32} fontWeight={"bold"}>
        Comment Section
      </Text>
      <Box>
        <Input
          onKeyDown={(e) => {
            // console.log(e.key)
            if (e.key == "Enter" && !e.shiftKey) {
              // console.log('message sent')
              handleMessage();
            }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          width="100%"
          placeholder="Write Something"
          height="45px"
          backgroundColor="gray.100"
          mb={2.5}
        />
      </Box>
    </Box>
  );
};

const Commentpost = ({ cdoc, id }) => {
  const { app, auth, db } = useApp();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [reply, setReply] = useState(0);
  const [message, setMessage] = useState(cdoc.data().message);
  const checkMessage = useRef("");
  const [image, setImage] = useState(null);
  const store = getStorage(app);
  // const inputFileRef = useRef(null);
  const checkImage = useRef("");
  const [coll] = useCollectionOnce(
    collection(db, "group", id, "comments", cdoc.id, "reply")
  );
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (coll && !coll.empty) {
      setReply(coll.size);
    }
  }, [coll]);

  document.onkeydown = (e) => {
    if (e.key == "Escape" && editMode) {
      setEditMode(false);
    }
  };

  useEffect(() => {
    if (cdoc.data().imageURL) {
      // checkImage.current = cdoc.data().imageURL;
      setImage(cdoc.data().imageURL);
    }
    checkMessage.current = cdoc.data().message;
  }, [cdoc]);

  const HandleLove = () => {
    if (cdoc.data().love.includes(auth.currentUser.uid)) {
      updateDoc(doc(db, "group", id, "comments", cdoc.id), {
        love: arrayRemove(auth.currentUser.uid),
      });
    } else {
      updateDoc(doc(db, "group", id, "comments", cdoc.id), {
        love: arrayUnion(auth.currentUser.uid),
      });
    }
  };

  const handleEdit = () => {
    // if (image != checkImage.current) {
    // console.log(image, checkImage.current);
    // if (image) {
    //   const storeRef = ref(store, cdoc.data().imageRef);
    //   uploadString(storeRef, image, "data_url").then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       updateDoc(doc(db, "group", id, "comments", cdoc.id), {
    //         message: message,
    //       });
    //     });
    //   });
    // } else {
    //   deleteObject(ref(store, cdoc.data().imageRef)).then(() => {
    //     updateDoc(doc(db, "group", id, "comments", cdoc.id), {
    //       imageURL: deleteField(),
    //       imageRef: deleteField(),
    //       message: message,
    //     });
    //   });
    // }
    // } else if (message != checkMessage) {
    updateDoc(doc(db, "group", id, "comments", cdoc.id), {
      message: message,
    });
    // }
    setEditMode(false);
  };

  const handleDelete = () => {
    if (confirm("ยืนยันการลบข้อความ")) {
      if (cdoc.data().imageRef) {
        deleteObject(ref(store, cdoc.data().imageRef)).then();
      }
      deleteDoc(doc(db, "group", id, "comments", cdoc.id)).then();
      setImage(null);
      setMessage("");
      setReply(0);
    }
  };

  // const handleFile = () => {
  //   inputFileRef.current.click();
  // };

  // const handleUploadFile = (e) => {
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

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
      <Box flexGrow={1} w={110} pl={2.5} pr={2.5}>
        <Image src={cdoc.data().thumbnail} rounded={"full"} />
      </Box>

      <Flex flexDir="column" flexGrow={10}>
        <Flex justifyContent="space-between">
          <Text fontSize={20}>
            {cdoc.data().displayName ? cdoc.data().displayName : "placeholder"}
          </Text>

          <Text fontSize={10} mt={3} color={"GrayText"}>
            {cdoc.data().timestamp
              ? parseDate(cdoc.data().timestamp)
              : "01/01/1970:00.00"}
          </Text>
        </Flex>

        <Divider />
        {editMode ? (
          // <InputGroup>
          <Input
            onKeyDown={(e) => {
              // console.log(e.key)
              if (e.key == "Enter" && !e.shiftKey) {
                // console.log('message sent')
                handleEdit();
              } else if (e.key == "Escape") {
                if (image != checkImage.current) {
                  setImage(checkImage.current);
                }
                setEditMode(false);
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
          <Box fontSize={14} minW={"600"} w={"auto"} maxW={600}>
            <Text>{cdoc.data().message ? cdoc.data().message : ""}</Text>
          </Box>
        )}
        {/* <Input
          type="file"
          id="file"
          ref={inputFileRef}
          display="none"
          onChange={(e) => handleUploadFile(e)}
        /> */}

        {image ? (
          <>
            <Box pos={"relative"}>
              <Image src={image ? image : ""} width="250px" height="250px" />

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
          </>
        ) : (
          <></>
        )}

        <Box>
          <Button
            m={2}
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
                weight={
                  cdoc.data().love.includes(auth.currentUser.uid)
                    ? "fill"
                    : "regular"
                }
              />
            </Box>

            <Box p={1}>{cdoc.data().love ? cdoc.data().love.length : "0"}</Box>
          </Button>

          <Button onClick={onToggle}>
            <Box p={1}>
              <ChatCenteredText size={16} color="#000000" />
            </Box>

            <Box p={1}>{reply}</Box>
          </Button>
        </Box>
        {isOpen && <Reply id={id} commentId={cdoc.id} setReply={setReply} />}
      </Flex>
      <Menu>
        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
          <DotsThreeVertical size={30} />
        </MenuButton>
        <MenuList>
          {auth.currentUser.uid == cdoc.data().userId ? (
            <>
              <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </>
          ) : (
            <MenuItem>Report</MenuItem>
          )}
        </MenuList>
      </Menu>
      {/* <IconButton
        m={2.5}
        h={10}
        w={10}
        borderRadius={100}
        icon={<DotsThreeVertical size={30} />}
      /> */}
    </Flex>
  );
};

const Reply = ({ id, setReply, commentId }) => {
  const { app, auth, db } = useApp();
  const [snapshot, loading, error] = useCollection(
    query(
      collection(db, "group", id, "comments", commentId, "reply"),
      orderBy("timestamp", "asc")
    )
  );
  useEffect(() => {
    if (!loading && !snapshot.empty) {
      setReply(snapshot.size);
    }
  }, [loading, snapshot]);

  const [message, setMessage] = useState("");

  const handleMessage = () => {
    //   console.log(messageref.current)
    addDoc(collection(db, "group", id, "comments", commentId, "reply"), {
      thumbnail: auth.currentUser.photoURL,
      displayName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      message: message,
      timestamp: serverTimestamp(),
      love: [],
    });
    setMessage("");
  };

  if (snapshot) {
    return (
      <Box>
        {snapshot.docs.map((doc, k) => (
          <>
            <ReplyPost cdoc={doc} commentId={commentId} id={id} key={k} />
          </>
        ))}
        <Box>
          <Input
            onKeyDown={(e) => {
              // console.log(e.key)
              if (e.key == "Enter" && !e.shiftKey) {
                // console.log('message sent')
                handleMessage();
              }
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            width="100%"
            placeholder="Write Something"
            height="45px"
            backgroundColor="gray.100"
            mt={1.5}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box>
      <Input
        onKeyDown={(e) => {
          // console.log(e.key)
          if (e.key == "Enter" && !e.shiftKey) {
            // console.log('message sent')
            handleMessage();
          }
        }}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        width="100%"
        placeholder="Write Something"
        height="45px"
        backgroundColor="gray.100"
      />
    </Box>
  );
};

const ReplyPost = ({ cdoc, commentId, id }) => {
  const { app, auth, db } = useApp();
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState(cdoc.data().message);
  const checkMessage = useRef("");

  useEffect(() => {
    if (cdoc.data().imageURL) {
      // checkImage.current = cdoc.data().imageURL;
      setImage(cdoc.data().imageURL);
    }
    checkMessage.current = cdoc.data().message;
  }, [cdoc]);

  document.onkeydown = (e) => {
    if (e.key == "Escape" && editMode) {
      setEditMode(false);
    }
  };

  const handleEdit = () => {
    // if (image != checkImage.current) {
    // console.log(image, checkImage.current);
    // if (image) {
    //   const storeRef = ref(store, cdoc.data().imageRef);
    //   uploadString(storeRef, image, "data_url").then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       updateDoc(doc(db, "group", id, "comments", cdoc.id), {
    //         message: message,
    //       });
    //     });
    //   });
    // } else {
    //   deleteObject(ref(store, cdoc.data().imageRef)).then(() => {
    //     updateDoc(doc(db, "group", id, "comments", cdoc.id), {
    //       imageURL: deleteField(),
    //       imageRef: deleteField(),
    //       message: message,
    //     });
    //   });
    // }
    // } else if (message != checkMessage) {
    updateDoc(doc(db, "group", id, "comments", commentId, "reply", cdoc.id), {
      message: message,
    });
    // }
    setEditMode(false);
  };

  const handleDelete = () => {
    if (confirm("ยืนยันการลบข้อความ")) {
      // if (cdoc.data().imageRef) {
      //   deleteObject(ref(store, cdoc.data().imageRef)).then();
      // }
      deleteDoc(
        doc(db, "group", id, "comments", commentId, "reply", cdoc.id)
      ).then();
      // setImage(null);
      setMessage("");
    }
  };

  const HandleLove = () => {
    if (cdoc.data().love.includes(auth.currentUser.uid)) {
      updateDoc(doc(db, "group", id, "comments", commentId, "reply", cdoc.id), {
        love: arrayRemove(auth.currentUser.uid),
      });
    } else {
      updateDoc(doc(db, "group", id, "comments", commentId, "reply", cdoc.id), {
        love: arrayUnion(auth.currentUser.uid),
      });
    }
  };

  return (

    <Flex>
      <VStack spacing={0} mt={5} mr={5} >
        <Box w={'22px'} height={'50'} borderLeftWidth={3} ></Box>
        <Box
          borderBottomLeftRadius={10}
          borderBottomStyle={'solid'}
          borderBottomWidth={3}
          borderLeftWidth={3}
          height={'45px'}
          w={'22px'}
          borderLeftStyle={'solid'}
        ></Box>
      </VStack>

      <Flex
        width="100%"
        borderRadius={10}
        boxShadow="0 0 2px #000000"
        marginTop="10px"
      >

        <Box flexGrow={1} w={110}>
          <Image m={2.5} rounded={"full"} src={cdoc.data().thumbnail} />
        </Box>

        <Flex flexDir="column" w={440} flexGrow={10} p={2.5}>
          <Flex justifyContent="space-between">
            <Text fontSize={20}>
              {cdoc.data().displayName ? cdoc.data().displayName : "placeholder"}
            </Text>
            <Text fontSize={10} mt={3} color={"GrayText"}>
              {cdoc.data().timestamp
                ? parseDate(cdoc.data().timestamp)
                : "01/01/1970:00.00"}
              {/* {console.log(doc.data().timestamp)} */}
              {/* 01/01/1970:00.00 */}
            </Text>
          </Flex>

          <Divider />
          {editMode ? (
            // <InputGroup>
            <Input
              onKeyDown={(e) => {
                // console.log(e.key)
                if (e.key == "Enter" && !e.shiftKey) {
                  // console.log('message sent')
                  handleEdit();
                } else if (e.key == "Escape") {
                  setEditMode(false);
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            <Box m={1} minW={440} w={"100%"} maxW={440} fontSize={14}>
              <Text>{cdoc.data().message ? cdoc.data().message : ""}</Text>
            </Box>
          )}

          <Box>
            <Button onClick={HandleLove}>
              <Box p={1}>
                <Heart
                  size={16}
                  color={"red"}
                  weight={
                    cdoc.data().love.includes(auth.currentUser.uid)
                      ? "fill"
                      : "regular"
                  }
                />
              </Box>

              <Box p={1}>{cdoc.data().love ? cdoc.data().love.length : "0"}</Box>
            </Button>
          </Box>
        </Flex>

        <Menu>
          <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
            <DotsThreeVertical size={30} />
          </MenuButton>
          <MenuList>
            {auth.currentUser.uid == cdoc.data().userId ? (
              <>
                <MenuItem onClick={() => setEditMode(true)}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </>
            ) : (
              <MenuItem>Report</MenuItem>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </Flex>


  );
};

const parseDate = (seconds) => {
  // const date = new Date()
  // date.setMilliseconds(seconds)
  const date = seconds.toDate();
  // const formatted = `${date.getDate()}/${date.getMonth()+1}/${date.getYear()} [${date.getHours()}:${date.getMinutes()}]`;
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
