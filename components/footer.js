import React from 'react'
import { Flex, Box, Center, VStack, Spacer, Divider } from '@chakra-ui/react'
import { FacebookLogo, DiscordLogo } from 'phosphor-react'
import { useRouter } from "next/router";


function Footer() {

  const router = useRouter();

  return (
    <Center
      bg={'#343434'}
      h={180}
      w="100%"

    >
      <Flex>
        <Center>
          <VStack m={5}>
            <Box fontFamily={'mitr'} color={'#FFFFFF'}>Comuthor © 2022</Box>
            <Flex>
              <FacebookLogo
                size={32}
                weight='fill'
                color={'#FFFFFF'}
                as='button'
                cursor={"pointer"}
                onClick={() => router.push("https://www.facebook.com/ComuthorCorp")}
              />
              <Spacer w={5} />
              <DiscordLogo
                as='button'
                cursor={"pointer"}
                size={32}
                weight={'fill'}
                color={'#FFFFFF'}
                onClick={() => router.push("https://discord.gg/BVrwyCPEHc")}
              />
            </Flex>
          </VStack>

        </Center>

        <Center height='150px'>
          <Divider orientation='vertical' />
        </Center>

        <Center>
          <VStack fontFamily={'Mitr'} m={5} color={'#FFFFFF'}>
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
          <VStack m={5} fontFamily={'Mitr'} color={'#FFFFFF'}>
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