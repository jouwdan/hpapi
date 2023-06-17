import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

async function fetchCharacters() {
  const res = await fetch('https://hpapi.onrender.com/characters?page=1&size=10');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

export function useCharacters() {
  return useQuery(['characters'], fetchCharacters);
}

function Characters() {
  
  const { data, status } = useCharacters();
  const isLoading = status === 'loading';
  const error = status === 'error';


  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
            <SimpleGrid columns={3} spacing={4}>
              {data.data.map((character: any) => (
                <Box role={'group'}
                  p={6}
                  maxW={'330px'}
                  w={'full'}
                  bg={bgColor}
                  boxShadow={'sm'}
                  rounded={'lg'}
                  pos={'relative'}
                  zIndex={1}>
                  <Image src={character.image} fallbackSrc='https://via.placeholder.com/150' boxSize='150px' mx='auto' my={8} alt={character.name} />
                  <Text
                    color={'gray.500'}
                    fontWeight={600}
                    fontSize={'sm'}
                    textTransform={'uppercase'}
                    mt={1}>
                    {character.name}
                  </Text>
                </Box>
              ))}
        </SimpleGrid>
      )}
    </Box>
  );
}

export default Characters;
