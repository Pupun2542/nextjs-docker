import { Avatar, Box, Flex, Tooltip, Text, VStack } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";

export const ChatThum = ({ }) => {
    return (
        <Flex bg={'gray.500'} position={'fixed'}  p={2}>
            <Avatar mr={2} />
            <VStack>
                <Text color={'black'}>Name</Text>
            </VStack>
            
        </Flex>
    )
}