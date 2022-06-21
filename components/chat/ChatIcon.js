import React, { useState, useEffect } from "react";
import { Avatar, Box, Center, Image } from "@chakra-ui/react";
import { useTab, useNotifications, useApp, useUser } from "../../src/hook/local";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";

export const ChatIcon = ({ user, atab, onOpen }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  const {db} = useApp()
  const getUser = useUser()
  const { chatNotiData } = useNotifications();
  const [mappedRoomDetail, setMappedRoomDetail] = useState({});
  // const unreadnum = 0;
  const [roomDetail, loading] = useDocumentData(doc(db, "chatrooms", atab))
  

  useEffect(() => {
    const mapped = async () => {
      const member = await getUser(roomDetail.member);
      setMappedRoomDetail({
        name: getName(member),
        thumbnail: getThumbnail(member),
      });
    };
    if (!loading) {
      mapped();
    } else {
      setMappedRoomDetail(roomDetail);
    }
  }, [roomDetail]);

  const getName = (member) => {
    if (roomDetail.type == "private") {
      const opp = member.find((v) => v.uid != user.uid);
      return opp.displayName;
    } else {
      return roomDetail.name;
    }
  };
  const getThumbnail = (member) => {
    if (roomDetail.type == "private") {
      const opp = member.find((v) => v.uid != user.uid);
      return opp.photoURL;
    } else {
      return roomDetail.thumbnail;
    }
  };

  const onIconClicked = () => {
    changeTab(atab);
    onOpen();
  };

  return (
    <Box float={"right"}>
      <Center
        float="left"
        background="transparent"
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
        <Avatar src={mappedRoomDetail?.thumbnail} name={mappedRoomDetail?.name} w="100%" h="100%" rounded={100} />
        {/* <Chats size={32} /> */}
        {/* <Text>{atab}</Text> */}
        {/* <Badge>{unreadnum}</Badge> */}
      </Center>
    </Box>
  );
};
