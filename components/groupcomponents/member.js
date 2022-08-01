import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  SimpleGrid,
  VStack,
  Input,
  Divider,
  Center,
  Button,
  Modal,
  ModalOverlay,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AvatarGroup,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { Check, DotsThreeVertical, MagnifyingGlass, X } from "phosphor-react";
import { useState } from "react";
import { useApp } from "../../src/hook/local";
import useCharaList from "../../src/hook/useCharaList";
import useMemberList from "../../src/hook/useMemberList";
import { isEmptyOrSpaces } from "../../src/services/utilsservice";
import Createcharacterform from "../commuforms/createcharacterform";
import Inviteplayerform from "../commuforms/inviteplayerform";
import Updatecharacterform from "../commuforms/updatecharaform";
import Characard from "./characard";

export const Member = ({ data, gid }) => {
  const {
    member,
    pendingMember,
    onAcceptPending,
    onRejectPending,
    onSearch,
    searchResult,
    onInvite,
    onRemoveMember,
  } = useMemberList(data, gid);
  const {
    chara,
    charaSearchResult,
    onSearchChara,
    onAddChara,
    onUpdateChara,
    onRemoveChara,
    getDetailedChara,
  } = useCharaList(data, gid);

  const [searchstr, setSearchstr] = useState("");
  const [searchcharastr, setSearchcharastr] = useState("");
  const [modalTopic, setModalTopic] = useState(0);
  const showncharalist = searchcharastr ? charaSearchResult : chara;
  const { auth } = useApp();
  const [editForm, setEditForm] = useState(null);
  return (
    <Flex direction={"column"}>
      <Tabs isFitted variant="line" mt={-8}>
        <TabList>
          <Tab>Pending</Tab>
          <Tab>Member</Tab>
          <Tab>Character</Tab>
        </TabList>

        <TabPanels>
          {/* Pending Zone */}
          <TabPanel>
            {data?.isStaff && pendingMember.length > 0 && (
              <Accordion allowToggle defaultIndex={1}>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex={1} textAlign={"left"} fontSize={20}>
                        คำขอเข้าร่วมคอมมูนิตี้
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel>
                    {pendingMember.map((mem) => (
                      <Flex
                        bg={"white"}
                        w={"100%"}
                        p={2}
                        borderRadius={10}
                        boxShadow={"base"}
                      >
                        <Avatar src={mem.photoURL} name={mem.displayName} />
                        <Text w={"100%"} pl={2} pt={2.5}>
                          {mem.displayName}
                        </Text>
                        <HStack spacing={1}>
                          <IconButton
                            icon={<Check />}
                            onClick={() => {
                              onAcceptPending(mem.uid);
                            }}
                          />
                          <IconButton
                            icon={<X />}
                            onClick={() => {
                              onRejectPending(mem.uid);
                            }}
                          />
                        </HStack>
                      </Flex>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </TabPanel>

          <TabPanel>
            <Flex>
              <Box ml={"15px"} flex={1} textAlign={"left"} fontSize={20}>
                รายชื่อสมาชิกภายในกลุ่ม
              </Box>

              <Button
                bg="#FFC75A"
                borderRadius={10}
                borderWidth={2}
                borderColor={"black"}
                _hover={{ bg: "#6768AB", textColor: "white" }}
                onClick={() => setModalTopic(1)}
              >
                Invite member
              </Button>
            </Flex>

            <Divider />

            <Box overflowX={"auto"} mt={5} mb={5}>
              <Box
                padding={2}
                bg="blue.300"
                textColor={"white"}
                display="inline-block"
                borderRadius={10}
                cursor={"pointer"}
              >
                All Member
              </Box>
            </Box>

            <Divider />
            <Flex p={1} bg={"white"} rounded={5} boxShadow={"base"}>
              <Center p={1}>
                <MagnifyingGlass size={"28px"} />
              </Center>

              <Input
                width="100%"
                onChange={(e) => {
                  onSearch(e.target.value.trim());
                  setSearchstr(e.target.value.trim());
                }}
                value={searchstr}
                bg="white"
                placeholder="ค้นหาสมาชิกภายในกลุ่ม"
              />
            </Flex>

            <Flex mt={3} justifyContent={"space-between"}>
              <Flex>
                <AvatarGroup size={"md"} mr={2} max={5}>
                  {member.map((mem) => (
                    <Avatar src={mem.photoURL} name={mem.photoURL} size="md" />
                  ))}
                </AvatarGroup>
              </Flex>
            </Flex>

            <SimpleGrid
              p={5}
              spacing={5}
              columns={2}
              maxH={550}
              overflowY="auto"
            >
              {isEmptyOrSpaces(searchstr) &&
                member.map((mem) => (
                  <Flex
                    bg={"white"}
                    p={"5px"}
                    h={"80px"}
                    borderRadius={10}
                    boxShadow={"base"}
                  >
                    <Avatar
                      w={"70px"}
                      h={"70px"}
                      src={mem.photoURL}
                      name={mem.displayName}
                    ></Avatar>
                    <VStack ml={"5px"} mr={"5px"} w={"100%"}>
                      <Box
                        mt={"5px"}
                        fontSize={18}
                        textAlign={"left"}
                        width={"100%"}
                      >
                        {mem.displayName}
                      </Box>
                      {/* <Box
                color={"gray.400"}
                fontSize={14}
                textAlign={"left"}
                width={"100%"}
              >
                {mem.displayName}
              </Box> */}
                      {console.log(data)}
                    </VStack>

                    <Menu>
                      <MenuButton m={2.5} h={5} w={5} borderRadius={100}>
                        <DotsThreeVertical size={20} />
                      </MenuButton>
                      <MenuList>
                        {data?.isStaff && mem.uid !== auth.currentUser.uid && (
                          <Tooltip
                            label="ไม่สามารถเตะเจ้าของโรลได้"
                            shouldWrapChildren
                            isDisabled={
                              !Object.keys(data.creator).includes(mem.uid)
                            }
                          >
                            <MenuItem
                              onClick={() => onRemoveMember(mem.uid)}
                              isDisabled={Object.keys(data.creator).includes(
                                mem.uid
                              )}
                            >
                              Kick
                            </MenuItem>
                          </Tooltip>
                        )}
                        {mem.uid === auth.currentUser.uid && (
                          <Tooltip
                            label="เจ้าของกลุ่มออกกลุ่มไม่ได้"
                            shouldWrapChildren
                            isDisabled={
                              !Object.keys(data.creator).includes(mem.uid)
                            }
                          >
                            <MenuItem
                              onClick={() => onRemoveMember(mem.uid)}
                              isDisabled={Object.keys(data.creator).includes(
                                mem.uid
                              )}
                            >
                              Leave
                            </MenuItem>
                          </Tooltip>
                        )}
                      </MenuList>
                    </Menu>
                  </Flex>
                ))}
              {!isEmptyOrSpaces(searchstr) &&
                searchResult.map((mem, i) => (
                  <Flex
                    bg={"white"}
                    p={"5px"}
                    h={"80px"}
                    borderRadius={10}
                    boxShadow={"base"}
                    key={i}
                  >
                    <Avatar
                      w={"70px"}
                      h={"70px"}
                      src={mem.photoURL}
                      name={mem.displayName}
                    ></Avatar>
                    <VStack ml={"5px"} mr={"5px"} w={"100%"}>
                      <Box
                        mt={"5px"}
                        fontSize={18}
                        textAlign={"left"}
                        width={"100%"}
                      >
                        {mem.displayName}
                      </Box>
                    </VStack>
                    {data?.isStaff && auth.currentUser.uid !== mem.uid && (
                      <Menu>
                        <MenuButton m={2.5} h={10} w={10} borderRadius={100}>
                          <DotsThreeVertical size={30} />
                        </MenuButton>
                        <MenuList>
                          {data?.isStaff && mem.uid !== auth.currentUser.uid && (
                            <Tooltip
                              label="ไม่สามารถเตะเจ้าของโรลได้"
                              shouldWrapChildren
                              isDisabled={
                                !Object.keys(data.creator).includes(mem.uid)
                              }
                            >
                              <MenuItem
                                onClick={() => onRemoveMember(mem.uid)}
                                isDisabled={Object.keys(data.creator).includes(
                                  mem.uid
                                )}
                              >
                                Kick
                              </MenuItem>
                            </Tooltip>
                          )}
                          {mem.uid === auth.currentUser.uid && (
                            <Tooltip
                              label="เจ้าของกลุ่มออกกลุ่มไม่ได้"
                              shouldWrapChildren
                              isDisabled={
                                !Object.keys(data.creator).includes(mem.uid)
                              }
                            >
                              <MenuItem
                                onClick={() => onRemoveMember(mem.uid)}
                                isDisabled={Object.keys(data.creator).includes(
                                  mem.uid
                                )}
                              >
                                Leave
                              </MenuItem>
                            </Tooltip>
                          )}
                        </MenuList>
                      </Menu>
                    )}
                  </Flex>
                ))}
            </SimpleGrid>
          </TabPanel>

          <TabPanel>
            <Flex>
              <Box ml={"15px"} flex={1} textAlign={"left"} fontSize={20}>
                รายชื่อตัวละครภายในกลุ่ม
              </Box>

              <Button
                bg="#FFC75A"
                borderRadius={10}
                borderWidth={2}
                borderColor={"black"}
                _hover={{ bg: "blue", textColor: "white" }}
                onClick={() => setModalTopic(2)}
              >
                Add Character
              </Button>
            </Flex>

            <Divider />

            <Box overflowX={"auto"} mt={5} mb={5}>
              <Box
                padding={2}
                bg="blue.300"
                textColor={"white"}
                display="inline-block"
                borderRadius={10}
                cursor={"pointer"}
              >
                All Character
              </Box>
            </Box>

            <Flex p={1} bg={"white"} rounded={5} boxShadow={"base"}>
              <Center p={1}>
                <MagnifyingGlass size={"28px"} />
              </Center>

              <Input
                width="100%"
                onChange={(e) => {
                  onSearchChara(e.target.value.trim());
                  setSearchcharastr(e.target.value.trim());
                }}
                value={searchcharastr}
                bg="white"
                placeholder="ค้นหาคาร์แรคเตอร์ภายในกลุ่ม"
              />
            </Flex>

            <Flex mt={3} justifyContent={"space-between"}>
              <Flex>
                <AvatarGroup size="md" mr={2} max={5}>
                  {chara.map((mem) => (
                    <Avatar src={mem.photoURL} name={mem.photoURL} size="md" />
                  ))}
                </AvatarGroup>
              </Flex>
            </Flex>
            {showncharalist.map((mem) => (
              <Characard
                data={mem}
                role={
                  mem.parentId === auth.currentUser.uid
                    ? "charaowner"
                    : Object.keys(data.staff).includes(auth.currentUser.uid)
                    ? "staff"
                    : "user"
                }
                onRemove={() => onRemoveChara(mem.refererId)}
                onEdit={() => setEditForm(mem)}
              />
            ))}

            <Modal isOpen={modalTopic > 0} onClose={() => setModalTopic(0)}>
              <ModalOverlay />
              {modalTopic == 1 && (
                <Inviteplayerform
                  onPendingSubmit={onInvite}
                  onClose={() => setModalTopic(0)}
                  checklist={member}
                />
              )}
              {modalTopic == 2 && (
                <Createcharacterform
                  onClose={() => setModalTopic(0)}
                  onSubmit={onAddChara}
                />
              )}
            </Modal>
            <Modal isOpen={editForm} onClose={() => setEditForm(null)}>
              <ModalOverlay />
              <Updatecharacterform
                onClose={() => setEditForm(null)}
                onSubmit={(e) => onUpdateChara(editForm.refererId, e)}
                data={editForm}
              />
            </Modal>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
