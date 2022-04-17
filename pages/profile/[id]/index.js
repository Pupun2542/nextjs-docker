import React, { useEffect, useState } from "react";
import { useApp } from "../../../src/hook/local";
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  query,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { Flex, Box, Text, Spacer, VStack, Center, } from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";


export default function profile() {
  const router = useRouter();
  const { id } = router.query;
  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [userDetail, setUserDetail] = useState(null);

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

  return (
    <Box>
      <CustomNavbar />
      <Flex>
      
        <Spacer />
        <VStack bg={'tomato'} minH={914} width={'50%'}>
          <Center bg={'wheat'} width='100%' h={400} fontSize={30}>Cover</Center>
          <Flex>
            <Center w={150} h={150} bg='white' rounded={100} m={2} mt={-20} float={'left'}>Avatar</Center>
            <Box bg={'red.200'} w={770} m={2} p={2}>{userDetail && <Text fontFamily={'Mitr'} fontSize={30}>{userDetail.displayName}</Text>}</Box>
            
          </Flex>
          
        </VStack>
        <Spacer />
    </Flex>
    </Box>
    
  )
  
}
