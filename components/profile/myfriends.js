import { Avatar, Box, Button, Flex, IconButton, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { Chat } from "phosphor-react"

export const Myfriends = () => {
    return (
        <Flex direction={'column'}>
            <Box
                fontSize={20}
                ml={10}
            >
                รายชื่อเพื่อนทั้งหมด
            </Box>

            <SimpleGrid p={5} columns={1} spacing={5}>
                <Flex
                    h={'90px'}
                    bg={'white'}
                    p={'5px'}
                    borderRadius={10}
                    boxShadow={'base'}
                    cursor={'pointer'}
                    // คลิกแล้วไปที่หน้าโฟรไฟล์ของแต่ละคนได้
                    _hover={{
                        backgroundColor: 'gray.200'
                    }}
                >
                    <Avatar w={'80px'} h={'80px'}></Avatar>
                    <Flex w={'100%'} direction={'column'}>
                        <Flex w={'100%'} >
                            <Text w={'100%'} fontSize={18} ml={'10px'} mt={'5px'}>Name</Text>
                            <IconButton rounded={'full'} icon={<Chat />} />
                        </Flex>

                        <Text fontSize={16} ml={'10px'} mt={'5px'}>Profile Discription</Text>
                    </Flex>


                </Flex>

            </SimpleGrid>
        </Flex>
    )
} 