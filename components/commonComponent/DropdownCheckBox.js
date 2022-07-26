import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { X } from "phosphor-react";
import React, { useState } from "react";
import useCharaList from "../../src/hook/useCharaList";

const DropdownCheckBox = ({ data, gid, onSubmit, selected }) => {
  const { charaSearchResult, onSearchChara } = useCharaList(data, gid);
  const [searchcharastr, setSearchcharastr] = useState("");
  const [selectedChara, SetSelectedChara] = useState(selected? selected: []);
  return (
    <Box pos={"relative"}>
      <Input
        width="100%"
        onChange={(e) => {
          onSearchChara(e.target.value.trim());
          setSearchcharastr(e.target.value.trim());
        }}
        value={searchcharastr}
        bg="white"
        placeholder="ชื่อคาร์แรกเตอร์ที่ชอบ"
      />
      <VStack pos={"absolute"} zIndex={100000} bg={"white"} spacing={1}>
        {charaSearchResult.map((chara) => (
          <Flex justifyContent={"space-between"} alignContent={"center"}>
              <Avatar src={chara.photoURL} />
              <Text>{chara.name}</Text>
          </Flex>
        ))}
      </VStack>
      <VStack>
        {selectedChara.map((chara, k) => (
          <Flex justifyContent={"space-between"} key={k}>
            <Box>
              <Avatar src={chara.photoURL} />
              <Text>{chara.name}</Text>
            </Box>
            <Circle bg="red" onClick={()=>SetSelectedChara(selectedChara.filter((v,i)=>i==k))}>
              <X size={16} color={"white"} />
            </Circle>
          </Flex>
        ))}
      </VStack>
      <Button onClick={()=>onSubmit(selectedChara)}>ยืนยัน</Button>
    </Box>
  );
};

export default DropdownCheckBox;
