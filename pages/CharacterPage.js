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
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { Columns, Eye, Rows, Table } from "phosphor-react";
import CustomNavbar from "../components/navbar";

export const Characterpage = ({ }) => {
  const [ToggleGridView, setToggleGridView] = useState(false);

  const SwitchGrid = () => setToggleGridView(ToggleGridView => !ToggleGridView);
  return (
    <Box bg={'#F3F5F8'} h={'100vh'}>
      <CustomNavbar />
      <Flex
        px={20}
        w={'100%'}
        fontFamily={'SarabunSB'}
        justifyContent={'center'}
        pt={55}
        direction={ToggleGridView ? "row" : "column"}
      >


        <Flex w={'100%'} direction={'column'} boxShadow={'base'} bg={'white'} px={'50px'}>
          <Flex
            bg={'#6768AB'}
            px={1}
            py={3}
            fontSize={25}
            color={'white'}
            fontWeight='extrabold'
          >
            <Center w={'95%'} ml={'5%'}>Gallery</Center>
            <Center w={'5%'}>
              <IconButton
                rounded={'full'}
                icon={ToggleGridView ? <Rows size={'25px'} /> : <Columns size={'25px'} />}
                onClick={SwitchGrid}
                bg={'#FFC75A'}
                color={'black'}
                borderColor={'black'}
                borderWidth={2}
              />
            </Center>
          </Flex>


        </Flex>

        <Flex w={'100%'} direction={'column'} boxShadow={'base'} bg={'white'} px={'50px'}>
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
      </Flex>
    </Box>
  );
};

export default Characterpage;
