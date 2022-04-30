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
} from "@chakra-ui/react";
import { Heart, Option } from "phosphor-react";

export const Comments = ({ id }) => {
  const { app, auth, db } = useApp();
  const q = query(
    collection(db, "group", id, "comments"),
    orderBy("timestamp", "desc")
  );
  const [snapshot, loading, error] = useCollection(q);
  // const [replyState, setReplyState] = useState(false);
  const [message, setMessage] = useState("");

  const handleMessage = () => {
    //   console.log(messageref.current)
    addDoc(collection(db, "group", id, "comments"), {
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
    //   console.log(snapshot.size)
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
          />
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
        />
      </Box>
    </Box>
  );
};

const Commentpost = ({ cdoc, id }) => {
  const { app, auth, db } = useApp();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [reply, setReply] = useState(0);
  const [coll] = useCollectionOnce(
    collection(db, "group", id, "comments", cdoc.id, "reply")
  );
  useEffect(() => {
    if (coll && !coll.empty) {
      setReply(coll.size);
    }
  }, [coll]);

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

  return (
    <Flex width="100%" backgroundColor="tomato" marginTop="10px">
      <Box flexGrow={1}>
        <Image src={cdoc.data().thumbnail} />
      </Box>

      <Flex flexDir="column" flexGrow={10}>
        <Flex justifyContent="space-between">
          <Text>
            {cdoc.data().displayName ? cdoc.data().displayName : "placeholder"}
          </Text>
          <Text>
            {cdoc.data().timestamp
              ? parseDate(cdoc.data().timestamp)
              : "01/01/1970:00.00"}
            {/* {console.log(doc.data().timestamp)} */}
            {/* 01/01/1970:00.00 */}
          </Text>
        </Flex>
        <Divider />
        <Box>
          <Text>{cdoc.data().message ? cdoc.data().message : ""}</Text>
        </Box>
        <Box>
          <Button onClick={HandleLove} backgroundColor={cdoc.data().love.includes(auth.currentUser.uid)? "red" : "white"}>
            <Heart size={16} color={"red"} />
            {cdoc.data().love ? cdoc.data().love.length : "0"}
          </Button>
          <Button onClick={onToggle}>{reply}</Button>
        </Box>
        {isOpen && <Reply id={id} commentId={cdoc.id} setReply={setReply} />}
      </Flex>
      <Box flexGrow={1}>
        <Option size={32} />
      </Box>
    </Flex>
  );
};

const Reply = ({ id, setReply, commentId }) => {
  const { app, auth, db } = useApp();
  const [snapshot, loading, error] = useCollection(
    query(collection(db, "group", id, "comments", commentId, "reply"), orderBy("timestamp", "asc"))
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

  const HandleLove = (replyId, cdoc) => {
    if (cdoc.data().love.includes(auth.currentUser.uid)) {
      updateDoc(doc(db, "group", id, "comments", commentId, "reply", replyId), {
        love: arrayRemove(auth.currentUser.uid),
      });
    } else {
      updateDoc(doc(db, "group", id, "comments", commentId, "reply", replyId), {
        love: arrayUnion(auth.currentUser.uid),
      });
    }
  };

  if (snapshot) {
    return (
      <Box>
        {snapshot.docs.map((doc, k) => (
          <Flex width="100%" backgroundColor="tomato" marginTop="10px" key={k}>
            <Box flexGrow={1}>
              <Image src={doc.data().thumbnail} />
            </Box>

            <Flex flexDir="column" flexGrow={10}>
              <Flex justifyContent="space-between">
                <Text>
                  {doc.data().displayName
                    ? doc.data().displayName
                    : "placeholder"}
                </Text>
                <Text>
                  {doc.data().timestamp
                    ? parseDate(doc.data().timestamp)
                    : "01/01/1970:00.00"}
                  {/* {console.log(doc.data().timestamp)} */}
                  {/* 01/01/1970:00.00 */}
                </Text>
              </Flex>
              <Divider />
              <Box>
                <Text>{doc.data().message ? doc.data().message : ""}</Text>
              </Box>
              <Box>
                <Button onClick={()=>HandleLove(doc.id, doc)} backgroundColor={doc.data().love.includes(auth.currentUser.uid)? "red" : "white"}>
                  <Heart size={16} color="red" />
                  {doc.data().love ? doc.data().love.length : "0"}
                </Button>
              </Box>
            </Flex>
            <Box flexGrow={1}>
              <Option size={32} />
            </Box>
          </Flex>
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

const parseDate = (seconds)=>{
    // const date = new Date()
    // date.setMilliseconds(seconds)
    const date = seconds.toDate()
    // const formatted = `${date.getDate()}/${date.getMonth()+1}/${date.getYear()} [${date.getHours()}:${date.getMinutes()}]`;
    const formatted = date.toLocaleDateString("th-TH",{
        day: 'numeric',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
    const spdate = formatted.split(' ');
    const formatted2 = `${spdate[0]} [${spdate[1]}]`
    // console.log(formatted2)
    return formatted2;
    // console.log(seconds.toDate());
}
