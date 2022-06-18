import React, { useEffect, useState } from "react";
import { Box, Flex, Avatar, VStack, Text } from "@chakra-ui/react";
import { useApp, useGroupHeader, useUser } from "../src/hook/local";
import { useRouter } from "next/router";

const Notitab = ({ notidata }) => {
    const { auth } = useApp()
  const getHeader = useGroupHeader();
  const getUser = useUser();
  const [newNotiData, setNewNotiData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const mappedData = async () => {
      let userdetail = [];
      let groupdetail = [];
      notidata.map((data) => {
        userdetail = [...userdetail, ...data.triggerer];
        if (data.object !== "") {
          userdetail = [...userdetail, ...data.object];
        }
        groupdetail = [...groupdetail, data.group];
      });
      const uniquser = [...new Set(userdetail)];
      const detaileduser = await getUser(uniquser);
      const uniqgroup = [...new Set(groupdetail)];
      const detailedgroup = await Promise.all(
        uniqgroup.map(async (grp) => {
            if (grp !== "") {
                return await getHeader(grp);
            } else {
                return;
            }
            
        })
      );
      console.log(detaileduser, detailedgroup);
      const mappedNotiData = [];
      notidata.map((data)=>{
        const group = detailedgroup.find((v)=> v?.gid === data.group);
        const triggerer = detaileduser.find((v)=> data.triggerer[data.triggerer.length-1] === v?.uid)
        const other = (data.triggerer.length-1)
        const object = detaileduser.find((v)=> data.object === v?.uid)
        mappedNotiData = [
            ...mappedNotiData, 
            {
                ...data, 
                group: group,
                triggerer: triggerer,
                message: notimessage(data.notitype, group, object, triggerer, other),
                time: caltime(data.timestamp),
                path: (data.path.startsWith("/")? data.path : "/"+data.path)
            }]
      })
      setNewNotiData(mappedNotiData);
    };
    mappedData();
  }, [notidata]);

  const notimessage = (type, group, object, triggerer, other) => {
    if (type === "002") {
        return `${group.name} มีการอัพเดตรายละเอียดกลุ่ม`
    } else if (type === "003"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้ปักหมุดกลุ่ม ${group.name}`
    } else if (type === "004"){
        return `${triggerer.displayName} ได้กดหัวใจให้กลุ่ม ${group.name}`
    } else if (type === "005"){
        if (!auth.currentUser.uid === object.uid) {
            return `${triggerer.displayName} ได้เพิ่ม ${object.name} เป็นผู้ดูแลกลุ่ม ${group.name}`
        } else {
            return `คุณถูก ${triggerer.displayName} เพิ่มเป็นผู้ดูแลกลุ่ม ${group.name}`
        }
    } else if (type === "006"){
        if (!auth.currentUser.uid === object.uid) {
            return `${triggerer.displayName} ได้ลบ ${object.name} จากการเป็นผู้ดูแลกลุ่ม ${group.name}`
        } else {
            return `คุณถูก ${triggerer.displayName} ลบจากการเป็นผู้ดูแลกลุ่ม ${group.name}`
        }
    } else if (type === "007"){
        if (!auth.currentUser.uid === object.uid) {
            return `${triggerer.displayName} ได้เพิ่ม ${object.name} เข้ากลุ่ม ${group.name}`
        } else {
            return `คำขอเข้า ${group.name} ของคุณได้รับการยอมรับแล้ว`
        }
    } else if (type === "008"){
        if (!auth.currentUser.uid === object.uid) {
            return `${triggerer.displayName} ได้ลบ ${object.name} จากกลุ่ม ${group.name}`
        } else {
            return `คุณถูกเชิญออกจาก ${group.name}`
        }
    } else if (type === "009"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ส่งคำขอเข้ากลุ่ม ${group.name}`
    } else if (type === "010"){
        if (!auth.currentUser.uid === object.uid) {
            return `/triggerer/ ได้ปฏิเสธคำขอของ ${object.name} จากกลุ่ม ${group.name}`
        } else {
            return `คำขอเข้าร่วม ${group.name} ของคุณถูกปฏิเสธ`
        }
    } else if (type === "101"){
        return `/triggerer/ ได้สร้างโพสต์ใหม่ในกลุ่ม ${group.name}`
    } else if (type === "102"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้แสดงความคิดเห็นในโพสในกลุ่ม ${group.name}`
    } else if (type === "103"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้ตอบกลับความคิดเห็นในโพสในกลุ่ม ${group.name}`
    } else if (type === "104"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้กดหัวใจให้โพสในกลุ่ม ${group.name}`
    } else if (type === "105"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้กดหัวใจให้คอมเมนต์ในกลุ่ม ${group.name}`
    } else if (type === "106"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้กดหัวใจให้ตอบกลับในกลุ่ม ${group.name}`
    } else if (type === "201"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้แสดงความคิดเห็นให้กลุ่ม ${group.name}`
    } else if (type === "202"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้ตอบกลับความคิดเห็นของกลุ่ม ${group.name}`
    } else if (type === "203"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้กดหัวใจให้ความคิดเห็นของกลุ่ม ${group.name}`
    } else if (type === "204"){
        return `${triggerer.displayName} ${ other > 0? `และคนอื่นๆ อีก ${other} คน` : "" } ได้กดหัวใจให้ตอบกลับของกลุ่ม ${group.name}`
    } 
  }

  const caltime = (timestamp) => {
    // console.log(data.timestamp)
    const now = new Date(Date.now());
    // console.log(data)
    const sentdate = new Date(timestamp);

    // const nowYear = now.getFullYear();
    // const nowMonth = now.getMonth();

    const minusDate = now - sentdate;
    // console.log(now.getFullYear() - sentdate.getFullYear());

    if (
      now.getFullYear() - sentdate.getFullYear() > 0 &&
      Math.floor(minusDate / (30 * 3600 * 1000)) > 30
    ) {
      return now.getFullYear() - sentdate.getFullYear() + " ปี";
    } else if (
      now.getMonth() - sentdate.getMonth() > 0 &&
      Math.floor(minusDate / (30 * 3600 * 1000)) > 30
    ) {
      return now.getMonth() - sentdate.getMonth() + " เดือน";
    } else if (Math.floor(minusDate / (24 * 3600 * 1000)) > 0) {
      return Math.floor(minusDate / (24 * 3600 * 1000)) + " วัน";
    } else if (Math.floor(minusDate / (3600 * 1000)) > 0) {
      return Math.floor(minusDate / (3600 * 1000)) + " ชั่วโมง";
    } else if (Math.floor(minusDate / (60 * 1000)) > 0) {
      return Math.floor(minusDate / (60 * 1000)) + " นาที";
    } else {
      return Math.floor(minusDate / 1000) + " วินาที";
    }
  };

  // const header = await getHeader(notidata.group);

  // console.log(header)

  return (
    <Flex p={2}>
      {newNotiData.map((data) => (
        <Box onClick={()=>router.push(data.path)} cursor="pointer">
          {/* {console.log(data)} */}
          <Avatar size={"lg"} src={data.triggerer.photoURL}></Avatar>
          <VStack pl={2} w={"100%"} float={"left"}>
            <Text w={"100%"}>{data.message}</Text>
            <Text w={"100%"}>{data.time}</Text>
          </VStack>
        </Box>
      ))}
    </Flex>
  );
};

export default Notitab;
