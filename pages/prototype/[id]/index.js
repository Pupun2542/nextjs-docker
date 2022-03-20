import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import {useRouter} from 'next/router'

function index() {
    const Router = useRouter()
    const { id } = Router.query
  return (
    <Box onClick={()=>Router.push("/prototype/"+id+"/dashboard")}>
        <Text>Dashboard</Text>
    </Box>
  )
}

export default index