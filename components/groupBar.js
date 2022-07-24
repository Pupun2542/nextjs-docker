import { Avatar, Box, HStack, VStack, Text, Flex, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const GroupBar = ({id, data, user}) => {

    const router = useRouter();

    return (
        <VStack
            fontFamily={'Sarabun'}
            position={'fixed'}
            left={5}
            top={70}
            boxShadow={'base'}
            p={5}
            bg={'white'}
            rounded={10}
        >
            <HStack>
                <Avatar src={user.photoURL} name={user.displayName} />

                <Box>
                    <Text>{user.displayName}</Text>
                    <Flex>
                        <Text mr={2}>Status:</Text>
                        <Text>{data.isOwner? "Owner" : data.isStaff? "Staff" : "Player"}</Text>
                    </Flex>
                </Box>
            </HStack>

            <Button
                maxW={330}
                w={'100%'}
                onClick={() => router.push(`/group/${id}`)}
            >
                Lobby
            </Button>
            <Button maxW={330} w={'100%'} onClick={() => router.push(`/group/${id}/dashboard`)}>Dashboard</Button>
            <Button maxW={330} w={'100%'}>Pin</Button>
        </VStack>
    )
}