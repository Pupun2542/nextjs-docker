import { Box, Flex, VStack, Text, Container, } from "@chakra-ui/react";
import CustomNavbar from "../components/navbar";
import Footer from "../components/footer";
import React from 'react'


export default function policy() {

    return (
        <Box bg={'#F3F3F3'}>
            <CustomNavbar />

            <Flex justifyContent={'center'} fontFamily={'Mitr'}>
                <Flex bg={'#FFFFFF'} pt={55} minH={950} w={1000} boxShadow={'base'}>
                    <VStack w={'100%'} p={5} bg={'@F3F3F3'}>
                        <Box w={'100%'}>
                            <Text fontSize={28} fontWeight={'bold'} ml={5} w={'100%'}>Privacy Policy</Text>
                            <Text fontSize={20} pl={10} w={'100%'}>นโยบายความเป็นส่วนตัว</Text>
                            <Text fontSize={20} pl={10} w={'100%'}>Comuthor</Text>
                        </Box>

                        <Container w={'100%'}>
                            นับแต่นี้ต่อไป ทาง Comuthor.com หรือ [เรา] จะอธิบายเกี่ยวกับนโยบายความเป้นส่วนตัวบนเว็บไซต์กับ
                            คุณหรือผู้ใช้งาน ทั้งนี้เพื่อความปลอดภัยตามนโยบาย
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>ข้อมูลอะไรบ้างที่เราเก็บรวบรวม</Text>

                        <Container>1. เราเก็บรวบรวมข้อมูลเกี่ยวกับคุณ กรณีที่มีการลงทะเบียนผ่าน Facebook และ Google Gmail
                            ประกอบไปด้วย รูปภาพประจำตัว ที่อยู่อีเมล ชื่อผู้ใช้ และวิธีการลงทะเบียนของคุณบนเว็บไซต์ เพื่อสร้าง
                            บัญชีผู้ใช้ของ Comuthor.com  อีเมลมีไว้เพื่อแจ้งข่าวสารและติดต่อระหว่างเราและคุณ รวมถึงกรณีการ
                            เปลี่ยนรหัสผ่านและอื่นๆที่ใกล้เคียงกัน ส่วนรูปประจำตัวและชื่อผู้ใช้จะถูกใช้เพื่อแสดงผลบนเว็บไซต์ของเรา
                            เท่านั้น
                        </Container>
                        <Container pl={20}>a. Comuthor.com ไม่มีนโยบายเปิดเผยข้อมูลของคุณเพื่อจุดประสงค์อื่นนอกจากการสร้าง
                            และใช้งานบัญชีผู้ใช้บนเว็บไซต์และข้อมูลของคุณจะถูกรักษาความปลอดภัยอยู่ภายใต้นโยบายความปลอดภัยทางไซเบอร์
                            ของรัฐบาลไทย และ PDPA</Container>

                        <Text fontSize={20} pl={10} w={'100%'}>คุกกี้ (Cookies)</Text>

                        <Container>
                            เราใช้คุกกี้และเทคโนโลยีใกล้เคียงกันเพื่อพัฒนาเว็บไซต์และบันทึกข้อมูลของคุณเมื่อคุณกลับมาบนเว็บไซต์
                            ของเราอีกครั้ง คุกกี้เป็นไฟล์ข้อมูลตัวอักษรจะถูกจัดเก็บบนเครื่องของคุณและอ่านได้ด้วยเว็บไซต์ มีความจำเป็น
                            เพื่อให้เว็บไซต์รันได้อย่างสมบูรณ์และอำนวยความสะดวกแก่คุณในการเข้าชมเว็บไซน์ ทั้งการจดจำชื่อผู้ใช้ ภาษาที่ใช้
                            กล่าวคือ คุณไม่จำเป็นต้องกรอกชื่อผู้ใช้หรือข้อมูลบางอย่างทุกครั้งที่เยี่ยมชมเว็บไซต์ของเรา

                            คุกกี้เป็นข้อมูลที่ไม่เก็บรวบรวมข้อมูลที่ระบุตัวตนของคุณ ข้อมูลทั้งหมดที่คุกกี้เหล่านี้เก็บรวบรวมจะนำมารวมเข้าด้วยกัน
                            ดังนั้นจึงไม่สามารถระบุตัวตนของผู้ใดได้ เมื่อมีการเข้าใช้บริการ Comuthor.com อย่างต่อเนื่องโดยไม่มี
                            การเปลี่ยนแปลงการตั้งค่าบนอินเทอร์เน็ตเบราว์เซอร์ อุปกรณ์ของผู้เข้าใช้จะยอมรับคุกกี้โดยอัตโนมัติ ซึ่งหากผู้ใช้
                            ไม่ต้องการให้คุกกี้ทำการรวบรวมข้อมูล ก็สามารถจัดการหรือลบคุกกี้ได้ตามต้องการตามแต่ละวิธีการลบของแต่ละเบราว์เซอร์
                        </Container>

                        <Container>คุกกี้เป็นข้อมูลที่ไม่เก็บรวบรวมข้อมูลที่ระบุตัวตนของคุณ ข้อมูลทั้งหมดที่คุกกี้เหล่านี้เก็บรวบรวมจะนำมารวมเข้าด้วยกัน
                            ดังนั้นจึงไม่สามารถระบุตัวตนของผู้ใดได้ เมื่อมีการเข้าใช้บริการ Comuthor.com อย่างต่อเนื่องโดยไม่มี
                            การเปลี่ยนแปลงการตั้งค่าบนอินเทอร์เน็ตเบราว์เซอร์ อุปกรณ์ของผู้เข้าใช้จะยอมรับคุกกี้โดยอัตโนมัติ ซึ่งหากผู้ใช้
                            ไม่ต้องการให้คุกกี้ทำการรวบรวมข้อมูล ก็สามารถจัดการหรือลบคุกกี้ได้ตามต้องการตามแต่ละวิธีการลบของแต่ละเบราว์เซอร์</Container>

                        <Text fontSize={20} pl={10} w={'100%'}>เราใช้คุกกี้เพื่ออะไร</Text>

                        <Container>
                            เพื่อเก็บข้อมูลการเข้าสู่ระบบเว็บไซต์
                        </Container>

                        <Container>
                            ในเว็บเบราว์เซอร์ส่วนใหญ่ คุณจะสามารถเลือกได้ว่าจะยอมรับคุกกี้หรือไม่ หากคุณปิดการใช้งานคุกกี้ หรือจำกัดความสามารถในการตั้งค่าคุกกี้ คุณอาจไม่สามารถได้รับประโยชน์อย่างเต็มที่จากเว็บไซต์ หรือเข้าถึงทุกฟังก์ชันการใช้งานได้ รวมถึงประสบการณ์การใช้งานโดยรวมของคุณอาจถูกจำกัด
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>วิธีจัดการ Cookies</Text>

                        <Container>
                            คุณสามารถจัดการหรือลบคุกกี้ได้ตามต้องการ สำหรับรายละเอียด โปรดดูที่ AboutCookies.org คุณสามารถล้างคุกกี้ทั้งหมดที่จัดเก็บอยู่บนเครื่องคอมพิวเตอร์ของคุณ รวมทั้งเว็บเบราว์เซอร์ล่าสุดที่มีตัวเลือกในการบล็อกคุกกี้ แต่ในการบล็อกคุกกี้นั้น คุณจะต้องเปลี่ยนการตั้งค่าผู้ใช้งานของคุณทุกครั้งที่คุณเยี่ยมชมเว็บไซต์ของเรา 
                            {/* ดูวิธีการตั้งค่าคุกกี้สำหรับเบราว์เซอร์ของคุณที่นี่: Explorer &gt; Google Chrome &gt; Mozilla Firefox &gt; Safari &gt; Opera */} หากคุณล้างคุกกี้ คุณจำเป็นต้องเปลี่ยนการตั้งค่าของคุณเมื่อเยี่ยมชมเว็บไซต์ของ Comuthor.com ในครั้งถัดไป โปรดทราบว่าบริการบางอย่างของ Comuthor.com จำเป็นต้องมีการใช้คุกกี้ การปิดใช้งานคุกกี้อาจส่งผลต่อการใช้งานฟังก์ชันบางอย่างหรือทั้งหมดของบริการเหล่านี้
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>เราใช้ข้อมูลที่เราเก็บรวบรวมอย่างไร</Text>

                        <Container>1. ข้อมูลส่วนตัวที่เราเก็บ ถูกใช้เพื่อแสดงผลบนเว็บไซต์ขั้นต้นเท่านั้น คุณสามารถเปลี่ยนข้อมูลที่แสดงผลบนเว็บไซต์ของเราโดยไม่กระทบต่อข้อมูลภายนอก</Container>
                        <Container>2. หากคุณไม่ให้ข้อมูลของคุณกับเรา เราอาจไม่สามารถอำนวยความสะดวก หรือให้บริการของเราบางส่วน หรือทั้งหมดแก่คุณได้</Container>

                        <Text fontSize={20} pl={10} w={'100%'}>เราแบ่งปันข้อมูลกับผู้อื่นอย่างไร</Text>

                        <Container>เราอาจเปิดเผย และ/หรือ โอนข้อมูลของคุณให้กับบุคคลดังต่อไปนี้ซึ่งอยู่ในประเทศไทย และ/หรือต่างประเทศ ซึ่งประเทศเหล่านั้นอาจมี หรือไม่มีมาตรการคุ้มครองข้อมูลที่เพียงพอคล้ายคลึงกับมาตรการคุ้มครองข้อมูลของประเทศไทย</Container>
                        <Container pl={20}>1. รัฐบาล หรือหน่วยงานของรัฐ หรือหน่วยงานบังคับใช้กฎหมาย ทั้งภายในและต่างประเทศ เพื่อประโยชน์ในการสืบสวน หรือดำเนินการของศาลยุติธรรม เพื่อปกป้องผลประโยชน์ของบุคคล ตามประมวลกฎหมายแพ่งและพาณิชย์ ประมวลกฎหมายอาญา หรือกฎหมายอื่นที่เกี่ยวข้อง</Container>

                        <Text fontSize={20} pl={10} w={'100%'}>เราเก็บรวบรวมข้อมูลของคุณไว้นานแค่ไหน</Text>

                        <Container>
                            เราจะเก็บข้อมูลส่วนตัวของคุณไว้จนกว่าคุณจะแจ้งขอลบชื่อผู้ใช้กับเรา
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            การวิเคราะห์ข้อมูลของบุคคลภายนอก
                        </Text>

                        <Container>
                            เราอาจใช้อุปกรณ์ หรือแอปพลิเคชันอัตโนมัติ ซึ่งรวมถึงอุปกรณ์ และแอปพลิเคชันที่บุคคลภายนอกได้นำเสนอเพื่อประเมินคุณภาพการใช้บริการของเรา โดยเราอาจใช้วิธีการวิเคราะห์อื่นเพื่อประเมินคุณภาพการบริการของเรา ทั้งนี้ เราได้ใช้เครื่องมือเหล่านี้เพื่อช่วยปรับปรุงบริการ ประสิทธิภาพการทำงาน และประสบการณ์ของผู้ใช้ในบริการของเรา โดยข้อมูลที่เก็บรวบรวมอาจรวมถึง หมายเลขประจำเครื่อง ผู้ผลิตและระบบปฏิบัติการ เลขที่อยู่ไอพี หมายเลขเฉพาะที่ใช้อ้างถึงอุปกรณ์ที่ต่อกับเครือข่าย ตำแหน่ง ประเภทของเบราว์เซอร์ เวลาที่เริ่ม/หยุดการใช้งาน และความเคลื่อนไหวของผู้ใช้
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            การเชื่อมโยงไปยังบุคคลภายนอก
                        </Text>

                        <Container>
                            บริการของเราอาจมีการเชื่อมโยงไปยังเว็บไซต์ของบุคคลภายนอก โดยการเข้าถึงและใช้งานเว็บไซต์ของบุคคลภายนอกที่ถูกเชื่อมโยงไปนั้นไม่ถูกควบคุมกำกับโดยนโยบายความเป็นส่วนตัวนี้ แต่ถูกควบคุมกำกับโดยนโยบายความเป็นส่วนตัวของเว็บไซต์ของบุคคลภายนอกนั้นแทน
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            สิทธิของคุณ
                        </Text>

                        <Container>
                            ภายใต้บังคับของกฎหมายที่เกี่ยวข้อง คุณอาจมีสิทธิในข้อมูลส่วนบุคคลของคุณ ดังต่อไปนี้
                        </Container>
                        <Container pl={20}>
                            1. คุณมีสิทธิที่จะถอนความยินยอมสำหรับการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณที่ได้เคยให้ความยินยอมไว้ได้ไม่ว่าในเวลาใด อย่างไรก็ตาม หากคุณถอนความยินยอมของคุณ เราอาจไม่สามารถอำนวยความสะดวก ติดต่อสื่อสาร หรือให้บริการบางส่วนหรือทั้งหมดแก่คุณได้
                        </Container>
                        <Container pl={20}>
                            2. คุณสามารถร้องขอให้เราแก้ไขข้อมูลส่วนบุคคลของคุณให้ถูกต้อง เป็นปัจจุบัน ครบถ้วน และไม่ทำให้เกิดการเข้าใจผิด หรือเพื่อเปิดเผยการได้มาซึ่งข้อมูลส่วนบุคคลของคุณโดยไม่ได้รับความยินยอมจากคุณ
                        </Container>
                        <Container pl={20}>
                            3. คุณมีสิทธิที่จะร้องขอให้เราให้ข้อมูลส่วนบุคคลของคุณ หรือส่งข้อมูลส่วนบุคคลของคุณนั้นไปยังองค์กรอื่น
                        </Container>

                        <Container pl={20}>
                            4. คุณมีสิทธิที่จะคัดค้าน หรือยับยั้งไม่ให้เราเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูลส่วนบุคคลของคุณในบางกรณี
                        </Container>
                        <Container pl={20}>
                            5. คุณมีสิทธิที่จะร้องขอให้เราลบ หรือทำลาย หรือทำให้ข้อมูลส่วนบุคคลของคุณไม่สามารถระบุตัวตนได้ในบางกรณี ตามกฎหมายที่เกี่ยวข้อง
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            นโยบายข้อมูลส่วนบุคคล
                        </Text>

                        <Container>
                            1. เว็บไซต์จะจัดเก็บข้อมูลของผู้ใช้งานเพื่อการยืนยันตัวตนภายในตัวเว็บไซต์เท่านั้น และจะไม่มีการเปิดเผยข้อมูลส่งต่อเพื่อประกอบผลประโยชน์ภายนอกเว็บไซต์
                        </Container>
                        <Container>
                            นโยบายการใช้งานผ่านเว็บไซต์ comuthor
                        </Container>
                        <Container>
                            การเก็บสถิติการใช้งาน / ลิขสิทธิ์เป็นของผู้สร้างสรรค์ผลงาน
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            สิทธิในการขอแก้ไข
                        </Text>

                        <Container>
                            ท่านมีสิทธิที่จะร้องขอให้ลบข้อมูลส่วนบุคคลและดำเนินการแก้ไข ในทุกกรณีสำหรับข้อมูลของคุณเอง
                        </Container>

                        <Text fontSize={20} pl={10} w={'100%'}>
                            เกี่ยวกับเงินบริจาค
                        </Text>

                        <Container>
                            เงินสนับสนุนจากผู้สนับสนุนทุกท่าน จะถูกนำไปเป็นค่าใช้จ่ายด้านการพัฒนาเว็บไซต์ การเช่าโดเมนและโฮสติ้ง หากท่านใดประสงค์ช่วยเหลือ สามารถสนับสนุนได้ทางช่องทางดังกล่าว
                        </Container>

                        <Container>
                            เว็บทางเราอาจจะยังไม่มีระบบแอปบนมือถือ เนื่องจากต้องเช็คประชากรและเงินทุนเพื่อการลงทุนซึ่งค่าใช้จ่ายยังค่อนข้างสูงสำหรับทีมพัฒนาของเรา แต่อาจมีหากเป็นไปได้ในอนาคต
                        </Container>

                        <Box w={'100%'}>
                            <Text fontSize={20} pl={10} w={'100%'}>
                                รายละเอียดการติดต่อ
                            </Text>
                            <Text pl={20}>Email: <a href="mailto:comuthor@gmail.com">comuthor@gmail.com</a></Text>
                            <Text pl={20}>Facebook: <a target="_blank" href="https://www.facebook.com/ComuthorCorp/">https://www.facebook.com/ComuthorCorp/</a></Text>
                            <Text pl={20}>Discord: <a target="_blank" href="https://discord.gg/BVrwyCPEHc/">https://discord.gg/BVrwyCPEHc/</a></Text>

                        </Box>
                    </VStack>
                </Flex>
            </Flex>

            <Footer />

        </Box>
    )
}