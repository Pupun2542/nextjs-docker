import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { RunFormTemplate } from "../components/commuforms/runForm/runFormTemplate";
import CustomNavbar from "../components/navbar";

const Runform = () => {
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
            <RunFormTemplate />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Runform
