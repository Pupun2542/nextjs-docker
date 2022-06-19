import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Chat } from "phosphor-react";
import { useApp } from "../../src/hook/local";
import UseChatManager from "../../src/hook/ChatManager";

export const Myfriends = ({ data, owner, accessor }) => {
  const { auth } = useApp();
  const router = useRouter();
  const { handleMessage } = UseChatManager();
  return (
    <Flex direction={"column"}>
      {owner === accessor && (
        <>
          <Box fontSize={20} ml={10}>
            คำขอเป็นเพื่อน
          </Box>
          <SimpleGrid p={5} columns={1} spacing={5}>
            {data.pendingFriend?.map((friend, k) => (
              <Flex
                h={"90px"}
                bg={"white"}
                p={"5px"}
                borderRadius={10}
                boxShadow={"base"}
                cursor={"pointer"}
                // คลิกแล้วไปที่หน้าโฟรไฟล์ของแต่ละคนได้
                _hover={{
                  backgroundColor: "gray.200",
                }}
                key={k}
                onClick={() => router.push(`/profile/${friend.uid}`)}
              >
                <Avatar
                  w={"80px"}
                  h={"80px"}
                  src={friend.photoURL}
                  name={friend.displayName}
                ></Avatar>
                <Flex w={"100%"} direction={"column"}>
                  <Flex w={"100%"}>
                    <Text w={"100%"} fontSize={18} ml={"10px"} mt={"5px"}>
                      {friend.displayName}
                    </Text>
                    {auth.currentUser.uid !== friend.uid && (
                      <IconButton
                        rounded={"full"}
                        icon={<Chat />}
                        onClick={() =>{
                          e.stopPropagation();
                          handleMessage(auth.currentUser, friend.uid);
                        }}
                      />
                    )}
                  </Flex>

                  <Text fontSize={16} ml={"10px"} mt={"5px"}>
                    {friend.description?.substring(0, 100)}
                    {friend.description?.length > 100 ? "..." : ""}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </>
      )}

      <Box fontSize={20} ml={10}>
        รายชื่อเพื่อนทั้งหมด
      </Box>

      <SimpleGrid p={5} columns={1} spacing={5}>
        {data.friend?.map((friend, k) => (
          <Flex
            h={"90px"}
            bg={"white"}
            p={"5px"}
            borderRadius={10}
            boxShadow={"base"}
            cursor={"pointer"}
            // คลิกแล้วไปที่หน้าโฟรไฟล์ของแต่ละคนได้
            _hover={{
              backgroundColor: "gray.200",
            }}
            key={k}
            onClick={() => router.push(`/profile/${friend.uid}`)}
          >
            <Avatar
              w={"80px"}
              h={"80px"}
              src={friend.photoURL}
              name={friend.displayName}
            ></Avatar>
            <Flex w={"100%"} direction={"column"}>
              <Flex w={"100%"}>
                <Text w={"100%"} fontSize={18} ml={"10px"} mt={"5px"}>
                  {friend.displayName}
                </Text>
                {auth.currentUser.uid !== friend.uid && (
                  <IconButton
                    rounded={"full"}
                    icon={<Chat />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMessage(auth.currentUser, friend.uid);
                    }}
                  />
                )}
              </Flex>

              <Text fontSize={16} ml={"10px"} mt={"5px"}>
                {friend.description?.substring(0, 100)}
                {friend.description?.length > 100 ? "..." : ""}
              </Text>
            </Flex>
          </Flex>
        ))}
      </SimpleGrid>
    </Flex>
  );
};
