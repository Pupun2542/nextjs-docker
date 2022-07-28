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

export const AppearanceForm = ({ }) => {
  return (
    <VStack mx={'15px'} justifyContent={'center'} direction={'column'}>
      {/* ความสูง น้ำหนัก กรุ๊ปเลือด */}
      <Flex
        direction={{ '2xl': 'row', xl: 'row', lg: 'column', md: 'column', sm: 'column' }}
        maxW={900}
        w={'100%'}
      >
        <Flex
          w={'100%'}
          mb={{ '2xl': 0, xl: 0, lg: 1, md: 1, sm: 1 }}
          mr={{ '2xl': 1, xl: 1, lg: 0, md: 0, sm: 0 }}
        >
          <Box
            p={3}
            maxW={'130px'}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderLeftRadius={5}
          >
            ความสูง
          </Box>
          <Flex
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <NumberInput w={'100%'} min={1}>
              <NumberInputField placeholder="169" borderColor={'black'} />
            </NumberInput>
          </Flex>
        </Flex>

        <Flex
          w={'100%'}
          my={{ '2xl': 0, xl: 0, lg: 1, md: 1, sm: 1 }}
          mx={{ '2xl': 1, xl: 1, lg: 0, md: 0, sm: 0 }}
        >
          <Box
            p={3}
            maxW={'130px'}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderLeftRadius={5}
          >
            น้ำหนัก
          </Box>
          <Flex
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <NumberInput w={'100%'}  min={1}>
              <NumberInputField placeholder={'69'} borderColor={'black'} />
            </NumberInput>
          </Flex>
        </Flex>

        <Flex
          w={'100%'}
          mt={{ '2xl': 0, xl: 0, lg: 1, md: 1, sm: 1 }}
          ml={{ '2xl': 1, xl: 1, lg: 0, md: 0, sm: 0 }}
        >
          <Box
            p={3}
            maxW={'130px'}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderLeftRadius={5}
          >
            กรุ๊ปเลือด
          </Box>
          <Box
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <Input placeholder="A/B/AB/O/etc." />
          </Box>
        </Flex>

      </Flex>

      {/* ลักษณะ */}
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
          ลักษณะ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Textarea placeholder="ลักษณะรูปร่าง การแต่งการของตัวละคร สไตล์การแต่งกาย" />
        </Box>
      </Flex>

      {/* ของที่พก */}
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
          ของที่พก
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ของที่พกตลอดเวลา/อาวุธ/อุปกรณ์" />
        </Box>
      </Flex>

      {/* เครื่องประดับ */}
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
          เครื่องประดับ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="เครื่องแต่งการเพิ่มเติม" />
        </Box>
      </Flex>

      {/* อื่น ๆ */}
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
          อื่น ๆ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ลักษณะทางกายภาพอื่น ๆ" />
        </Box>
      </Flex>

    </VStack>
  );
};

export default AppearanceForm;
