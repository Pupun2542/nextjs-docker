import { Avatar, Box, HStack, VStack, Text, Flex, Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const GroupBar = ({id}) => {

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
                <Avatar />

                <Box>
                    <Text>Name</Text>
                    <Flex>
                        <Text mr={2}>Status:</Text>
                        <Text>Admin/Staff/Player/Guest</Text>
                    </Flex>
                </Box>
            </HStack>

            <Button
                maxW={330}
                w={'100%'}
                onClick={() => router.push('../'+id)}
            >
                Lobby
            </Button>
            <Button maxW={330} w={'100%'}>Dashboard</Button>
            <Button maxW={330} w={'100%'}>Pin</Button>
        </VStack>
    )
}