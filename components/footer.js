import React from 'react'
import {Flex, Box, Center, VStack, Spacer} from '@chakra-ui/react'
import {FacebookLogo, DiscordLogo} from 'phosphor-react'

function Footer() {
  return (
    <Center
          bg={'#343434'}
          h={180}
        >
          <Flex>
            <Center>
              <VStack m={5}>
                <Box fontFamily={'mitr'} color={'#FFFFFF'}>Comuthor © 2022</Box>
                <Flex>
                  <FacebookLogo size={32} color={'#FFFFFF'} />
                  <Spacer w={5} />
                  <DiscordLogo size={32} color={'#FFFFFF'}/>
                </Flex>
              </VStack>

            </Center>

            <Spacer borderRightColor={'#ffffff'} borderWidth={1} h={150} />

            <Center>
              <VStack fontFamily={'Mitr'} m={5} color={'#FFFFFF'}>
                <Box >About us</Box>
                <Box>Guide</Box>
              </VStack>


            </Center>

            <Spacer borderRightColor={'#ffffff'} borderWidth={1} h={150} />

            <Center>
              <VStack m={5} fontFamily={'Mitr'} color={'#FFFFFF'}>
                <Box>Policy</Box>
                <Box>Term</Box>
              </VStack>


            </Center>
          </Flex>
        </Center>
  )
}

export default Footer