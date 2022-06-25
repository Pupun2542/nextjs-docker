import { Box, Button, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'
import useStaffList from '../../src/hook/useStaffList'
import Staffcard from './staffcard'
import UserSearchInput from './userSearchInput'

const Setting = ({data, gid}) => {
    // console.log(data.staff)
    const { getStaff, addStaff, removeStaff, commitStaffChange, loading } = useStaffList(data.staff, gid);
    

  return (
    <Box bg={"white"} maxW={550}>
        <Box>
            <UserSearchInput onSelect={(v)=>addStaff(v.uid, v)} />
            <Box>
            <Button onClick={commitStaffChange} justifySelf={"end"} disabled={loading}>ยืนยัน</Button>
            {loading&&(<Spinner />)}
            </Box>
            
        </Box>

        {getStaff()?.map((staff)=> (
            <Staffcard detail={staff} role={Object.keys(data.creator).includes(staff.uid)? "owner" : "staff"} onRemove={()=>removeStaff(staff.uid)} />
        ))}
    </Box>
  )
}

export default Setting