import { Avatar, Box, Tooltip } from "@chakra-ui/react"
import React, { useEffect, useState } from "react";
import { ChatThum } from "./ChatThum";

export const ChatBar = ({ }) => {
    return (
        <Box bg={'#343434'} position={'fixed'} right={'0'} p={1} h={'calc(100vh - 55px)'}>

            <Avatar m={1}
            />

        </Box>
    )
}