import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  useDisclosure,
  Image,
  Input,
  Button,
} from "@chakra-ui/react";
import {
  useApp,
  useTab,
  useNotifications,
  useUser,
} from "../../src/hook/local";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
  runTransaction,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Minus, X } from "phosphor-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

import { ChatItem } from "./ChatItem";
import UseChatManager from "../../src/hook/ChatManager";

export const ChatBox = ({ atab, user }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { app, auth, db } = useApp();
  const [image, setImage] = useState(null);
  const store = getStorage(app);
  const getUser = useUser();
  const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
  const [msg, setMsg] = useState("");
  const unrededref = useRef(false);
  const [snapshot, setSnapshot] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatRoomDetail, setChatRoomDetail] = useState(undefined);
  const [previouschat, setPreviouschat] = useState("");
  const messagesEndRef = useRef(null)
  // const { remove, onChatSent } = UseChatManager(user, onOpen, onClose);

  useEffect(() => {
    const getChatRoomDetail = async () => {
      const chatroomdata = await getDoc(doc(db, "chatrooms", tabState.opentab));
      if (chatroomdata.exists) {
        const chatrommData = chatroomdata.data();
        console.log(chatrommData.member);
        console.log("getUser");
        const members = await getUser(chatrommData.member);
        if (chatrommData.type == "private") { 
          const opp = members.find((v) => v.uid != user.uid);
          setChatRoomDetail({
            name: opp.displayName,
            thumbnail: opp.photoURL,
            members: members,
          });
        } else {
          setChatRoomDetail({
            name: chatrommData.name,
            thumbnail: chatrommData.thumbnail,
            members: members,
          });
        }
        setLoading(false);
      }
    };
    if (tabState.opentab != "") {
      setLoading(true);
      getChatRoomDetail();
      onOpen();
      const QuerySnapshot = query(
        collection(db, "chatrooms", tabState.opentab, "message"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(QuerySnapshot, (snap) => {
        setSnapshot(snap);
      });
      setPreviouschat(tabState.opentab);
      
      return () => unsubscribe();
    }
  }, [tabState]);

  useEffect(()=>{
    if (!loading && chatRoomDetail && previouschat == tabState.opentab) {
      messagesEndRef.current?.scrollIntoView();
    }
  },[loading, chatRoomDetail, previouschat, tabState, snapshot])

  const remove = () => {
    // window.localStorage.removeItem("openTab");
    // setTab([...chatTab.filter((v, i) => v != tab)]);
    removeTab(tabState.opentab);
    // changeTab("");
    CloseTab();
    onClose();
  };

  const onChatSent = async () => {
    if (msg) {
      await updateDoc(doc(db, "chatrooms", tabState.opentab), {
        lastmsg: msg,
        senderId: user.uid,
        readedby: [user.uid],
        timestamp: serverTimestamp(),
      })
        .then()
        .catch((e) => console.log(e));
      await addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
        senderId: user.uid,
        text: msg,
        timestamp: serverTimestamp(),
      });
      setMsg("");
    }
    if (image) {
      const storeRef = ref(
        store,
        `chatrooms/${tabState.opentab}/${auth.currentUser.uid}${Date.now()}`
      );
      // console.log(storeRef.name);
      const snapshot = await uploadString(storeRef, image, "data_url");
      const url = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
        senderId: user.uid,
        image: url,
        timestamp: serverTimestamp(),
      });
      await updateDoc(doc(db, "chatrooms", tabState.opentab), {
        lastmsg: user.displayName + " ได้ส่งรูป",
        senderId: user.uid,
        readedby: [user.uid],
        timestamp: serverTimestamp(),
      });
      setImage(null);
    }
  };
  const handleFocus = async () => {
    // if (unrededref) {
    const userDocRef = doc(db, "chatrooms", tabState.opentab);
    // const groupDocRef = doc(db, "chatrooms", tabState.opentab, "message", tabState.opentab)
    try {
      await runTransaction(db, async (transaction) => {
        const data = await transaction.get(userDocRef);
        transaction.update(userDocRef, {
          readedby: arrayUnion(user.uid),
        });
      });
    } catch (e) {
      console.log("update fail ", e);
    }
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
  if (!loading && chatRoomDetail && previouschat == tabState.opentab) {
    return (
      <Box
        display={isOpen ? "flex" : "none"}
        background="white"
        borderColor={'black'}
        borderWidth={2}
        borderTopRadius={10}
        width={340}
        height={455}
        float="left"
        marginRight={5}
        flexDirection="column"
        justifyContent="space-between"
      >
        {/* <Box width="100%"> */}
        <Box bg={'gray.50'} justifyContent="space-between" borderTopRadius={10} id="headerbox">
          <Image
            src={chatRoomDetail.thumbnail}
            w={31}
            h={31}
            rounded="full"
            float="left"
            margin={1}
          />
          <Box float="left" marginLeft={2} marginTop={2}>{chatRoomDetail.name}</Box>
          <Box float="right">
            <IconButton
              size={'sm'}
              onClick={onClose}
              icon={<Minus size={10} weight="bold" />}
              float={"left"}
              m={1}
              mr={-0.5}
              rounded={'full'}
            />
            <IconButton
              rounded={'full'}
              m={1}
              size={'sm'}
              onClick={remove}
              icon={<X size={10} weight="bold" />}
              float={"left"}
            />
          </Box>
        </Box>

        <Box 
          overflowY="auto" 
          id="msgbox" 
          alignSelf={"stretch"} 
          flexGrow="1"
          css={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#727272",
              borderRadius: "24px",
            },
          }}
        >
          {snapshot &&
            chatRoomDetail &&
            Object.keys(chatRoomDetail).length > 0 &&
            snapshot.docs.map((doc, k) => (
              <ChatItem
                key={k}
                doc={doc}
                user={user}
                members={chatRoomDetail.members}
              />
            ))}
            <div ref={messagesEndRef}></div>
        </Box>

        {image && (
          <Box pos="relative">
            <Image src={image} w={150} h={150} />
            <IconButton
              icon={<X size={16} color="black" />}
              position="absolute"
              top={0}
              left={100}
              backgroundColor="transparent"
              _hover={{ backgroundColor: "transparent" }}
              onClick={() => setImage(null)}
            ></IconButton>
          </Box>
        )}

        <Box flexDir="row" justifyContent="space-between" p={1}> 
          <Input
            fontFamily={'Mitr'}
            w="70%"
            marginLeft={2}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onFocus={handleFocus}
            onPaste={handleImagePaste}
          />
          <Button
            float="right"
            marginRight={2}
            onClick={onChatSent}
            disabled={!(msg || image)}
          >
            send
          </Button>
        </Box>
      </Box>
    );
  }
  return <></>;
};
