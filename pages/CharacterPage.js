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
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Spacer,
} from "@chakra-ui/react";
import { Eye } from "phosphor-react";
import CustomNavbar from "../components/navbar";

export const Characterpage = ({ }) => {
  return (
    <Box bg={'#F3F5F8'} h={'100vh'}>
      <CustomNavbar />
      <Flex px={20} w={'100%'} fontFamily={'SarabunSB'} justifyContent={'center'} pt={55}>
        <Flex mr={2} w={'100%'} direction={'column'} boxShadow={'base'} bg={'white'} px={'50px'}>
          <Center
            bg={'#6768AB'}
            w={'100%'}
            py={3}
            fontSize={25}
            color={'white'}
            fontWeight='extrabold'
          >
            Information
          </Center>

          <Tabs isFitted w={'100%'} variant='unstyled'>
            <TabList m={2}>
              <Tab
                borderRadius={5}
                _selected={{
                  color: 'white',
                  bg: '#9A9AB0'
                }}
              >
                Basic Information
              </Tab>
              <Tab
                borderRadius={5}
                _selected={{
                  color: 'white',
                  bg: '#9A9AB0'
                }}
              >
                Appearance
              </Tab>
              <Tab
                borderRadius={5}
                _selected={{
                  color: 'white',
                  bg: '#9A9AB0'
                }}
              >
                Story and Information
              </Tab>

              <Tab
                borderRadius={5}
                _selected={{
                  color: 'white',
                  bg: '#9A9AB0'
                }}
              >
                Other Information
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* <InforForm /> */}
              </TabPanel>

              <TabPanel>
                {/* <AppearanceForm /> */}
              </TabPanel>

              <TabPanel>
                {/* <StoryForm /> */}
              </TabPanel>

              <TabPanel>
                {/* <OtherForm /> */}
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Flex px={10} py={5} w={'100%'}>
            <Button bg={'#FFC75A'} borderWidth={2} borderColor={'black'}>ยกเลิก</Button>
            <Spacer />
            <Button bg={'#FFC75A'} borderWidth={2} borderColor={'black'}>บันทึกและเผยแพร่</Button>
          </Flex>
        </Flex>

        <Flex ml={2} w={'100%'} direction={'column'} boxShadow={'base'} bg={'white'} px={'50px'}>
          <Center
            bg={'#6768AB'}
            w={'100%'}
            py={3}
            fontSize={25}
            color={'white'}
            fontWeight='extrabold'
          >
            Information
          </Center>

          
        </Flex>
      </Flex>
    </Box>
  );
};

export default Characterpage;
