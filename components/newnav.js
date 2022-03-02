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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import style from "../styles/navbar.module.css";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

export default function Nav() {
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
            <Avatar size={"sm"} src={user.photoURL} />
          </MenuButton>
          <MenuList alignItems={"center"}>
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
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      );
    }
    if (loading) {
      return <div>loading user</div>;
    }
    return (
      <Button variant="primary" href="/login" className={style.bntlogin}>
        Login
      </Button>
    );
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex align={"center"}>
            <Text
              className={style.NavTextColor}
              color={useColorModeValue("gray.900", "gray.100")}
            >
              Comuthor
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FGroup1616.png?alt=media&token=a07238ec-3d03-4851-88d5-8642111506c0"
                  borderRadius={"full"}
                  boxSize={50}
                />
              </MenuButton>
              <MenuList minWidth={"180px"}>
                <MenuItem minH="48px" as={"a"} href="/group">
                  <Image
                    boxSize="3rem"
                    borderRadius="full"
                    src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FGroup1616.png?alt=media&token=a07238ec-3d03-4851-88d5-8642111506c0"
                    alt="Fluffybuns the destroyer"
                    mr="12px"
                  />
                  <span className={style.normalText}>หาคอมมู</span>
                </MenuItem>
                <MenuItem minH="40px" as={"a"} href="/creategroup">
                  <Image
                    boxSize="3rem"
                    borderRadius="full"
                    src="https://firebasestorage.googleapis.com/v0/b/comuthor-36139.appspot.com/o/resource%2FCreateCommu1616.png?alt=media&token=516e1afb-5447-4c4a-82d3-6fbe6d51a310"
                    alt="Simon the pensive"
                    mr="12px"
                  />
                  <span className={style.normalText}>สร้างคอมมู</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Loadthumbnail />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
