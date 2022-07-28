import React from "react";
import {
  Flex,
  Box,
  Text,
  VStack,
  Avatar,
  Button,
  Input,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  IconButton,
  Textarea,
} from "@chakra-ui/react";
import { Eye } from "phosphor-react";

export const OtherForm = ({ }) => {
  return (
    <VStack mx={'15px'} justifyContent={'center'} direction={'column'}>
      {/* สัตว์เลี้ยง */}
      <Flex maxW={900} w={'100%'} >
        <Box
          p={3}
          maxW={'130px'}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderLeftRadius={5}
        >
          สัตว์เลี้ยง
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="ชื่อสัตว์ ประวัติของสัตว์เลี้ยง" />
        </Box>
      </Flex>
      
      {/* พื้นที่อยู่ */}
      <Flex maxW={900} w={'100%'} >
        <Box
          p={3}
          maxW={'130px'}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderLeftRadius={5}
        >
          พื้นที่อยู่
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="พี่ที่อยู่อาศัย ที่พักพิงหลัก สภาพแวดล้อม" />
        </Box>
      </Flex>

      {/* องค์กร */}
      <Flex maxW={900} w={'100%'} >
        <Box
          p={3}
          maxW={'130px'}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderLeftRadius={5}
        >
          องค์กร
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="สถานที่ทำงานหรือที่เกี่ยวข้องด้วย รายได้ของการทำงาน ประวัติของสถานที่หรือองค์กร" />
        </Box>
      </Flex>

      {/* จักรวาล */}
      <Flex maxW={900} w={'100%'} >
        <Box
          p={3}
          maxW={'130px'}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderLeftRadius={5}
        >
          จักรวาล
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="จักรวาลของตัวละคร เช่น โลกความเป็นจริง, โอเมกาเวิร์ส, ชื่อเวิร์ส ฯลฯ" />
        </Box>
      </Flex>

    </VStack>
  );
};

export default OtherForm;
