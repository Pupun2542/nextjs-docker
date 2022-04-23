import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useApp } from "../../../src/hook/local";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Grid, GridItem, VStack, Text, Box } from "@chakra-ui/react";
import CustomNavbar from "../../../components/navbar";

export default function Dashbord() {
  const router = useRouter();
  const { id } = router.query;

  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const {app, auth, db} = useApp();
  const [data, setData] = useState(null);
  const [member, setMember] = useState(null);
  const [staff, setStaff] = useState(null);
  //   const [isloading, setIsloading] = useState(true);
  const [screen, setScreen] = useState("dashboard");


  useEffect(() => {
    // const getData = async () => {
    //   const snap = await getDoc(doc(db, "prototype", id));
    //   if (snap.exist) {
    //     setData(snap.data());
    //   }
    //   const snapM = await getDocs(query(collection(db, "prototype", id, "Member")));
    //   if (snapM.exist) {
    //     setMember(snapM.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   }
    //   const snapS = await getDocs(query(collection(db, "prototype", id, "Staff")));
    //   if (snapS.exist) {
    //     setStaff(snapS.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   }
    // };
    // // SpreadsheetHandler();
    // return getData();

    const tt = Tabletop.init({
      key: '/2PACX-1vT0Z-C4Dsb4QsCplh24g5hjy-D7XelfExjjsrMYcIWUMef1xhRgaETWXivDTt8UW4fXY4C6SgDZ2Bys/pub?gid=0&single=true&output=csv',
      callback: googleData =>{
        console.log(googleData)
      }
    })
    
  }, [screen]);

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  const Memberscreen = async () => {

    return (
      <Box>
        <Box height={500} overflowY={"scroll"}>
          {member &&
            member.map((v, k) => (
              <Box key={k}>
                <Text>{v.Name}</Text>
              </Box>
            ))}
        </Box>
      </Box>
    );
  };

  const SystemScreen = async () =>{
    
  }







  if (loading) {
    return <CustomNavbar />;
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }

  if (user) {
    // if (data.staff.indexOf(user.uid)){
    return (
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={2}>
          <VStack>
            <Text
              onClick={() => {
                setScreen("dashboard");
              }}
            >
              Main
            </Text>
            <Text
              onClick={() => {
                setScreen("member");
              }}
            >
              Member
            </Text>
            <Text
              onClick={() => {
                setScreen("data");
              }}
            >
              Data
            </Text>
            <Text
              onClick={() => {
                setScreen("system");
              }}
            >
              System
            </Text>
          </VStack>
        </GridItem>
        <GridItem colSpan={10}>
          {screen == "dashboard" && (
            <Box justifySelf={"center"}>
              <Text>นี่คือ dashboard</Text>
            </Box>
          )}
          {screen == "member" && (
            <Box justifySelf={"center"}>
              <Memberscreen/>
            </Box>
          )}
          {screen == "data" && (
            <Box justifySelf={"center"}>
              <Text>นี่คือ data</Text>
            </Box>
          )}
          {screen == "system" && (
            <Box justifySelf={"center"}>
              {/* <SpreadsheetHandler/> */}
            </Box>
          )}
        </GridItem>
      </Grid>
    );
  } else {
    alert("Access Denied");
    router.back();
    // }
  }

  return <></>;

}
