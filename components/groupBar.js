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
import { FacebookLogo, DiscordLogo, ChatCenteredText, ListPlus } from "phosphor-react";

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
            w={'100%'}
            maxWidth={'445px'}
            display={{sm: "none", lg:"initial"}}
        >
            <HStack w={'100%'} >
                <Avatar src={user.photoURL} name={user.displayName} />

                <Box w={'100%'}>
                    <Text>{user.displayName}</Text>
                    <Flex>
                        <Text mr={2}>Status:</Text>
                        <Text>
                            {data.isOwner ? "Owner" : data.isStaff ? "Staff" : "Player"}
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
                {((data.isStaff && data.mainchatgroup) || !data.isStaff) && (
                    <IconButton
                        colorScheme='twitter'
                        icon={<ListPlus />}
                        ref={btnRef}
                        onClick={() => goToCommuGroupMessage(id, user)}
                        rounded={'full'}
                        title='Chats'
                    />
                )}

                {data.isStaff && !data.mainchatgroup && (
                    <IconButton
                        title='Chats'
                        colorScheme='facebook'
                        icon={<ListPlus />}
                        ref={btnRef}
                        onClick={() => handleCommuGroupMessage(user, id, data.name)}
                        rounded={'full'}
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
            <Button w={"100%"}>
                Pin
            </Button>
        </VStack>
    );
};
