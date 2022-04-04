import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp } from "../src/hook/local";
import { useRouter } from "next/router";
import { Box, Input, Button, Text } from "@chakra-ui/react";
import CustomNavbar from "../components/navbar";

function chat() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const router = useRouter();

  const [text, setText] = useState("");
  const [chatText, setChatText] = useState([]);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (!loading && user) {
      const q = query(
        collection(db, "chat"),
        orderBy("timeStamp")
      );
      onSnapshot(q, (snapshot) => {
        setChatText(snapshot.docs.map((doc) => doc.data()));
        // console.log()
        // console.log(snapshot.docs.values())
      });
    }
  }, [user, loading]);

  const handleSend = () => {
    addDoc(collection(db, "chat"), {
      sender: user.displayName,
      senderId: user.uid,
      text: text,
      timeStamp: serverTimestamp(),
    });
    setText("");
  };

  if (user) {
    return (
      <Box>
        <CustomNavbar />
        {chatText.map((data) => (
          <Box
            alignSelf={(data.senderId = user.uid ? "right" : "left")}
            padding="20px"
            maxW={'30%'}
          >
            <Text fontSize={10}>{data.sender}</Text>
            <Text
              fontSize={20}
              backgroundColor={(data.senderId = user.uid ? "blue" : "red")}
              rounded='5'
            >
              {data.text}
            </Text>
            {/* <Text fontSize={10}>{data.timeStamp.}</Text> */}
          </Box>
        ))}

        <Box
          pos={"fixed"}
          bottom={0}
          width={"100%"}
          paddingBottom="10px"
          paddingLeft="5px"
        >
          <Input
            type="text"
            width={"80%"}
            paddingRight="10px"
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(key)=>{
                if (key.key == 'Enter'){
                    handleSend
                }
            }}
            value = {text}
          />
          <Button
            w="10%"
            isDisabled={text ? false : true}
            onClick={handleSend}
            marginLeft="10px"
            marginRight="10px"
          >
            Send
          </Button>
        </Box>
      </Box>
    );
  }

  return <></>;
}

export default chat;
