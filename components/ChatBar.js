import {
  Avatar,
  Box,
  Center,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useApp, useTab, useUser } from "../src/hook/local";
// import { ChatThum } from "./ChatThum";

export const ChatBar = ({
  chatnotidata,
  user,
  onEnter,
  onLeave,
  isExpanded,
}) => {
  const { db } = useApp();

  const getUser = useUser();
  const [displayWithMsg, setDisplayWithMsg] = useState([]);
  const { changeTab } = useTab();
  const [displayNoMsg, setDisplayNoMsg] = useState([]);
  

  const getHeader = async (chatroomdata) => {
    let mappeduser = [];
    await Promise.all(
      chatroomdata.map(async (data) => {
        if (user && data.type == "private") {
          const filteredname = data.member.find((v) => v !== user.uid);
          const detail = await getUser([filteredname]);
          const thumbnail = detail[0].photoURL;
          const name = detail[0].displayName;
          const isUnreaded = data.readedby?.includes(user.uid) ? true : false;
          mappeduser = [
            ...mappeduser,
            {
              thumbnail: thumbnail,
              name: name,
              id: data.id,
              unreaded: isUnreaded,
            },
          ];
        } else if (user && data.type == "group") {
          const thumbnail = data.thumbnail;
          const name = data.name;
          const isUnreaded = data.readedby?.includes(user.uid) ? true : false;
          mappeduser = [
            ...mappeduser,
            {
              thumbnail: thumbnail,
              name: name,
              id: data.id,
              unreaded: isUnreaded,
            },
          ];
        }
      })
    );
    return mappeduser;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "chatrooms"),
        where("member", "array-contains", user.uid),
        limit(20)
      ),
      async (chatRoomsSnapshot) => {
        if (user) {
          if (!chatRoomsSnapshot.empty) {
            const chatroomdata = chatRoomsSnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            const chatrommwithmsg = chatroomdata
              .filter((v, i) => v.timestamp)
              .slice(0, 5);
            const chatroomnomsg = chatroomdata.filter((v) => {
              if (chatrommwithmsg.find((dv) => dv.id == v.id)) {
                return false;
              } else {
                return true;
              }
            });
            chatrommwithmsg.sort((a, b) => {
              const atime = a.timestamp ? a.timestamp.toDate() : 0;
              const btime = b.timestamp ? b.timestamp.toDate() : 0;
              return btime - atime;
            });
            const mappedwithmsg = await getHeader(chatrommwithmsg);
            const mappednomsg = await getHeader(chatroomnomsg);
            setDisplayWithMsg(mappedwithmsg);
            setDisplayNoMsg(mappednomsg);
          }
        }
      }
    );
    return () => unsubscribe();
  }, [user]);

  return (
    <Box
      bg={"#343434"}
      position={"fixed"}
      right={"0"}
      p={1}
      h={"100vh"}
      pt={"55px"}
      w={isExpanded ? "180px" : "70px"}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      display={[
        "none",
        "none",
        displayWithMsg.length > 0 && displayNoMsg.length > 0
          ? "initial"
          : "none",
        displayWithMsg.length > 0 && displayNoMsg.length > 0
          ? "initial"
          : "none",
      ]}
    >
      <VStack align={"start"} spacing={0} mt={1} mb={1}>
        {displayWithMsg?.map((data) => (
          <HStack
            fontFamily={"mitr"}
            color={"white"}
            fontSize={14}
            onClick={() => changeTab(data.id)}
            cursor={"pointer"}
            width={"full"}
            _hover={{
              backgroundColor: "#6768AB",
              borderRadius: "5",
            }}
            p={1}
          >
            <Center>
              <Avatar w={54} h={54} src={data.thumbnail} />
            </Center>

            {isExpanded && <Text>{data.name}</Text>}
          </HStack>
        ))}

        <Divider bg={"white"} />
        {displayNoMsg?.map((data) => (
          <HStack
            fontFamily={"mitr"}
            color={"white"}
            fontSize={14}
            onClick={() => changeTab(data.id)}
            cursor={"pointer"}
            mt={1}
            mb={1}
          >
            <Avatar m={1} src={data.thumbnail} />
            {isExpanded && <Text>{data.name}</Text>}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
