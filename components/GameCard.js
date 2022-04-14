import React, { useEffect, useState } from "react";
// import style from "../styles/gamecard.module.css";
import { useApp } from "../src/hook/local";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import {
  Box,
  Flex,
  Center,
  VStack,
  Wrap,
  WrapItem,
  Spacer,
  Button,
  Text,
  Heading
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "firebase-admin";

function GameCard() {
    const Router = useRouter();
    // const { bws } = Router.query;

    const app = useApp();
    const db = getFirestore(app);
    const auth = getAuth(app);

    const [ game, setGame ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ user ] = useAuthState(auth)

    useEffect(() => {
        const Fetchdata = async () => {
            const q = query(
                collection(db, "game")
            );
            const QuerySnapshot = await getDocs(q);
            setGame(
                QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
            setLoading(false);
            // console.log(game.length)
        };
        return Fetchdata();
    });

    // function CheckPlayer() {
    //   {!loading && game.map((value) => {
    //     if ( !user )
    //   })}
    // }


    return (
        <Box >
            {!loading && game.map((value) => {
                return (
                  
                  <Box
                    bg={'fdfdfd'}
                    boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    borderRadius={10}
                    marginTop='3'
                    marginBottom='3'
                    padding={2}
                  >
                  <Flex>
                    <Box p="3" mr="400" >
                      <Text> {value.Roomname} </Text>
                    </Box>
                    <Spacer />
                    <Box
                      marginRight={3}
                      marginTop={3}
                    >
                      <Text>  / {value.Number} คน </Text>
                    </Box>
                    <Box>
                      <Button mr="4" 
                        alignItems="center"
                        onClick={() => {
                            Router.push("/game/" + value.id);
                          }}
                          cursor="pointer"
                          borderRadius={10}
                          marginTop={1}
                      >
                        เข้าห้องโลดด
                      </Button>
                    </Box>
                  </Flex>
                  </Box>
                )
            })}
        </Box>
    )
}
export default GameCard;

// {value.Roomname}

// onClick={() => {
//   Router.push("/game/" + value.id);
// }}

//   onClick={() => {
//       Router.push("/game/" + value.id);
//     }}
//     borderRadius={10}
//     variant="outline"
//     borderWidth={2}
//     borderColor={'black'}
//     alignSelf="left"
//     cursor="pointer"
//     _hover={{
//       background:"#c4c4c4"
//     }}
//     p={2}
// >
//     เข้าห้องโลดด
// </Button>