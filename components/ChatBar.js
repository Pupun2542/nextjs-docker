import {
  Avatar,
  Box,
  Divider,
  HStack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
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
  const [display, setDisplay] = useState([]);
  const { tabState, addTab, removeTab, changeTab, closeTab } = useTab();
  const [chatroom, setChatroom] = useState([]);
  const [chatRoomdisplay, setChatRoomDisplay] = useState([]);

  useEffect(() => {
    const fetchChatRoom = async () => {
      if (user) {
        const chatRoomsSnapshot = await getDocs(
          query(
            collection(db, "chatrooms"),
            where("member", "array-contains", user.uid)
          )
        );
        const chatroomdata = chatRoomsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        chatroomdata.sort((a, b) => {
          const atime = a.timestamp ? a.timestamp.toDate() : 0;
          const btime = b.timestamp ? b.timestamp.toDate() : 0;
          return btime - atime;
        });
        setChatroom(chatroomdata);
      }
    };
    fetchChatRoom();
  }, [user]);

  useEffect(() => {
    const getHeader = async () => {
      if (user && chatnotidata) {
        let mappeduser = [];
        await Promise.all(
          chatnotidata.map(async (data) => {
            if (user && data.type == "private") {
              const filteredname = data.member.find((v) => v !== user.uid);
              const detail = await getUser([filteredname]);
              const thumbnail = detail[0].photoURL;
              const name = detail[0].displayName;
              mappeduser = [
                ...mappeduser,
                { thumbnail: thumbnail, name: name, id: data.id },
              ];
            } else if (user && data.type == "group") {
              const thumbnail = data.thumbnail;
              const name = data.name;
              mappeduser = [
                ...mappeduser,
                { thumbnail: thumbnail, name: name, id: data.id },
              ];
            }
          })
        );
        // console.log(mappeduser);
        setDisplay(mappeduser);
      }
    };
    getHeader();
  }, [user, chatnotidata]);

  useEffect(() => {
    const getChatroomHeader = async () => {
      if (user && (chatroom.length > 0 || display.length > 0)) {
        let mappeduser = [];
        const filteredchatroom = chatroom.filter((v) => {
          if (display.find((dv) => dv.id == v.id)) {
            return false;
          } else {
            return true;
          }
        });
        // console.log(filteredchatroom);
        await Promise.all(
          filteredchatroom.map(async (data) => {
            if (user && data.type == "private") {
              const filteredname = data.member.find((v) => v !== user.uid);
              const detail = await getUser([filteredname]);
              const thumbnail = detail[0].photoURL;
              const name = detail[0].displayName;
              mappeduser = [
                ...mappeduser,
                { thumbnail: thumbnail, name: name, id: data.id },
              ];
            } else if (user && data.type == "group") {
              const thumbnail = data.thumbnail;
              const name = data.name;
              mappeduser = [
                ...mappeduser,
                { thumbnail: thumbnail, name: name, id: data.id },
              ];
            }
          })
        );
        // console.log(mappeduser);
        setChatRoomDisplay(mappeduser);
      }
    };
    getChatroomHeader();
  }, [chatroom, display]);
  return (
    <Box
      bg={"#343434"}
      position={"fixed"}
      right={"0"}
      p={1}
      h={"100vh"}
      pt={"55px"}
      w={isExpanded ? "180px" : "60px"}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <VStack align={"start"}>
        {display?.map((data) => (
          <HStack
            fontFamily={"mitr"}
            color={"white"}
            fontSize={14}
            onClick={() => changeTab(data.id)}
            cursor={"pointer"}
          >
            <Avatar m={1} src={data.thumbnail} />
            {isExpanded && <Text>{data.name}</Text>}
          </HStack>
        ))}
        <Divider bg={"white"} />
        {chatRoomdisplay?.map((data) => (
          <HStack
            fontFamily={"mitr"}
            color={"white"}
            fontSize={14}
            onClick={() => changeTab(data.id)}
            cursor={"pointer"}
          >
            <Avatar m={1} src={data.thumbnail} />
            {isExpanded && <Text>{data.name}</Text>}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
