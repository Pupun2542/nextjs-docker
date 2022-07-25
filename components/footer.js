import React from 'react'
import { Flex, Box, Center, VStack, Spacer, Divider, HStack } from '@chakra-ui/react'
import { FacebookLogo, DiscordLogo, TwitterLogo } from 'phosphor-react'
import { useRouter } from "next/router";


function Footer() {

  const router = useRouter();

  return (
    <Center
      bg={'#343434'}
      h={180}
      w="100%"
      fontFamily={'Sarabun'}
    >
      <Flex>
        <Center>
          <VStack m={5}>
            <Box color={'#FFFFFF'}>Comuthor © 2022</Box>
            <HStack>
              <a target="_blank" href="https://www.facebook.com/ComuthorCorp">
                <FacebookLogo
                  size={32}
                  weight='fill'
                  color={'#FFFFFF'}
                  as='button'
                  title={'Facebook'}
                />
              </a>
              <a target="_blank" href="https://twitter.com/comuthor">
                <TwitterLogo
                  size={32}
                  weight='fill'
                  color={'#FFFFFF'}
                  as='button'
                />
              </a>

              <a target="_blank" href="https://discord.com/invite/BVrwyCPEHc">
                <DiscordLogo
                  size={32}
                  weight='fill'
                  color={'#FFFFFF'}
                  as='button'
                />
              </a>

            </HStack>
          </VStack>

        </Center>

        <Center height='150px'>
          <Divider orientation='vertical' />
        </Center>

        <Center>
          <VStack m={5} color={'#FFFFFF'}>
            <Box
              as='button'
              onClick={() => router.push("/about")}
            >
              About us
            </Box>
            <Box>Guide</Box>
          </VStack>


        </Center>

        <Center height='150px'>
          <Divider orientation='vertical' />
        </Center>

        <Center>
          <VStack m={5} color={'#FFFFFF'}>
            <Box
              as='button'
              onClick={() => router.push("/policy")}
            >
              Policy
            </Box>
            <Box>Term</Box>
          </VStack>


        </Center>
      </Flex>
    </Center>
  )
}

export default Footer