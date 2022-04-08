import React, { useEffect, useState } from "react";
import style from "../styles/gamecard.module.css";
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
  WrapItem
} from "@chakra-ui/react";
import { async } from "@firebase/util";

function GameCard() {
  const Router = useRouter();
  const { bws } = Router.query;

  const app = useApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Fetchdata = async () => {
          const q = query(
            collection(db, "game"),
            // orderBy("createAt", "desc")
          );
          const QuerySnapshot = await getDocs(q);
          setGame(
            QuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          );
          setLoading(false);
            // console.log(game.length);
      };
      return Fetchdata();
    
  });

  return (
    <Box>
      {!loading && game.map((value) => {
        return (
          <Flex
          onClick={() => {
            Router.push("/game/" + value.id);
          }}
          className={style.Box}
          _hover={{
            background:"#535353"
          }}
          cursor="pointer"
          >
          <VStack ml={5}>
            <Box
            className={style.roomname}
            color="black"
            maxW={606}
            w={556}
            >
              <Box>
                {value.name}
              </Box>
            </Box>
          </VStack>
          </Flex>
        )
      })}
    </Box>
  )
}

export default GameCard;