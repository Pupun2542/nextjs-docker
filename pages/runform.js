import { Box, Flex, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { RunFormTemplate } from "../components/commuforms/runForm/runFormTemplate";
import CustomNavbar from "../components/navbar";
import Clock from 'react-live-clock';

const Runform = () => {
  const clockref = useRef(null);

  const onSubmit = () => {
    for (let index = 0; index < 5; index++) {
      console.log(clockref.current)
    }
    
  }

  return (
    <Box bg={"#F3F5F8"}>
      <CustomNavbar />

      <Flex justifyContent={"center"}>
        <Flex
          pt={55}
          fontFamily={"Sarabun"}
          justifyContent={"center"}
          boxShadow="base"
          minW={950}
          bg={"white"}
        >
          <Box
            minH={"calc(100vh - 55px)"}
            bg={"#F3F5F8"}
            minW={800}
            maxW={800}
            boxShadow="base"
          >
            <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} interval={1} onChange={(now)=>{clockref.current = now}} />
            <Button onClick={onSubmit}>submit</Button>
            <RunFormTemplate />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Runform
