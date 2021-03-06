import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTab } from "../../src/hook/local";
import { ChatIcon } from "./ChatIcon";
import { ChatBox } from "./ChatBox";
import { useEffect, useState } from "react";
export const Chatsidebar = ({ user, isExpanded }) => {
  const { tabState } = useTab();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [roomDetail, setRoomDetail] = useState({});
  useEffect(() => {
    onOpen();
  }, [tabState.opentab]);
  return (
    <Box
      position="fixed"
      right={isExpanded ? "180px" : "70px"}
      transition={"all 0.2s"}
      zIndex={10000}
      bottom={0}
      alignItems="flex-end"
    >
      {/* <Flex flexDirection="column" float="right">
        {tabState &&
          tabState.othertab.length > 0 &&
          tabState.othertab.map((atab, k) => (
            <ChatIcon
              user={user}
              atab={atab}
              key={k}
              roomDetail={roomDetail}
              onOpen={onOpen}
              
            />
          ))}
      </Flex> */}
      {tabState.opentab && tabState.opentab != "" && isOpen && (
        <ChatBox
          crid={tabState.opentab}
          user={user}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          onToggle={onToggle}
          setRoomDetail={(e) => setRoomDetail(e)}
        />
      )}
    </Box>
  );
};
