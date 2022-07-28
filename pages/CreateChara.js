import React, { useState } from "react";
import CustomNavbar from "../components/navbar";
import {
  Box,
  Flex,
  Center,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  Spacer,
} from "@chakra-ui/react";
import Footer from "../components/footer";

import {
  Eye,
  EyeClosed
} from "phosphor-react";
import { InforForm } from "../components/character/informationForm";
import { AppearanceForm } from "../components/character/AppearanceForm";
import StoryForm from "../components/character/StoryForm";
import OtherForm from "../components/character/OtherForm";

export default function Home() {

  const [hiddenState, setHiddenState] = useState({
    name: false,
  })

  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

  return (

    <Box>
      <CustomNavbar />
      <Flex fontFamily={'Sarabun'} bg="#F3F5F8" justifyContent={'center'}>
        <Flex maxW={1000} w={'100%'} bg={'white'} boxShadow={'base'} justifyContent={'center'} pt={55}>
          <Flex justifyContent={'center'} bg={'#F3F5F8'} w={'100%'} maxW={900}>
            <VStack w={'100%'} spacing={0} boxShadow={'base'} >
              {/* Box Create Character */}
              <Center
                bg={'#6768AB'}
                w={'100%'}
                py={5}
                // fontFamily={'MitrSB'}
                fontFamily={'Mitr'}
                fontSize={30}
                color={'white'}
                fontWeight='extrabold'
              // textShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
              // __css={{
              //   '-webkit-text-stroke-color': 'black',
              //   '-webkit-text-stroke-width': '2px',
              // }}
              >
                Create Character
              </Center>

              {/* Gallery Zone */}
              <Box fontFamily={'SarabunSB'} fontSize={20} pl={10} py={2} w={'full'}>
                Picture Gallery
              </Box>

              <Center
                bg={'tomato'}
                w={'100%'}
                maxW={950}
                h={400}
                m={5}
              >
                Gallery
              </Center>

              <Center
                bg={'#6768AB'}
                w={'100%'}
                py={5}
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
                      bg: '#6768AB'
                    }}
                  >
                    Basic Information
                  </Tab>
                  <Tab
                    borderRadius={5}
                    _selected={{
                      color: 'white',
                      bg: '#6768AB'
                    }}
                  >
                    Appearance
                  </Tab>
                  <Tab
                    borderRadius={5}
                    _selected={{
                      color: 'white',
                      bg: '#6768AB'
                    }}
                  >
                    Story and Information
                  </Tab>

                  <Tab
                    borderRadius={5}
                    _selected={{
                      color: 'white',
                      bg: '#6768AB'
                    }}
                  >
                    Other Information
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <InforForm />
                  </TabPanel>

                  <TabPanel>
                    <AppearanceForm />
                  </TabPanel>

                  <TabPanel>
                    <StoryForm />
                  </TabPanel>

                  <TabPanel>
                    <OtherForm />
                  </TabPanel>
                </TabPanels>
              </Tabs>

              <Flex px={10} py={5} w={'100%'}>
                <Button bg={'#FFC75A'} borderWidth={2} borderColor={'black'}>ยกเลิก</Button>
                <Spacer />
                <Button bg={'#FFC75A'} borderWidth={2} borderColor={'black'}>บันทึกและเผยแพร่</Button>
              </Flex>
            </VStack>
          </Flex>
        </Flex>


      </Flex>

      <Footer />
    </Box>

  );
}
