import React, { useState } from "react";
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
  SimpleGrid,
  Spacer,
  Center,
  color,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { DotsThreeVertical } from "phosphor-react";


export const CharactersSection = ({ }) => {
  const router = useRouter();
    

  return (
    <VStack w={'100%'}>

      <Flex w={'100%'} mb={2}>
        <Button
          boxShadow={"base"}
          rounded={5}
          float={'right'}
          as={"button"}
          bg={"#6768AB"}
          borderWidth={2}
          borderColor={'black'}
          color={'white'}
          _hover={{
            backgroundColor: "#FFC75A",
            color: 'black'
          }}
          onClick={() => router.push("/CreateChara")}
        >
          All Character
        </Button>
        <Spacer />
        <Button
          boxShadow={"base"}
          rounded={5}
          float={'right'}
          as={"button"}
          bg={"#FFC75A"}
          borderWidth={2}
          borderColor={'black'}
          color={'black'}
          _hover={{
            backgroundColor: "#6768AB",
            color: "#FFFFFF"
          }}
          onClick={() => router.push("/CreateChara")}
        >
          Create Character
        </Button>
      </Flex>

      <Box w={'100%'}>
        <SimpleGrid px={5} columns={[2, null, 3]} spacing='20px'>
          <Center
            py={5}
            px={2}
            borderWidth={2}
            borderColor={'black'}
            minW={300}
            w={'100%'}
            maxW={'300'}
            boxShadow={'base'}
            rounded={'5'}
            bg='white'
            onClick={() => router.push("/CharacterPage")}
          >
            <VStack w={'100%'} spacing={3}>
              <Flex w={'100%'}>
                <Center w={'100%'}>
                  <Avatar ml={'24px'} borderWidth={2} borderColor={'black'} size={'2xl'} />
                </Center>

                <Box>
                  <IconButton
                    borderWidth={2}
                    borderColor={'black'}
                    size={'md'}
                    rounded={'full'}
                    icon={<DotsThreeVertical weight="bold" size={'20px'} />}
                    bg={'#FFC75A'}
                    _hover={{
                      backgroundColor: "#6768AB",
                      color: 'white'
                    }}
                  />
                </Box>
              </Flex>

              <Text fontFamily={'SarabunSB'} fontSize={18}>Zannesty Cornelios Alanterbus</Text>
              {/* <Text color={'gray.500'}>Community Name</Text> */}
            </VStack>
          </Center>
        </SimpleGrid>
      </Box>

    </VStack>
  );
};

export default CharactersSection;
