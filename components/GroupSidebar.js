import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import style from "../styles/groupsidebar.module.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useApp } from "../src/hook/local";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Spacer,
  Center,
  Button,
  Text,
  VStack,
  InputRightElement,
  InputGroup,
  background,
} from "@chakra-ui/react";
import { Flag, Handshake, HouseLine, PushPin } from "phosphor-react";

function GroupSidebar() {
  const {app, auth, db} = useApp();
  // const app = useApp();
  // const db = getFirestore(app);
  // const auth = getAuth(app);
  const [commu, setCommu] = useState([]);
  const [loading, setLoading] = useState(true);
  const Router = useRouter();

  const CurrentUser = () => {
    const [user, load, error] = useAuthState(auth);
    useEffect(() => {
      const Fetchdata = async () => {
        if (user) {
          const ref = await getDoc(doc(db, "userDetail", user.uid));

          if (ref.exists()) {
            const pinned = ref.data().PinnedGroup;
            if (pinned) {
              const q = query(
                collection(db, "group"),
                where("__name__", "in", pinned)
              );
              const QuerySnapshot = await getDocs(q);

              setCommu(
                QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
              );
            }
          }

          setLoading(false);
        }
      };
      Fetchdata();
    }, [user]);
    if (user) {
      return (
        <Box w={400}>
          <VStack>
            <Button
              bg="#535353"
              w={400}
              h={50}
              borderLeftRadius={0}
              marginTop={2}
              _hover={{
                color: "Black",
                background: "#CBD5E0",
              }}
            >
              {/* Notification */}
              <Center></Center>

              <Spacer />

              <Center className={style.sideGroup}>Main Hall</Center>

              <Spacer />

              <Center
                h={50}
                w={50}
                bg={"#6768AB"}
                borderRightRadius={6}
                mr={-4}
              >
                <HouseLine size={32} />
              </Center>
            </Button>

            <Button
              bg="#535353"
              w={400}
              h={50}
              borderLeftRadius={0}
              marginTop={0}
              _hover={{
                color: "Black",
                background: "#CBD5E0",
              }}
              isDisabled
            >
              {/* Notification */}
              <Center></Center>

              <Spacer />

              <Center className={style.sideGroup}>Pin</Center>

              <Spacer />

              <Center
                h={50}
                w={50}
                bg={"#6768AB"}
                borderRightRadius={6}
                mr={-4}
              >
                <PushPin size={32} />
              </Center>
            </Button>

            <Button>
              {!loading &&
                commu.map((value, index) => {
                  // console.log(value.id);
                  return (
                    <Flex
                      key={index}
                      bg="#888888"
                      h={10}
                      w={400}
                      borderRightRadius={6}
                      mt={0}
                      mb={0}
                      _hover={{
                        background: "#E2E8F0",
                        color: "black",
                      }}
                    >
                      {/* Display Commu */}
                      <Center></Center>

                      <Spacer />

                      <Link href={"/group/" + value.id}>
                        <Center>
                          <h5 className={style.pin}>{value.Name}</h5>
                        </Center>
                      </Link>

                      <Spacer />
                      {/* Notification */}
                      <Center></Center>
                    </Flex>
                  );
                })}
            </Button>

            <Button
              bg="#535353"
              w={400}
              h={50}
              borderLeftRadius={0}
              marginTop={1}
              _hover={{
                color: "Black",
                background: "#CBD5E0",
              }}
              isDisabled
            >
              {/* Notification */}

              <Center></Center>

              <Spacer />

              <Center className={style.sideGroup}>My Group</Center>
              {/* เพิ่มแถบคอมมูที่เราสร้างขึ้นมาเหมือน Pin */}
              <Spacer />

              <Center
                h={50}
                w={50}
                bg={"#6768AB"}
                borderRightRadius={6}
                mr={-4}
              >
                <Handshake size={32} />
              </Center>
            </Button>
          </VStack>
        </Box>
      );
    }
    return <div></div>;
  };
  return CurrentUser();

  // console.log(commu.length);
}

// function Menu() {
//   return (
//   <VStack>
//     <Button
//         bg="#535353"
//         w={400}
//         h={50}
//         borderLeftRadius={0}
//         marginTop={1}
//         _hover={{
//           color: 'Black',
//           background: "#CBD5E0"
//         }}
//       >
//         {/* Notification */}
//         <Center></Center>

//         <Spacer />

//         <Center className={style.sideGroup}>
//           Main Hall
//         </Center>

//         <Spacer />

//         <Center
//           h={50}
//           w={50}
//           bg={"#6768AB"}
//           borderRightRadius={6}
//           mr={-4}
//         >
//           <HouseLine size={32} />
//         </Center>
//       </Button>

//       <Button
//         bg="#535353"
//         w={400}
//         h={50}
//         borderLeftRadius={0}
//         marginTop={1}
//         _hover={{
//           color: 'Black',
//           background: "#CBD5E0"
//         }}
//         isDisabled
//       >
//         {/* Notification */}
//         <Center></Center>

//         <Spacer />

//         <Center className={style.sideGroup}>
//           Pin
//         </Center>

//         <Spacer />

//         <Center
//           h={50}
//           w={50}
//           bg={"#6768AB"}
//           borderRightRadius={6}
//           mr={-4}
//         >
//           <PushPin size={32} />
//         </Center>
//       </Button>

//       <Button
//         bg="#535353"
//         w={400}
//         h={50}
//         borderLeftRadius={0}
//         marginTop={1}
//         _hover={{
//           color: 'Black',
//           background: "#CBD5E0"
//         }}
//         isDisabled
//       >
//         {/* Notification */}

//         <Center></Center>

//         <Spacer />

//         <Center className={style.sideGroup}>
//           My Group
//         </Center>
//         {/* เพิ่มแถบคอมมูที่เราสร้างขึ้นมาเหมือน Pin */}
//         <Spacer />

//         <Center
//           h={50}
//           w={50}
//           bg={"#6768AB"}
//           borderRightRadius={6}
//           mr={-4}
//         >
//           <Handshake size={32} />
//         </Center>
//       </Button>
//   </VStack>
// );
// }

export default GroupSidebar;
