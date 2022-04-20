import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Center,
  Image,
  Input,
  Button,
  FormControl,
  Text,
} from "@chakra-ui/react";
import { Chats } from "phosphor-react";
import { useApp, useUser, useTab } from "../src/hook/local";
import {
  useCollection,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
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
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { Minus, X } from "phosphor-react";

// const userData = useUser()

export const Chatsidebar = ({ user, db, forcedopenTab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  useEffect(() => {
    console.log(tabState, forcedopenTab);
    if (
      forcedopenTab &&
      tabState &&
      !tabState.othertab.includes(forcedopenTab)
    ) {
      // console.log("inside")
      addTab(forcedopenTab);
      // changeTab(forcedopenTab)
    }
  }, [forcedopenTab]);

  useEffect(() => {
    if (user) {
      const QuerySnapshot = query(
        collection(db, "userDetail", user.uid, "chatMessage"),
        where("readed", "==", "unread"),
        orderBy("timestamp", "asc")
      );

      const unsubscribe = onSnapshot(QuerySnapshot, (snapshot) => {
        // let unreadtab = [];
        snapshot.docChanges().map((doc) => {
          if (doc.type == "added") {
            const id = doc.data().chatroom;
            addTab(id);
          }
        });
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <Flex
      position="fixed"
      right={3}
      bottom={0}
      alignItems="flex-end"
      flexDirection="column"
    >
      {tabState &&
        tabState.othertab.map((atab, k) => (
          <ChatIcon
            user={user}
            db={db}
            atab={atab}
            key={k}
            // setTab={addTab}
            // chatTab={tab}
          />
        ))}
    </Flex>
  );
};

const ChatIcon = ({ user, db, atab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  // const [chatTab, setChatTab] = useState([]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  // console.log(db, user);
  const QueryUnreadedSnapshot = query(
    collection(db, "userDetail", user.uid, "chatMessage"),
    where("readed", "==", false)
  );
  const [unreadedSnapshot] = useCollection(QueryUnreadedSnapshot);
  const unreadnum = unreadedSnapshot ? unreadedSnapshot.docs.length : 0;
  // const unreadnum = 0;
  const onIconClicked = () => {
    changeTab(atab);
    onToggle();
  };

  return (
    <Box>
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
        onClick={onIconClicked}
        marginBottom="3"
      >
        <Chats size={32} />
        {/* <Badge>{unreadnum}</Badge> */}
      </Center>
      {/* {unreadnum &&
        unreadnum.length >
          0&&(
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
          )} */}
      {isOpen && (
        <ChatBox
          atab={atab}
          user={user}
          onClose={onClose}
          // setTab={setTab}
          isOpen={isOpen}
          db={db}
          // chatTab={chatTab}
        />
      )}
    </Box>
  );
};

const ChatBox = ({ atab, user, onClose, isOpen, db }) => {
  const userData = useUser();
  const { tabState, addTab, removeTab, changeTab } = useTab();
  useEffect(() => {
    changeTab(atab);
  }, []);
  const [msg, setMsg] = useState("");
  // console.log(tabState)

  const [chatRoomData, loading, error] = useDocumentDataOnce(
    doc(db, "chatrooms", tabState.opentab)
  );
  const [name, setName] = useState("");
  const QuerySnapshot = query(
    collection(db, "chatrooms", tabState.opentab, "message"), orderBy("timeStamp")
  );
  const [snapshot, loadingsnapshot, errorsnapshot] =
    useCollection(QuerySnapshot);
  const remove = () => {
    // setTab([...chatTab.filter((v, i) => v != tab)]);
    removeTab(tabState.opentab);
    changeTab("");
    onClose();
  };
  useEffect(() => {
    // console.log(chatRoomData,loading)
    if (!loading && chatRoomData) {
      if (chatRoomData.type == "private") {
        const member = chatRoomData.member.filter((v, i) => v != user.uid)[0];
        const filteredname = userData.find(
          (v) => v.userId == member
        ).displayName;
        console.log(filteredname);
        setName(filteredname);

        // name = member[0];
      } else {
        setName(chatRoomData.name);
      }
    }
  }, [chatRoomData, loading]);

  // console.log(loading)

  const onChatSent = () =>{
    if (msg) {
      addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
        sender: user.displayName,
        senderId: user.uid,
        text: msg,
        timeStamp: serverTimestamp(),
      });
      setMsg("");
    }
  }

  if (loading) {
    return <></>;
  }
  // console.log(chatRoomData)
  return (
    <Box
      display={isOpen ? "flex" : "none"}
      background="gray"
      width={340}
      height={455}
      float="left"
      marginRight={5}
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* <Box width="100%"> */}
        <Box justifyContent="space-between" id="headerbox">
          <Image
            src={chatRoomData.thumbnail}
            w={25}
            h={25}
            rounded="full"
            float="left"
            marginLeft={5}
          />
          <Box float="left">{name}</Box>
          <Box float="left">
            <IconButton
              onClick={onClose}
              icon={<Minus size={24} weight="bold" />}
              float={"left"}
            />
            <IconButton
              onClick={remove}
              icon={<X size={24} weight="bold" />}
              float={"left"}
            />
          </Box>
        </Box>

        <Box overflowY="auto" id="msgbox" alignSelf={'stretch'} flexGrow='1'>
          {snapshot &&
            snapshot.docs.map((doc, k) => (
              <Flex
                flexDirection={
                  doc.data().senderId == user.uid ? "row-reverse" : "row"
                }
                key={k}
                alignSelf={"flex-end"}
                padding="5px"
                // maxH={500}
              >
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
                    </Box>
                  )}
                </Box>
              </Flex>
            ))}
        </Box>
      {/* </Box> */}
      <Box flexDir="row" justifyContent="space-between">
          <Input w="65%" marginLeft={5} value={msg} onChange={(e)=>setMsg(e.target.value)} />
          <Button float="right" marginRight={5} onClick={onChatSent}>
            send
          </Button>
      </Box>
    </Box>
  );
};
