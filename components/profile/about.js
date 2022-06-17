import React, { useEffect, useState } from "react";
import {
    Flex,
} from "@chakra-ui/react";
import { Personal } from "./pesonal";
import { Roleplay } from "./roleplay";
import { Active } from "./active";
import { Relationship } from "./relationship";
import { Playedcom } from "./playedcom";
import { Condition } from "./condition";

export const About = () => {

    return (
        <Flex direction={'column'}>

            <Personal></Personal>

            <Roleplay></Roleplay>
            
            <Active></Active>
            
            <Relationship></Relationship>

            <Playedcom></Playedcom>
            
            <Condition></Condition>
        </Flex>
    )
}

