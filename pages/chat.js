import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
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
import {
  Box,
  Input,
  Button,
  Text,
  Flex,
  Spacer,
  VStack,
  Center,
  Show,
} from "@chakra-ui/react";
import CustomNavbar from "../components/navbar";
// import dynamic from 'next/dynamic'
import useSound from "use-sound";
// import notisfx from '/public/chatnoti.wav'
// import {Howl, Howler} from 'howler'
import Head from "next/head";
// import { Flag } from "phosphor-react";
import { useCollection } from 'react-firebase-hooks/firestore'

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
  const [play] = useSound("/chatnoti.wav", { volume: 1.0 });
  const q = query(collection(db, "chat"), orderBy("timeStamp"));
  const [snapshot] = useCollection(q);
  const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }
  
  // snapshot.docs.forEach((doc)=>console.log(doc))
  // console.log(snapshot)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  // console.log("test");

  // useEffect(() => {
  //   if (!loading && user) {
  //     // const q = query(collection(db, "chat"), orderBy("timeStamp"));
  //     onSnapshot(q, (snapshot) => {
  //       // setChatText(snapshot.docs.map((doc) => doc.data()));
  //       snapshot.docChanges().forEach((change) => {
          
  //         if (change.type === "added" && chatText.length > 0) {
  //           console.log(change.doc.data());
  //           // play();
  //           // setChatText([...chatText,change.doc.data()])
  //           setPending((prev) => prev + 1);
  //         }
  //       });
  //       setChatText(snapshot.docs.map((doc) => doc.data()));

  //       // console.log()
  //       // console.log(snapshot.docs.values())
  //     });
  //     // return unsubscribe();
  //   }
  // }, [user, loading]);

  // useEffect(()=>{
  //   const visibilitychange = ()=>{
  //     setPending(0);
  //   }
  //   document.addEventListener("visibilitychange", visibilitychange);

  //   return ()=>document.removeEventListener("visibilitychange", visibilitychange);
  // },[])

  const handleSend = () => {
    if (text) {
      addDoc(collection(db, "chat"), {
        sender: user.displayName,
        senderId: user.uid,
        text: text,
        timeStamp: serverTimestamp(),
      });
      setText("");
    }
    // setPending(pending+1)
    // play();
  };

  const handleFocus = () => {
    setPending(0);
  };

  if (user) {

    // snapshot.docs.map((doc) => doc.data())
    
    return (
      <Box>
        <Head>
          <title>{pending > 0 ? "(" + pending + ")" : ""} Comuthor</title>
        </Head>
        <CustomNavbar />

      {snapshot&&(
        <VStack
          display={'flex'}
          flexDirection={'column'}
          boxSizing='border-box'
        >
          <Flex
            justifyContent={'center'}
            // flexGrow={1}
            w={'100%'}
            // width={480}
          >
            {/* <Box w={400}></Box> */}
            
            <Box
              overflowY={"auto"}
              minH={810}
              maxH={825}
              onClick={handleFocus}
              bg={"gray.100"}
              minW={320}
              shadow="dark-lg"
              flexGrow={0.5}
            >
              {snapshot.docs.map((doc,k) => ( 
                <Flex
                  flexDirection={
                    doc.data().senderId == user.uid ? "row-reverse" : "row"
                  }
                  key={k}
                  alignItems={"center"}
                  padding="20px"
                  maxH={500}
                >
                  {/* {console.log()} */}
                  <Box fontFamily={"Mitr"}>
                    {doc.data().senderId == user.uid ? (
                      <Box minW={280} maxW={320} marginBottom={5}>
                        <Text fontSize={10}>{doc.data().sender}</Text>
                        <Text
                          fontSize={20}
                          backgroundColor={"blue.100"}
                          rounded="5"
                        >
                          {doc.data().text}
                        </Text>
                        {console.log()}
                        {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                      </Box>
                    ) : (
                      <Box minW={280} maxW={320} marginBottom={5}>
                        <Text fontSize={10}>{doc.data().sender}</Text>
                        <Text
                          fontSize={20}
                          backgroundColor={"red.200"}
                          rounded="5"
                        >
                          {doc.data().text}
                        </Text>
                        {/* <Text fontSize={10}>{data.timeStamp.toDate()}</Text> */}
                      </Box>
                    )}
                  </Box>
                </Flex>
              ))}
            </Box>
            {/* <Box w={400}></Box> */}
          </Flex>

          <Flex
            // pos={"fixed"}
            // bottom={0}
            width={"100%"}
            paddingBottom="10px"
            paddingLeft="5px"
            bg={"gray"}
            minW={320}
            justifyContent="center"
          >
            
            <Center flexGrow="0.9">
              <Input
                type="text"
                width={"100%"}
                paddingRight="10px"
                onChange={(e) => setText(e.target.value)}
                onKeyUp={(event) =>
                  event.key === "Enter" ? handleSend() : null
                }
                value={text}
                mt={2}
                bg={"White"}
                onFocus={handleFocus}
              />
              <Button
                w="10%"
                isDisabled={text ? false : true}
                onClick={handleSend}
                marginLeft="10px"
                mt={2}
                mr={2}
              >
                Send
              </Button>
            </Center>
          </Flex>
        </VStack>
        )}
      </Box>
    );
  }

  return (
    <Head>
      <title>{pending > 0 ? pending : ""}Comuthor</title>
    </Head>
  );
}

export default chat;
