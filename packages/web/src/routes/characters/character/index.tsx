import { useQuery } from "@tanstack/react-query";
import { Box, Text, Image, useColorModeValue, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function Character() {
  const params = useParams<{ id: string }>();
  const { data, status } = useQuery<any>([`/characters?id=${params.id}`]);
  const isLoading = status === "loading";
  const error = status === "error";

  let character = null;
  if (data && data.data && data.data.length > 0) {
    character = data.data[0];
  }

  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <Flex>
            <Box>
              <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4}>
                {character.name}
              </Text>
              <Text py={1}>
                {character.species} {character.gender}
              </Text>
              <Text py={1}>
                Born: {character.born ? character.born : "unknown"}
              </Text>
              <Text py={1}>
                Died: {character.died ? character.died : "unknown"}
              </Text>
            </Box>
            <Image
              src={character.image}
              fallbackSrc="https://via.placeholder.com/150"
              mx="auto"
              my={4}
              alt={character.name}
            />
          </Flex>
        </>
      )}
    </Box>
  );
}

export default Character;
