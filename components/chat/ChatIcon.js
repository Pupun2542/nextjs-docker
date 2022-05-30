import React, { useState, useEffect } from "react";
import { Box, Center, Image } from "@chakra-ui/react";
import { useTab, useNotifications } from "../../src/hook/local";

export const ChatIcon = ({ user, db, atab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  const { notidata, chatNotiData } = useNotifications();
  const [unreadnum, setUnreadnum] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  // const unreadnum = 0;
  useEffect(() => {
    console.log(chatNotiData);
    if (chatNotiData && chatNotiData.length > 0) {
      const tabDetail = chatNotiData.find((v) => v.id == atab);
      if (tabDetail.type == "private" || tabDetail.type == "chara") {
        const filteredname = tabDetail.memberDetail.find(
          (v) => v.uid != user.uid
        );
        // console.log(filteredname)
        const thumbnail = filteredname.photoURL;
        setThumbnail(thumbnail);
      } else {
        const thumbnail = tabDetail.thumbnail;
        setThumbnail(thumbnail);
      }
    }

  }, [chatNotiData]);

  // const unreadnum = unreadedSnapshot ? unreadedSnapshot.docs.length : 0;
  // const unreadnum = 0;
  const onIconClicked = () => {
    // window.localStorage.setItem("openTab", atab);
    changeTab(atab);
    // console.log("opentab" + atab);
    // onToggle();
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
        <Image src={thumbnail} w="100%" h="100%" rounded={100} />
        {/* <Chats size={32} /> */}
        {/* <Text>{atab}</Text> */}
        {/* <Badge>{unreadnum}</Badge> */}
      </Center>
      {/* {unreadnum &&
              (
              <Center
                float="left"
                background="#343434"
                rounded={100}
                color={"white"}
                w={50}
                h={50}
                _hover={{
                  backgroundColor: "#4D4D88",
                }}
                onClick={onToggle}
                marginBottom="3"
              >
                <Chats size={32} />
                <Badge>{unreadnum}</Badge>
              </Center>
            )} */}
      {/* {isOpen && (
          <ChatBox
            atab={atab}
            user={user}
            onClose={onClose}
            // setTab={setTab}
            isOpen={isOpen}
            db={db}
            // chatTab={chatTab}
          />
        )} */}
    </Box>
  );
};
