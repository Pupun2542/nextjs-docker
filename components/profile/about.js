import React, { useEffect, useState } from "react";
import {
    Flex,
    Box,
    Spacer,
    VStack,
    Center,
    Stack,
    TabPanel,
    Editable,
    EditableInput,
    EditablePreview,
    Wrap,
    WrapItem,
    IconButton,
    Radio,
    RadioGroup,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Select,
    Input,
    SimpleGrid,
} from "@chakra-ui/react";
import { Personal } from "./pesonal";
import { Roleplay } from "./roleplay";
import { Active } from "./active";
import { Relationship } from "./relationship";
import { Playedcom } from "./playedcom";
import { Condition } from "./condition";

export const About = () => {
    // const [demand, setDemand] = useState('1')
    const [hiddenState, setHiddenState] = useState({
        othname: false,
        gender: false,
        age: false,
        work: false,
    })

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

