import { Box, Button, Center, Flex, HStack, Spinner } from '@chakra-ui/react'
import React from 'react'
import useStaffList from '../../src/hook/useStaffList'
import Staffcard from './staffcard'
import UserSearchInput from './userSearchInput'

const Setting = ({ data, gid }) => {
  // console.log(data.staff)
  const { getStaff, addStaff, removeStaff, commitStaffChange, loading } = useStaffList(data.staff, gid);


  return (
    <Box>
      <HStack w={'100%'}>
        <UserSearchInput onSelect={(v) => addStaff(v.uid, v)} />

        <Center>
          <Button onClick={commitStaffChange} justifySelf={"end"} bg={'teal'} color={'white'} disabled={loading}>ยืนยัน</Button>
          {loading && (<Spinner />)}
        </Center>

      </HStack>

      {getStaff()?.map((staff) => (
        <Staffcard detail={staff} role={Object.keys(data.creator).includes(staff.uid) ? "owner" : "staff"} onRemove={() => removeStaff(staff.uid)} />
      ))}
    </Box>
  )
}

export default Setting