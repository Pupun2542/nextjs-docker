import { Box, CloseButton, HStack, Input } from "@chakra-ui/react";


export const Hashtag = ({setState, state, placeholder, speratekey}) => {
    const removeTags = (indexToRemove) => {
      setState([
        ...state.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        setState([...state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={"100%"} h={"auto"} float={"left"}>
        <Box>
          <Box id="tags" mt={1.5} mb={1.5}>
            {state.map((tag, index) => (
              <HStack
                key={index}
                bg={"#6768AB"}
                color="white"
                borderRadius={10}
                pt={1}
                pb={1}
                pl={2}
                pr={2}
                float="left"
                spacing={2.5}
                mr={0.5}
                ml={0.5}
                mt={0.5}
                mb={0.5}
                fontSize={16}
                w={"auto"}
              >
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={"full"}
                  bg="white"
                  color={"black"}
                  h={5}
                  w={5}
                />
              </HStack>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === speratekey ? addTags(event) : null)}
              placeholder={placeholder}
              w={"auto"}
              isDisabled={props.isDisabled}
              // border="hidden"
              maxW={200}
              float="left"
              mr={0.5}
              ml={1}
              mb={2}
              mt={0.5}
              fontSize={16}
              h={31}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  export const SearchHashtag = ({setState, state, placeholder, speratekey}) => {
    const removeTags = (indexToRemove) => {
      setState([
        ...state.filter((_, index) => index !== indexToRemove),
      ]);
    };
    const addTags = (event) => {
      let tag = event.target.value.replace(",", "");
      tag = tag.trim();
      if (tag !== "") {
        setState([...state, tag]);
        event.target.value = "";
      }
    };
    return (
      <Box w={"100%"} h={"auto"} float={"left"}>
        <Box>
          <Box id="tags" mt={1.5} mb={1.5}>
            {state.map((tag, index) => (
              <HStack
                key={index}
                bg={"#6768AB"}
                color="white"
                borderRadius={10}
                pt={1}
                pb={1}
                pl={2}
                pr={2}
                float="left"
                spacing={2.5}
                mr={0.5}
                ml={0.5}
                mt={0.5}
                mb={0.5}
                fontSize={16}
                w={"auto"}
              >
                <Box>{tag}</Box>
                <CloseButton
                  onClick={() => removeTags(index)}
                  rounded={"full"}
                  bg="white"
                  color={"black"}
                  h={5}
                  w={5}
                />
              </HStack>
            ))}
            <Input
              type="text"
              onKeyUp={(event) => (event.key === speratekey ? addTags(event) : null)}
              placeholder={placeholder}
              w={"auto"}
              isDisabled={props.isDisabled}
              // border="hidden"
              maxW={200}
              float="left"
              mr={0.5}
              ml={1}
              mb={2}
              mt={0.5}
              fontSize={16}
              h={31}
            />
          </Box>
        </Box>
      </Box>
    );
  };