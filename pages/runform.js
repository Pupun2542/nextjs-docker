import { Box, Flex, Button } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { RunFormTemplate } from "../components/commuforms/runForm/runFormTemplate";
import CustomNavbar from "../components/navbar";
import Clock from "react-live-clock";
import axios from "axios";

const Runform = () => {
  const clockref = useRef(null);
  const [internetTime, setInternetTime] = useState(new Date(Date.now()));

  const onSubmit = () => {
    for (let index = 0; index < 5; index++) {
      console.log(clockref.current);
    }
  };

  const getTime = async () => {
    const res = await axios.get(
      "http://worldtimeapi.org/api/timezone/Asia/Bangkok"
    );
    if (res.status === 200) {
      const itt = res.data;
      const itt2 = new Date(itt.datetime);
      const offset = itt2.getTime()-Date.now();
      console.log(offset)
      return offset;
    }
  };

  useEffect(() => {
    const setTime = async () => {
      const offset = await getTime();
      setInterval(async() => {
        setInternetTime(new Date(Date.now()+offset));
      }, [500]);
    };
    setTime()
  }, []);

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
            {internetTime.toTimeString()}
            {/* <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Bangkok'} interval={1000} date={internetTime} onChange={(now)=>{clockref.current = now}} /> */}
            <Button onClick={onSubmit}>submit</Button>
            <RunFormTemplate />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Runform;
