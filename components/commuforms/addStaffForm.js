import {Flex, Center, Box, Text, Select, IconButton, Image} from "@chakra-ui/react";
import { Minus, Hash } from "phosphor-react";


export const AddStaffForm = ({item, onChange, onDelete}) =>{
    const setState = (key, value) =>{
        onChange({
            ...item, [key]: value
        })
    }
    return (
        <Flex mt={3}>
              <Center
                w={50}
                h={50}
                rounded={'full'}
                bg={'yellow.200'}
              >
                <Image src={item.photoURL} fallback={(<>{item.displayName.substring(0,1).toUpperCase()}</>)} />
              </Center>

              <Box mt={0} w={'83%'}>
                <Text fontSize={18} w={'100%'} maxW={350} ml='2'>
                  {item.displayName}
                </Text>

                <Flex>
                  {/* <Select variant='filled' h={25} ml={2} w={'25%'} placeholder='Staff'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                  </Select> */}
                  <Text>Staff</Text>

                  <Box p={1} float={'right'} w={'3%'}>
                    <Tooltip float={'right'} hasArrow label={item.uid} bg='gray.300' color='black'>
                      <Hash />
                    </Tooltip>
                  </Box>
                </Flex>

              </Box>

              <IconButton
                rounded={'full'}
                size='xs'
                mt={3.5}
                variant='outline'
                colorScheme='teal'
                icon={<Minus />}
                _hover={{
                  bg: 'red'
                }}
                onClick={onDelete}
              />
            </Flex>
    )
}