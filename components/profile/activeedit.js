import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Spacer,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Center,
  Select,
  Text,
  NumberInput,
  NumberInputField,
  IconButton,
} from "@chakra-ui/react";
import { Check, X } from "phosphor-react";
import useActiveEditState from "../../src/hook/useActiveEditState";

export const EditActive = ({ onFinish, value, onRefresh }) => {
  const initalvalue = {
    front: value && value.front !== undefined && value.front !== null ? value.front : 50,
    back: value && value.back !== undefined && value.back !== null ? value.back : 50,
    time: value?.time ? value.time : 4,
  };
  const { limit, front, setFront, back, setBack, time, setTime, commit } =
    useActiveEditState(initalvalue);

  return (
    <Flex direction={"column"}>
      <Flex fontSize={24} fontWeight={"extrabold"} ml={5}>
        <Text>ความแอคทีฟ</Text>
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
            พื้นที่เล่น
          </Box>

          <Wrap>
            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    หลังไมค์ (แชท)
                  </Center>
                  <Spacer />
                  <NumberInput
                    min={0}
                    max={100}
                    onChange={(e) => setBack(parseInt(e))}
                    value={back}
                  >
                    <NumberInputField
                      fontSize={14}
                      bg={"white"}
                      borderRadius={10}
                      pl={1}
                      pr={1}
                      pt={0.5}
                      pb={0.5}
                      borderWidth={1}
                      borderColor={"#6768AB"}
                      w={39}
                      h={25}
                    />
                  </NumberInput>
                  <Center ml={1}>%</Center>
                </Flex>
              </Center>
            </WrapItem>

            <WrapItem>
              <Center>
                <Flex
                  bg={"#E7E7E7"}
                  borderRadius={10}
                  p={1.5}
                  boxShadow={"base"}
                  w={190}
                >
                  <Center ml={2} mr={2}>
                    หน้าไมค์ (โพสต์)
                  </Center>
                  <Spacer />
                  <NumberInput
                    min={0}
                    max={100}
                    onChange={(e) => setFront(parseInt(e))}
                    value={front}
                  >
                    <NumberInputField
                      fontSize={14}
                      bg={"white"}
                      borderRadius={10}
                      pl={1}
                      pr={1}
                      pt={0.5}
                      pb={0.5}
                      borderWidth={1}
                      borderColor={"#6768AB"}
                      w={39}
                      h={25}
                    />
                  </NumberInput>
                  <Center ml={1}>%</Center>
                </Flex>
              </Center>
            </WrapItem>
          </Wrap>
        </Flex>

        <Flex pl={3} pr={2} w={"100%"}>
          <Box pt={2} h={10} maxWidth={135} w={"100%"}>
            ระยะเวลาตอบ
          </Box>

          <Select
            onChange={(e) => setTime(e.target.value)}
            value={time}
          >
            <option value={4}>ตอบกลับทันที</option>
            <option value={1}>ตอบกลับตามความสะดวกของตนเอง</option>
            <option value={2}>ตอบกลับภายใน 1 - 2 ชั่วโมง</option>
            <option value={3}>ตอบกลับภายใน 3 - 6 ชั่วโมง</option>
          </Select>
        </Flex>
      </VStack>
    </Flex>
  );
};
