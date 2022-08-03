import {
  Box,
  CloseButton,
  HStack,
  Wrap,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useCharaList from "../../src/hook/useCharaList";

const MentionBox = ({ data, id, mention, setMention }) => {
  const { charaSearchResult, onSearchChara } = useCharaList(data, id);
  const [searchstr, setsearchstr] = useState("");

  const removeTags = (indexToRemove) => {
    setMention([...mention.filter((_, index) => index !== indexToRemove)]);
  };
  const onSelectChara = (chara) => {
    setMention([...mention, chara]);
    onSearchChara("");
    setsearchstr("");
  };

  const filteredcharaSearchResult = charaSearchResult.filter(
    (v, i) => !mention.includes(v)
  );

  return (
    <Box w={"100%"} h={"auto"} float={"left"} >
      <Box>
        <Wrap id="tags" mt={1.5} mb={1.5} position={"relative"}>
          {mention.map((chara, index) => (
            <HStack
              key={index}
              bg={"#6768AB"}
              color="white"
              borderRadius={10}
              pt={1}
              pb={1}
              pl={2}
              pr={2}
              float="left"
              spacing={2.5}
              mr={0.5}
              ml={0.5}
              mt={0.5}
              mb={0.5}
              fontSize={16}
              w={"auto"}
            >
              <Box>{chara.name}</Box>
              <CloseButton
                onClick={() => removeTags(index)}
                rounded={"full"}
                bg="white"
                color={"black"}
                h={5}
                w={5}
              />
            </HStack>
          ))}
          <Box position={"relative"}>
            <Input
              onChange={(e) => {
                onSearchChara(e.target.value);
                setsearchstr(e.target.value);
              }}
              value={searchstr}
              type="text"
              placeholder={"เลือกตัวละครที่ต้องการกล่าวถึง"}
              w={"100%"}
              maxW={500}
              float="left"
              fontSize={14}
              h={31}
            />
            <VStack
              position={"absolute"}
              p={1}
              top={"30px"}
              left={'0px'}
              bg={"white"}
              w={'100%'}
              borderRadius={5}
              zIndex={1000}
              display={searchstr ? "initial" : "none"}
            >
              {filteredcharaSearchResult.map((char) => (
                <Box
                  onClick={() => onSelectChara(char)}
                  width={"auto"}
                  borderRadius={5}
                  cursor={"pointer"}
                  p={1}
                  _hover={{
                    bg: '#F3F5F8'
                  }}
                >
                  {char.name}
                </Box>
              ))}
            </VStack>
          </Box>
        </Wrap>
      </Box>
    </Box>
  );
};

export default MentionBox;
