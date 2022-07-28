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
} from "@chakra-ui/react";
import { Eye } from "phosphor-react";

export const InforForm = ({ }) => {
  return (
    <VStack mx={'15px'} justifyContent={'center'} direction={'column'}>
      {/* ชื่อ - นามสกุล */}
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
          ชื่อ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ชื่อ-นามสกุล" />
        </Box>
      </Flex>

      {/* ชื่ออื่น ๆ */}
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
          ชื่ออื่น ๆ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ชื่อ - นามสกุลในภาษาอื่น" />
        </Box>
      </Flex>

      {/* ชื่อเล่น */}
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
          ชื่อเล่น
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="ชื่อเล่น หรือ ฉายา" />
        </Box>
      </Flex>

      {/* อายุ และ เพศสภาพ */}
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
            อายุ
          </Box>
          <Box
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <NumberInput min={1}>
              <NumberInputField placeholder="18" borderColor={'black'} />
              <NumberInputStepper>
                <NumberIncrementStepper borderColor={'black'} />
                <NumberDecrementStepper borderColor={'black'} />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>

        <Flex w={'100%'} mt={{ '2xl': 0, xl: 0, lg: 1, md: 1, sm: 1 }} ml={{ '2xl': 1, xl: 1, lg: 0, md: 0, sm: 0 }}>
          <Box
            p={3}
            maxW={'130px'}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderLeftRadius={5}
          >
            เพศ
          </Box>
          <Box
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <Input placeholder="เพศสภาพ" />
          </Box>
        </Flex>

      </Flex>

      {/* สถานที่เกิด */}
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
          สถานที่เกิด
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="สถานที่" />
        </Box>
      </Flex>

      {/* วันเดือนปีเกิด */}
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
            วัน
          </Box>
          <Flex
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <NumberInput w={'100%'} mr={1} min={1} max={31}>
              <NumberInputField placeholder="1" borderColor={'black'} />
              <NumberInputStepper>
                <NumberIncrementStepper borderColor={'black'} />
                <NumberDecrementStepper borderColor={'black'} />
              </NumberInputStepper>
            </NumberInput>
            <IconButton icon={<Eye />} ml={1} />
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
            เดือน
          </Box>
          <Flex
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <Select mr={1} w={'100%'} placeholder='เดือน' borderColor={'black'}>
              <option value='January'>มกราคม</option>
              <option value='February'>กุมภาพันธ์</option>
              <option value='March'>มีนาคม</option>
              <option value='April'>เมษายน</option>
              <option value='May'>พฤษภาคม</option>
              <option value='June'>มิถุนายน</option>
              <option value='July'>กรกฏาคม</option>
              <option value='August'>สิงหาคม</option>
              <option value='September'>กันยายน</option>
              <option value='October'>ตุลาคม</option>
              <option value='November'>พฤศจิกายน</option>
              <option value='December'>ธันวาคม</option>
            </Select>

            <IconButton icon={<Eye />} ml={1} />
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
            ปี
          </Box>
          <Box
            p={1}
            w={'100%'}
            bg={'white'}
            borderWidth={2}
            borderColor={'black'}
            borderRightRadius={5}
          >
            <NumberInput min={1}>
              <NumberInputField placeholder="2022" borderColor={'black'} />
              <NumberInputStepper>
                <NumberIncrementStepper borderColor={'black'} />
                <NumberDecrementStepper borderColor={'black'} />
              </NumberInputStepper>
            </NumberInput>
          </Box>
        </Flex>

      </Flex>

      {/* เชื้อชาติ เผ่าพันธ์ */}
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
          เชื้อชาติ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="เชื้อชาติ - เผ่าพันธ์" />
        </Box>
      </Flex>

      {/* อาชีพ */}
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
          อาชีพ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="อาชีพ/การงาน/ยศ/ตำแหน่ง" />
        </Box>
      </Flex>

      {/* บทพูด */}
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
          บทพูด
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="คำพูดของตัวละคร" />
        </Box>
      </Flex>

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
          คำอธิบายสั้น ๆ
        </Box>
        <Box
          p={1}
          w={'100%'}
          bg={'white'}
          borderWidth={2}
          borderColor={'black'}
          borderRightRadius={5}
        >
          <Input placeholder="อธิบายตัวละคร ในหนึ่งประโยค" />
        </Box>
      </Flex>
    </VStack>
  );
};

export default InforForm;
