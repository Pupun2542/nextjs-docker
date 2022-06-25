import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Staffcard = ({detail, role, onRemove}) => {
  return (
    <Flex justifyContent={"space-between"} >
        <Box bg={"white"}>
            <Avatar src={detail.photoURL} height={150} width={150} />
        </Box>
        <Box mt={10}>
            <Text>{detail.displayName}</Text>
            <Text>{role}</Text>
        </Box>
        <Box alignContent={"center"}>
            <Button onClick={onRemove} disabled={role=="owner"}>Remove</Button>
        </Box>
    </Flex>
  )
}

export default Staffcard