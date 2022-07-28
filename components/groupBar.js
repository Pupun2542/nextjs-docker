import {
  Avatar,
  Box,
  HStack,
  VStack,
  Text,
  Flex,
  Button,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Input,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  Circle,
  Center,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UseChatManager from "../src/hook/useChatManager";
import {
  FacebookLogo,
  DiscordLogo,
  ChatCenteredText,
  ListPlus,
  ChatCircle,
  ChatsCircle,
  CaretDown,
} from "phosphor-react";

export const GroupBar = ({
  id,
  data,
  user,
  selectedchara,
  setSelectedchara,
  page,
}) => {
  const router = useRouter();
  const { goToCommuGroupMessage, handleCommuGroupMessage } = UseChatManager();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const responsivebar = useDisclosure();
  const changeCharacter = useDisclosure();

  const displayUser = selectedchara?.name ? selectedchara : {...user, isOwner: data.isOwner, isStaff: data.isStaff} || null;

  if (displayUser) {
    return (
      <>
        <VStack
          fontFamily={"Sarabun"}
          position={"fixed"}
          left={4}
          top={70}
          boxShadow={"base"}
          p={5}
          bg={"white"}
          rounded={10}
          w={"100%"}
          maxWidth={{ xl: '350px', '2xl':"450px"}}
          display={{ sm: "none", xl: "initial" }}
          zIndex={20000}
        >
          <HStack w={"100%"}>
            <Avatar
              src={displayUser.photoURL}
              name={displayUser.displayName || displayUser.name}
            />

            <Box w={"100%"}>
              <Menu display={data?.mychara || (page && page == "preview") ? "initial" : "none"}>
                <MenuButton
                  as={Button}
                  rightIcon={<CaretDown size={6} />}
                  height={26}
                  w={"auto"}
                >
                  <Text fontSize="sm" textOverflow={"clip"}>
                    {displayUser.displayName || displayUser.name}
                  </Text>
                </MenuButton>

                <MenuList>
                  <MenuItem onClick={() => setSelectedchara({})}>
                    <Flex alignItems={"center"}>
                      <Avatar src={user.photoURL} w={8} h={8} mr={1} />
                      <Text fontSize="sm">{user.displayName}</Text>
                    </Flex>
                  </MenuItem>
                  {data.mychara &&
                    Object.values(data.mychara).map((cha, i) => (
                      <MenuItem onClick={() => setSelectedchara(cha)} key={i}>
                        <Flex alignItems={"center"}>
                          <Avatar src={cha.photoURL} w={8} h={8} mr={1} />
                          <Text fontSize="sm">{cha.name}</Text>
                        </Flex>
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
              <Flex>
                <Text mr={2}>Status:</Text>
                <Text>
                  {displayUser.isOwner
                    ? "Owner"
                    : displayUser.isStaff
                      ? "Staff"
                      : displayUser.refererId
                        ? "character"
                        : "visitor"}
                </Text>
              </Flex>
            </Box>

            {/* <IconButton
                        colorScheme='facebook'
                        icon={<FacebookLogo />}
                        ref={btnRef}
                        onClick={onOpen}
                        rounded={'full'}
                    /> */}

            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Create your account</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {((data.isStaff && data.mainchatgroup) || !data.isStaff) && (
              <IconButton
                colorScheme="twitter"
                icon={<ChatsCircle />}
                ref={btnRef}
                onClick={() => goToCommuGroupMessage(id, user)}
                rounded={"full"}
                title="Chats"
              />
            )}

            {data.isStaff && !data.mainchatgroup && (
              <IconButton
                title="Chats"
                colorScheme="facebook"
                icon={<ChatsCircle />}
                ref={btnRef}
                onClick={() => handleCommuGroupMessage(user, id, data.name)}
                rounded={"full"}
              />
            )}
          </HStack>

          <Button w={"100%"} onClick={() => router.push(`/group/${id}`)}>
            Lobby
          </Button>
          <Button
            w={"100%"}
            onClick={() => router.push(`/group/${id}/dashboard`)}
          >
            Dashboard
          </Button>
          <Button w={"100%"}>Pin</Button>
        </VStack>
        <VStack
          fontFamily={"Sarabun"}
          position={"fixed"}
          left={4}
          top={70}
          rounded={10}
          w={"60px"}
          display={{ sm: "initial", xl: "none" }}
          zIndex={20000}
          spacing={0}
        >
          {responsivebar.isOpen && data?.mychara && page && page !== "preview" ? (
            <Circle
              width={"48px"}
              height={"48px"}
              bg={"white"}
              onClick={responsivebar.onToggle}
            >
              X
            </Circle>
          ) : (
            <Avatar
              src={displayUser.photoURL}
              name={displayUser.displayName || displayUser.name}
              onClick={responsivebar.onToggle}
              m={'6px'}
            />
          )}
          <VStack
            translateY={"-20px"}
            transition={
              "opacity 150ms ease-in-out, transform 150ms ease-in-out"
            }
            opacity={responsivebar.isOpen ? 1 : 0}
            bg={'#F3F5F8'}
            py={2}
            borderRadius={5}
            boxShadow={'base'}
          >
            <Box position={"relative"}>
              <Avatar
                src={displayUser.photoURL}
                name={displayUser.displayName || displayUser.name}
                onClick={changeCharacter.onToggle}
              />
              {changeCharacter.isOpen && (
                <VStack
                  pos={"absolute"}
                  left={"60px"}
                  top={0}
                  justify={"flex-start"}
                >
                  <Flex
                    alignItems={"center"}
                    onClick={() => {
                      setSelectedchara({});
                      changeCharacter.onClose();
                    }}
                  >
                    <Avatar src={user.photoURL} size="md" />
                    <Text fontSize="sm">{user.displayName}</Text>
                  </Flex>
                  {data.mychara &&
                    Object.values(data.mychara).map((cha, i) => (
                      <Flex
                        alignItems={"center"}
                        onClick={() => {
                          setSelectedchara(cha);
                          changeCharacter.onClose();
                        }}
                        key={i}
                      >
                        <Avatar src={cha.photoURL} size="md" />
                        <Text fontSize="sm">{cha.name}</Text>
                      </Flex>
                    ))}
                </VStack>
              )}
            </Box>
            {((data.isStaff && data.mainchatgroup) || !data.isStaff) && (
              <IconButton
                colorScheme="twitter"
                icon={<ChatsCircle />}
                ref={btnRef}
                onClick={() => goToCommuGroupMessage(id, user)}
                rounded={"full"}
                title="Chats"
                w={"48px"}
                h={"48px"}
              />
            )}

            {data.isStaff && !data.mainchatgroup && (
              <IconButton
                title="Chats"
                colorScheme="facebook"
                icon={<ChatsCircle />}
                ref={btnRef}
                onClick={() => handleCommuGroupMessage(user, id, data.name)}
                rounded={"full"}
                w={"48px"}
                h={"48px"}
              />
            )}
            <Circle
              w={"48px"}
              h={"48px"}
              bg={"lightgray"}
              onClick={() => router.push(`/group/${id}`)}
            >
              LB
            </Circle>
            <Circle
              w={"48px"}
              h={"48px"}
              bg={"lightgray"}
              onClick={() => router.push(`/group/${id}/dashboard`)}
            >
              DB
            </Circle>
            <Circle w={"48px"} h={"48px"} bg={"lightgray"}>
              P
            </Circle>
          </VStack>
        </VStack>
      </>
    );
  } else {
    return <></>;
  }
};
