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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UseChatManager from "../src/hook/useChatManager";
import { FacebookLogo, DiscordLogo } from "phosphor-react";

export const GroupBar = ({ id, data, user }) => {
    const router = useRouter();
    const { goToCommuGroupMessage, handleCommuGroupMessage } = UseChatManager();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    return (
        <VStack
            fontFamily={"Sarabun"}
            position={"fixed"}
            left={5}
            top={70}
            boxShadow={"base"}
            p={5}
            bg={"white"}
            rounded={10}
        >
            <HStack>
                <Avatar src={user.photoURL} name={user.displayName} />

                <Box>
                    <Text>{user.displayName}</Text>
                    <Flex>
                        <Text mr={2}>Status:</Text>
                        <Text>
                            {data.isOwner ? "Owner" : data.isStaff ? "Staff" : "Player"}
                        </Text>
                    </Flex>
                </Box>

                <IconButton
                    colorScheme='facebook'
                    icon={<FacebookLogo />}
                    ref={btnRef}
                    onClick={onOpen}
                    rounded={'full'}
                />

                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Create your account</DrawerHeader>

                        <DrawerBody>
                            <Input placeholder='Type here...' />
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='blue'>Save</Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </HStack>

            <Button maxW={330} w={"100%"} onClick={() => router.push(`/group/${id}`)}>
                Lobby
            </Button>
            <Button
                maxW={330}
                w={"100%"}
                onClick={() => router.push(`/group/${id}/dashboard`)}
            >
                Dashboard
            </Button>
            <Button maxW={330} w={"100%"}>
                Pin
            </Button>
            {((data.isStaff && data.mainchatgroup) || !data.isStaff) && (
                <Button
                    maxW={330}
                    w={"100%"}
                    onClick={() => goToCommuGroupMessage(id, user)}
                >
                    Group chat
                </Button>
            )}
            {data.isStaff && !data.mainchatgroup && (
                <Button
                    maxW={330}
                    w={"100%"}
                    onClick={() => handleCommuGroupMessage(user, id, data.name)}
                >
                    Crate group chat
                </Button>
            )}
        </VStack>
    );
};
