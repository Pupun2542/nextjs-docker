import { Avatar, Box, Button, Center, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Staffcard = ({ detail, role, onRemove }) => {
  return (
    <Flex justifyContent={"space-between"} >
      <Flex w={'100%'} bg={'white'} mt={1.5} mb={1.5} rounded={10} pt={3} pb={3} pl={1.5} pr={1.5} boxShadow={'base'}>

        <Box pl={1.5} pr={1.5}>
          <Avatar src={detail.photoURL} height={150} width={150} />
        </Box>

        <Box mt={12} pl={1.5} pr={1.5} w={'100%'}>
          <Text>{detail.displayName}</Text>
          <Text>{role}</Text>
        </Box>

        <Box alignContent={"center"} pl={1.5} pr={1.5}>
          <Button onClick={onRemove} disabled={role == "owner"}>Remove</Button>
        </Box>

      </Flex>
    </Flex>
  )
}

export default Staffcard