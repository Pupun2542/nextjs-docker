import React, { useState } from "react";
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
  Wrap,
  WrapItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import Footer from "../components/footer";

import {
  Eye,
  EyeClosed
} from "phosphor-react";

export default function Home() {

  const [hiddenState, setHiddenState] = useState({
    name: false,
  })

  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

  return (

    <Box>
      <CustomNavbar />
      <Flex fontFamily={'Sarabun'} bg="#F3F5F8" justifyContent={'center'}>
        <Flex maxW={1000} w={'100%'} bg={'white'} justifyContent={'center'} pt={55}>
          <Flex justifyContent={'center'} bg={'#F3F5F8'} w={'100%'} maxW={900} boxShadow={'base'}>
            <VStack w={'100%'} spacing={0} boxShadow={'base'} >
              <Center
                bg={'#6768AB'}
                w={'100%'}
                py={5}
                fontFamily={'Mitr'}
                fontSize={30}
                color={'white'}
                fontWeight='extrabold'
              >
                Create Character
              </Center>

              <Box fontFamily={'SarabunSB'} fontSize={20} pl={10} py={2} w={'full'}>Picture Gallery</Box>

              <Center
                bg={'tomato'}
                w={'full'}
                h={400}
              >
                Gallery
              </Center>

              <Center
                bg={'#6768AB'}
                w={'100%'}
                py={5}
                fontSize={25}
                color={'white'}
                fontWeight='extrabold'
              >
                Create Character
              </Center>


            </VStack>
          </Flex>
        </Flex>


      </Flex>

      <Footer />
    </Box>

  );
}
