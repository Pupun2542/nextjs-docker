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
import { Box, Input, Button, Text, Flex } from "@chakra-ui/react";
import CustomNavbar from "../components/navbar";
// import dynamic from 'next/dynamic'
import useSound from "use-sound";
// import notisfx from '/public/chatnoti.wav'
// import {Howl, Howler} from 'howler'
import Head from "next/head";

function chat() {
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const router = useRouter();

  const [text, setText] = useState("");
  const [chatText, setChatText] = useState([]);
  const [pending, setPending] = useState(0);
  // const notisound = new Audio()
  const [user, loading, error] = useAuthState(auth);
  // const [audio, setAudio] = useState(null);
  const [play] = useSound('/chatnoti.wav', {volume: 1.0});
  

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(()=>{
    
  });
  useEffect(() => {
    if (!loading && user) {
      const q = query(collection(db, "chat"), orderBy("timeStamp"));
      onSnapshot(q, (snapshot) => {
        setChatText(snapshot.docs.map((doc) => doc.data()));
        play();
        // console.log()
        // console.log(snapshot.docs.values())
        setPending((prev)=>prev+1);
        
      });
      // return unsubscribe();
    }
  }, [user, loading]);

  // useEffect(()=>{
  //   const visibilitychange = ()=>{
  //     setPending(0);
  //   }
  //   document.addEventListener("visibilitychange", visibilitychange);
    
  //   return ()=>document.removeEventListener("visibilitychange", visibilitychange);
  // },[])

  const handleSend = () => {
    // if (text) {
    //   addDoc(collection(db, "chat"), {
    //     sender: user.displayName,
    //     senderId: user.uid,
    //     text: text,
    //     timeStamp: serverTimestamp(),
    //   });
    //   setText("");
    // }
    // setPending(pending+1)
    play();
  };

  const handleFocus = () =>{
    setPending(0);
  }

  if (user) {
    return (
      <Box>
          <Head>
            <title>{pending>0? "("+pending+")" : ""} Comuthor</title>
          </Head>
        <CustomNavbar />
        <Box overflowY={"auto"} maxH={820} onFocus={handleFocus} >
          {chatText.map((data) => (
            <Flex
              flexDirection={(data.senderId == user.uid ? "row-reverse" : "row")}
            
              alignItems={"center"}
              padding="20px"
              maxH={500}
            >
              {data.senderId == user.uid ? (
                <Box minW={100} maxW={400}>
                  <Text fontSize={10}>{data.sender}</Text>
                  <Text fontSize={20} backgroundColor={"blue.400"} rounded="5" padding={2}>
                    {data.text}
                  </Text>
                  {console.log()}
                    {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                </Box>
              ) : (
                <Box minW={100} maxW={400}>
                  <Text fontSize={10}>{data.sender}</Text>
                  <Text fontSize={20} backgroundColor={"red.400"} rounded="5" padding={2}>
                    {data.text}
                  </Text>
                  {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                </Box>
              )}
            </Flex>
          ))}
        </Box>
        <Box
          pos={"fixed"}
          bottom={0}
          width={"100%"}
          paddingBottom="10px"
          paddingLeft="5px"
          bg={"#FFFFFF"}
        >
          <Input
            type="text"
            width={"80%"}
            paddingRight="10px"
            onChange={(e) => setText(e.target.value)}
            onKeyUp={(event) => (event.key === "Enter" ? handleSend() : null)}
            value={text}
            ml={10}
            // onFocus={handleFocus}
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

  return (
  <Head>
    <title>{pending>0? pending : ""}Comuthor</title>
  </Head>
  );
}

export default chat;
