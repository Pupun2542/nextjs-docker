import { Box, Button, Center, Flex, HStack, Spinner, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import React from 'react'
import useStaffList from '../../src/hook/useStaffList'
import Staffcard from './staffcard'
import UserSearchInput from './userSearchInput'

const Setting = ({ data, gid }) => {
  // console.log(data.staff)
  const { getStaff, addStaff, removeStaff, commitStaffChange, loading } = useStaffList(data.staff, gid);


  return (
    <Box>
      <Tabs orientation='vertical'>
        <TabList fontFamily={'SarabunSB'} maxW={'150px'} w={'100%'}>
          <Tab>Admin Setting</Tab>
          <Tab>Two</Tab>
        </TabList>

        <TabPanels>
          {/* initially mounted */}
          <TabPanel>
            <HStack w={'100%'}>
              <UserSearchInput onSelect={(v) => addStaff(v.uid, v)} />

              <Center>
                <Button onClick={commitStaffChange} justifySelf={"end"} bg={'teal'} color={'white'} disabled={loading}>บันทึก</Button>
                {loading && (<Spinner />)}
              </Center>

            </HStack>

            {getStaff()?.map((staff) => (
              <Staffcard detail={staff} role={Object.keys(data.creator).includes(staff.uid) ? "owner" : "staff"} onRemove={() => removeStaff(staff.uid)} />
            ))}
          </TabPanel>
          {/* initially not mounted */}
          <TabPanel>
            <p>two!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </Box>
  )
}

export default Setting