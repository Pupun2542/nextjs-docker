import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useTab } from "../../src/hook/local";
import { ChatIcon } from "./ChatIcon";
import { ChatBox } from "./ChatBox";
export const Chatsidebar = ({ user, db, forcedopenTab }) => {
  const { tabState, addTab, removeTab, changeTab } = useTab();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <Box position="fixed" right={3} bottom={0} alignItems="flex-end">
      <Flex flexDirection="column" float="right">
        {tabState &&
          tabState.othertab.length > 0 &&
          tabState.othertab.map((atab, k) => (
            <ChatIcon
              user={user}
              db={db}
              atab={atab}
              key={k}
              // setTab={addTab}
              // chatTab={tab}
            />
          ))}
      </Flex>
      {/* {isOpen && ( */}
      <ChatBox
        // atab={atab}
        user={user}
        onClose={onClose}
        // setTab={setTab}
        isOpen={isOpen}
        db={db}
        // chatTab={chatTab}
      />
      {/* )} */}
    </Box>
  );
};
