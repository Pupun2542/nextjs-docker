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

export const StoryForm = ({ }) => {
  return (
    <VStack mx={'15px'} justifyContent={'center'} direction={'column'}>
      
      {/* ประวัติ */}
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
          ประวัติ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="เนื้อเรื่องของตัวละครและประวัติความเป็นมา" />
        </Box>
      </Flex>

      {/* ทักษะ */}
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
          ทักษะ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="ความสามารถพิเศษ ทักษะที่ถนัด สกิลของตัวละคร" />
        </Box>
      </Flex>

      {/* จุดแข็ง */}
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
          จุดแข็ง
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ความแข็งแกร่ง จุดแข็งของตัวละคร" />
        </Box>
      </Flex>

      {/* จุดอ่อน */}
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
          จุดอ่อน
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ข้อด้อย จุดอ่อนของตัวละคร" />
        </Box>
      </Flex>

      {/* งานอดิเรก */}
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
          งานอดิเรก
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="กิจกรรมยามว่าง งานอดิเรกของตัวละคร" />
        </Box>
      </Flex>

      {/* ลักษณะนิสัย */}
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
          ลักษณะนิสัย
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="นิสัย ลักษณะการพูด ท่าทางตามปกติของตัวละคร" />
        </Box>
      </Flex>

      {/* เป้าหมายชีวิต */}
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
          เป้าหมายชีวิต
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ปณิธาน ความหมายของการมีชีวิต" />
        </Box>
      </Flex>

      {/* อุดมการณ์ */}
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
          อุดมการณ์
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="หลักแนวปฏิบัติเพื่อให้บรรลุเป้าหมาย" />
        </Box>
      </Flex>

      {/* ความลับ */}
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
          ความลับ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ความลับ เรื่องน่าอาย เรื่องที่ปกปิดของตัวละคร" />
        </Box>
      </Flex>

      {/* ความกลัว */}
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
          ความกลัว
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="สิ่งที่กลัว โรคกลัว..." />
        </Box>
      </Flex>

      {/* สิ่งที่ชอบ */}
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
          สิ่งที่ชอบ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="สิ่งที่ชอบ สิ่งที่สบายใจที่จะอยู่ด้วย สิ่งที่เห็นแล้วอุ่นใจ" />
        </Box>
      </Flex>

      {/* สิ่งที่ไม่ชอบ */}
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
          สิ่งที่ไม่ชอบ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="สิ่งที่เห็นแล้วรู้สึกไม่ชอบหรือเกลียด แต่อาจจะไม่ถึงกับกลัว" />
        </Box>
      </Flex>

    </VStack>
  );
};

export default StoryForm;
