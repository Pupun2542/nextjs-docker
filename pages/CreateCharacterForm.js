import React from "react";
import CustomNavbar from "../components/navbar";
import {
    Box,
    Flex,
    Center,
    Container,
    Spacer,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    VStack,
    Input,
    Select,
    CloseButton,
    Switch,
    FormControl,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberDecrementStepper,
    NumberIncrementStepper,
    Textarea,
    Text,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";
import Footer from "../components/footer";


export default function Home() {
    const breakpoints = {
        sm: '30em',
        md: '48em',
        lg: '62em',
        xl: '80em',
        '2xl': '96em',
    }
    return (

        <Box
            bg="#FFFFFF"
            overflowY={"auto"}
            // maxH={'960'}
            maxH={"100vh"}
            css={{
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#727272",
                    borderRadius: "24px",
                },
            }}
        >
            <CustomNavbar />

            <Flex
                justifyContent={'center'}
                w={1000}
                
            >
                
            </Flex>
            <Footer></Footer>
        </Box>
    );
}
