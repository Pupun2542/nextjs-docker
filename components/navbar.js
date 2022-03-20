import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text,
  Spacer
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import style from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import React from "react";
import reactDom from "react-dom";
import { 
  UsersThree,
  Plus,
  House,
  DotsThreeVertical,
 } from "phosphor-react";


const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

function CustomNavbar() {
  const app = getApp();
  const auth = getAuth(app);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const Loadthumbnail = () => {
    const [user, loading, error] = useAuthState(auth);
    if (user) {
      return (
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Center bg='#6768AB' rounded={50}>
              <Center px={0}>
                <Avatar minH={50} minW={50} src={user.photoURL} />
              </Center>
              
              <Center width={"auto"} px={4} >
                <p>{user.displayName}</p>
              </Center>
              
            </Center>

          </MenuButton>
          
          <MenuList alignItems={"center"} >
            <br />

            <Center>
              <Avatar size={"2xl"} src={user.photoURL} />
            </Center> 

            <br />

            <Center>
              <p>{user.displayName}</p>
            </Center>
            
            <br />
            
            <MenuDivider />
            {/* <MenuItem>Your Servers</MenuItem> */}
            <MenuItem>Account Settings</MenuItem>
            <MenuItem onClick={()=>router.push("/logout")}>Logout</MenuItem>
          </MenuList>
        </Menu>
      );
    }
    if (loading) {
      return <div>loading user</div>;
    }
    return (
      
      <Center
        bg={'#FFC75A'}
        rounded={'10'}
      > 
        <Button 
        variant="primary"
        href="/login"
        title="Login"
        color='#6768AB'
        // className={style.bntlogin}
        >
        Login
      </Button>
      </Center>
      
    );
  };

  return (
    <>

      <Box bg='black' h='auto' px={5}>
        
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex align={"center"}>
            <Text className={style.Logonav}>Comuthor</Text>
          </Flex>

          <Spacer />

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2}>

              <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title='Commu'>
                    <Center 
                      bg='#FFC75A'
                      minH={"50"}
                      minW={"50"}
                      rounded={50}
                      >
                      <UsersThree 
                        size={32}
                        color='#6768AB'/>
                    </Center>

                  </MenuButton>

                    <MenuList minWidth={"auto"} ml={-1}>

                      <MenuItem minH="48px" as={"a"} href="/group" title='Main Hall'>
                        <House size={32} /> 
                      </MenuItem>

                      <MenuItem minH="48px" as={"a"} href="/creategroup" title='Create Commu'>
                        <Plus size={32} />
                      </MenuItem>
                      
                    </MenuList>
                

                {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}

                  <Loadthumbnail />

                  <Menu>
                  <MenuButton
                    as={Button}
                    rounded="full"
                    variant="link"
                    cursor="pointer"
                    minW={0}
                    title='Commu'>
                    <Center 
                      bg='#FFC75A'
                      minH={"50"}
                      minW={"50"}
                      rounded={50}
                      >
                    <DotsThreeVertical size={32} color='#6768AB' />

                    </Center>

                  </MenuButton>

                    <MenuList minWidth={"auto"} ml={-1}>

                      <MenuItem minH="48px" as={"a"} href="#" title='Main Hall'>
                        <House size={32} /> 
                      </MenuItem>

                      <MenuItem minH="48px" as={"a"} href="#" title='Create Commu'>
                        <Plus size={32} />
                      </MenuItem>
                      
                    </MenuList>
                  </Menu>
                  
                
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default CustomNavbar