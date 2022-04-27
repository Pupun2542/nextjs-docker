import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
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
  Badge,
} from "@chakra-ui/react";
import { Chats } from "phosphor-react";
import { useApp, useUser, useTab, useNotifications } from "../src/hook/local";
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
  serverTimestamp,
  writeBatch,
  limit,
  runTransaction,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Minus, X } from "phosphor-react";

// const userData = useUser()

export const Chatsidebar = ({ user, db, forcedopenTab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  useEffect(() => {
    // console.log(tabState, forcedopenTab);
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

  // console.log(tabState.opentab.length);
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
  // console.log("tabState.othertab ", tabState.othertab);
  return (
    <Box position="fixed" right={3} bottom={0} alignItems="flex-end">
      <Flex flexDirection="column" float="right">
        {tabState &&
          tabState.othertab.length > 0 &&
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
      {/* {isOpen && ( */}
      <ChatBox
        // atab={atab}
        user={user}
        onClose={onClose}
        // setTab={setTab}
        isOpen={isOpen}
        db={db}
        // chatTab={chatTab}
      />
      {/* )} */}
    </Box>
  );
};

const ChatIcon = ({ user, db, atab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  // const [chatTab, setChatTab] = useState([]);
  // const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  // console.log(db, user);
  // const QueryUnreadedSnapshot = query(
  //   collection(db, "userDetail", user.uid, "chatMessage"),
  //   where("readed", "==", false)
  // );
  // const [unreadedSnapshot] = useCollection(QueryUnreadedSnapshot);
  // console.log("Icon" + );

  const { notidata, chatNotiData } = useNotifications();
  const [unreadnum, setUnreadnum] = useState(0);
  // const unreadnum = 0;
  useEffect(() => {
    const unreadedchat = chatNotiData.filter((v, i) => v.readed == false);
    unreadedchat = unreadedchat.filter((v, i) => v.chatRoom == atab);
    setUnreadnum(unreadedchat.length);
  }, [chatNotiData]);

  // const unreadnum = unreadedSnapshot ? unreadedSnapshot.docs.length : 0;
  // const unreadnum = 0;
  const onIconClicked = () => {
    changeTab(atab);
    // console.log("opentab" + atab);
    // onToggle();
  };

  return (
    <Box float={"right"}>
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
        <Text>{atab}</Text>
        {/* <Badge>{unreadnum}</Badge> */}
      </Center>
      {/* {unreadnum &&
            (
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
      {/* {isOpen && (
        <ChatBox
          atab={atab}
          user={user}
          onClose={onClose}
          // setTab={setTab}
          isOpen={isOpen}
          db={db}
          // chatTab={chatTab}
        />
      )} */}
    </Box>
  );
};

const ChatBox = ({ atab, user, db }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const userData = useUser();
  const { tabState, addTab, removeTab, changeTab, CloseTab } = useTab();
  const [msg, setMsg] = useState("");
  const unrededref = useRef(false);
  // console.log("currentopen1 " + tabState.opentab);
  useEffect(() => {
    // console.log("currentopen2 " + tabState.opentab);
    if (tabState.opentab != "") {
      onOpen();
    }
  }, [tabState]);

  const chatRoomData = useMemo(() => {
    if (tabState.opentab != "") {
      getDoc(doc(db, "chatrooms", tabState.opentab)).then((doc) => {
        return doc.data();
      });
    }
    return "";
  }, [tabState.opentab]);

  // const [chatRoomData, loading, error] = useDocumentDataOnce(
  //   doc(db, "chatrooms", tabState.opentab)
  // );
  const [name, setName] = useState("");
  const [snapshot, setSnapshot] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tabState.opentab != "") {
      const QuerySnapshot = query(
        collection(db, "chatrooms", tabState.opentab, "message"),
        orderBy("timestamp")
      );
      const unsubscribe = onSnapshot(QuerySnapshot, (snap) => {
        setSnapshot(snap);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, [tabState.opentab]);

  // const [snapshot, loadingsnapshot, errorsnapshot] =
  //   useCollection(QuerySnapshot);
  const remove = () => {
    // setTab([...chatTab.filter((v, i) => v != tab)]);
    removeTab(tabState.opentab);
    // changeTab("");
    CloseTab();
    onClose();
  };
  useEffect(() => {
    // console.log(chatRoomData,loading)
    if (!loading && chatRoomData) {
      if (chatRoomData.type == "private") {
        const member = chatRoomData.member.find((v) => v != user.uid);
        const filteredname = userData.find(
          (v) => v.userId == member
        ).displayName;
        // console.log(filteredname);
        setName(filteredname);
        // name = member[0];
      } else {
        setName(chatRoomData.name);
      }
    }
  }, [chatRoomData, loading]);

  useEffect(() => {
    // if (snapshot) {
    //   console.log(snapshot.docs);
    // }

    if (
      snapshot &&
      snapshot.docs[0] &&
      !snapshot.docs[0].data().readedby.includes(user.uid)
    ) {
      unrededref.current = true;
    } else {
      unrededref.current = false;
    }
  }, [snapshot]);

  const onChatSent = async () => {
    if (msg) {
      console.log(doc(db, "chatrooms", tabState.opentab));
      await updateDoc(doc(db, "chatrooms", tabState.opentab), {
        lastmsg: msg,
        sender: user.displayName,
        senderId: user.uid,
        readedby: [user.uid],
        timestamp: serverTimestamp(),
      })
        .then(() => console.log('updated'))
        .catch((e) => console.log(e));
      await addDoc(collection(db, "chatrooms", tabState.opentab, "message"), {
        sender: user.displayName,
        senderId: user.uid,
        text: msg,
        timestamp: serverTimestamp(),
      });
      setMsg("");
    }
  };
  const handleFocus = async () => {
    if (unrededref) {
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
      // const q = query(
      //   collection(db, "userDetail", user.uid, "chatmessage"),
      //   limit(50)
      // );
      // getDocs(q).then((docs) => {
      //   if (docs) {
      //     // console.log(docs.docs())
      //     const batch = writeBatch(db);
      //     docs.docs.map((doc) => {
      //       console.log("unread ", doc.data());
      //       batch.update(doc.ref, { readed: true });
      //     });
      //     batch.commit();
      //   }
      // });
      // const q2 = query(
      //   collection(db, "chatrooms", tabState.opentab, "message"),
      //   orderBy("timestamp", "asc"),
      //   limit(50)
      // );
      // getDocs(q2).then((docs) => {
      //   const newdocs = docs.docs.filter(
      //     (v, i) => !v.data().readedby.includes(user.uid)
      //   );
      //   if (newdocs) {
      //     const batch = writeBatch(db);
      //     newdocs.map((doc) => {
      //       batch.update(doc.ref, {
      //         readedby: [...doc.data().readedby, user.uid],
      //       });
      //       console.log(doc.data().readedby.includes(user.uid));
      //     });
      //     batch.commit();
      //   }
      // });
    }

    // console.log("focus")
  };

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

      <Box overflowY="auto" id="msgbox" alignSelf={"stretch"} flexGrow="1">
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
        <Input
          w="65%"
          marginLeft={5}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onFocus={handleFocus}
          onKeyUp={(event) => (event.key === "Enter" ? onChatSent() : null)}
        />
        <Button float="right" marginRight={5} onClick={onChatSent}>
          send
        </Button>
      </Box>
    </Box>
  );
};
