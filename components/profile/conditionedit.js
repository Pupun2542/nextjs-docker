import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  Input,
  RadioGroup,
  Stack,
  Radio,
  SimpleGrid,
  Text,
  HStack,
  Checkbox,
  IconButton,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Check, X } from "phosphor-react";
import useConditionEditState from "../../src/hook/useConditionEditState";

export const Editcondition = ({ value, onFinish, onRefresh }) => {
  const initalvalue = {
    doit: value?.doit ? value.doit : "",
    dontit: value?.dontit ? value.dontit : "",
    phobia: value?.phobia ? value.phobia : "",
    demand: value?.demand ? value.demand : 1,
    ref: value?.ref ? value.ref : 1,
    condition: value?.condition ? value.condition : [],
    othercondition: value?.othercondition ? value.othercondition : "",
  };
  const {
    doit,
    setDoit,
    dontit,
    setDontit,
    phobia,
    setPhobia,
    demand,
    setDemand,
    ref,
    setRef,
    condition,
    setCondition,
    othercondition,
    setOthercondition,
    commit,
  } = useConditionEditState(initalvalue);

  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>เงื่อนไข</Text>
        <Spacer />
        <HStack>
          <IconButton
            icon={<Check />}
            onClick={async () => {
              await commit();
              onRefresh();
              onFinish();
            }}
          />
          <IconButton
            icon={<X />}
            onClick={() => {
              onFinish();
              // setEditDisplayName("");
            }}
          />
        </HStack>
      </Flex>

      <VStack
        bg={"white"}
        width={"100%"}
        borderRadius={10}
        boxShadow={"base"}
        p={3}
        mt={2}
        mb={2}
      >
        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            สิ่งที่ทำได้
          </Box>

          <Input
            placeholder="กรอกข้อมูลตรงนี้"
            value={doit}
            onChange={(e) => setDoit(e.target.value)}
          />
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            สิ่งที่ไม่ควรทำ
          </Box>

          <Input
            placeholder="กรอกข้อมูลตรงนี้"
            value={dontit}
            onChange={(e) => setDontit(e.target.value)}
          />
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            โฟเบีย
          </Box>

          <Input
            placeholder="กรอกข้อมูลตรงนี้"
            value={phobia}
            onChange={(e) => setPhobia(e.target.value)}
          />
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            การทวงโรล
          </Box>

          <RadioGroup
            pt={2}
            w={"100%"}
            value={demand}
            onChange={(e) => setDemand(e)}
          >
            <Stack direction="row">
              <Radio value="1" colorScheme="purple">
                สะดวกใจ
              </Radio>
              <Radio value="2" colorScheme="purple">
                ไม่สะดวกใจ
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            การอ้างอิงตัวละคร
          </Box>

          <RadioGroup pt={2} w={"100%"} value={ref} onChange={(e) => setRef(e)}>
            <Stack direction="row">
              <Radio value="1" colorScheme="purple">
                สะดวกใจ
              </Radio>
              <Radio value="2" colorScheme="purple">
                ขออนุญาตก่อน
              </Radio>
              <Radio value="3" colorScheme="purple">
                ไม่สะดวกใจ
              </Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          {/* dafaq? */}
          <Box
            pt={2}
            h={10}
            maxWidth={135}
            w={"100%"}
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            เงื่อนไขการมีปฏิสัมพันธ์
          </Box>

          <Flex float={"left"} pt={2} w={"100%"}>
            <CheckboxGroup defaultValue={condition} onChange={(e)=>setCondition(e)} colorScheme={"purple"}>
              <SimpleGrid columns={2}>
                <Checkbox value="1">
                  ต้องการให้แจ้งก่อนโดยตรง
                </Checkbox>
                <Checkbox value="2">
                  ไม่ต้องการเปิดเผยความสัมพันธ์หน้าไมค์
                </Checkbox>
                <Checkbox value="3">
                  สามารถปล่อยตามสถานการณ์
                </Checkbox>
                <Checkbox value="4">
                  ไม่ใช้คำหยาบคาย
                </Checkbox>
                <Checkbox value="5">
                  ไม่รับเจ้าของตัวละครที่เป็นเพศชาย
                </Checkbox>
                <Checkbox value="6">
                  ไม่รับเจ้าของตัวละครที่เป็นเพศหญิง
                </Checkbox>
              </SimpleGrid>
            </CheckboxGroup>
          </Flex>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            เงื่อนไขอื่น ๆ
          </Box>

          <Input
            placeholder="กรอกข้อมูลตรงนี้"
            value={othercondition}
            onChange={(e) => setOthercondition(e.target.value)}
          />
        </Flex>
      </VStack>
    </Flex>
  );
};
