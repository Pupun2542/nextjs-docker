import React, { useEffect, useState } from "react";
import { useApp } from "../../../src/hook/local";
import {
    addDoc,
    collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import {
  Flex,
  Box,
  Text,
  Spacer,
  VStack,
  Center,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";
import { Chatsidebar } from "../../../components/chat";

export default function profile() {

  const router = useRouter();
  const { id } = router.query;
  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const {app, auth, db} = useApp();
  const [user, loading, error] = useAuthState(auth);
  const [userDetail, setUserDetail] = useState(null);
  const [newtab, setNewtab] = useState("");

  useEffect(() => {
    // console.log(id);
    const loaduserDetail = async () => {
      if (!loading) {
        const detail = await getDoc(doc(db, "userDetail", id));
        //    console.log(detail.data())
        if (detail.exists) {
          setUserDetail(detail.data());
        }
      }
    };
    loaduserDetail();
  }, [loading, id]);

  const handleMessage = ()=>{
    let roomId = "";
    getDocs(query(collection(db, "chatrooms"), where("member", "array-contains", user.uid), where("type","==", "private"))).then((docs)=>{
        
        if (!docs.empty){
            // docs.docs.map(doc=>{
            //     // console.log(doc.data())
            //     if (doc.data().member.includes(id)){
            //         roomId = doc.data().id
            //     }
            // });
            const docId = docs.docs.find((v)=> v.data().member.includes(id));
            if (docId){
              roomId = docId.data().id;
            }else{
              addDoc(collection(db, "chatrooms"),{ 
                member: [user.uid, id],
                type: "private",
            }).then((created)=>{
                roomId = created.id
                updateDoc(doc(db, "chatrooms", created.id), {
                    id: created.id,
                }).then(()=>console.log("updated"))
            })
            }
            
            
            // console.log("not empty")
        }else{
            // console.log("empty")
            addDoc(collection(db, "chatrooms"),{ 
                member: [user.uid, id],
                type: "private",
            }).then((created)=>{
                // console.log("created")
                roomId = created.id
                updateDoc(doc(db, "chatrooms", created.id), {
                    id: created.id,
                }).then(()=>console.log("updated"))
            })
        }
        // console.log(roomId)
        setNewtab(roomId)
        setTimeout(()=>setNewtab(""),500)
    })
  }
  return (
    <Box>
      <CustomNavbar />
      {user&&(
        <Chatsidebar db={db} user={user} forcedopenTab={newtab}/>
      )}
      <Flex flexGrow={0.8} justifyContent="center">
        {/* <Spacer /> */}
        <VStack bg={"tomato"} minH={914}>
          <Center bg={"wheat"} width="100%" h={400} fontSize={30}>
            Cover
          </Center>
          <Flex>
            <Center
              w={150}
              h={150}
              bg="white"
              rounded={100}
              m={2}
              mt={-20}
              float={"left"}
            >
              Avatar
            </Center>
            <Flex bg={"red.200"} w={770} m={2} p={2}>
              {userDetail && (
                <Text fontFamily={"Mitr"} fontSize={30}>
                  {userDetail.displayName}
                </Text>
              )}
              <Spacer />
              <Stack direction="row" spacing={4}>
                <Button colorScheme="teal" variant="solid" position='initial'>
                  Add Friend
                </Button>
                <Button colorScheme="teal" variant="outline" onClick={handleMessage} position='initial'>
                  Message
                </Button>
              </Stack>
            </Flex>
          </Flex>
        </VStack>
        {/* <Spacer /> */}
      </Flex>
    </Box>
  );
}
