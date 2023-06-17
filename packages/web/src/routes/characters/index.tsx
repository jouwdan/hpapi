import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, SimpleGrid, useColorModeValue, Button, Menu } from '@chakra-ui/react';

function Characters() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { data, status } = useQuery<any>([`/characters?page=${page}&size=${size}`]);
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
            <>
            <SimpleGrid columns={{sm: 2, lg: 3, xl: 4}} spacing={4}>
              {data.data.map((character: any) => (
                <Box role={'group'}
                  p={6}
                  w={'full'}
                  bg={bgColor}
                  boxShadow={'sm'}
                  rounded={'lg'}
                  pos={'relative'}
                  zIndex={1}>
                  <Image src={character.image} fallbackSrc='https://via.placeholder.com/150' mx='auto' my={8} alt={character.name} />
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
              <Button onClick={() => setPage(page - 1)}>Previous Page</Button>
              <Button onClick={() => setPage(page + 1)}>Next Page</Button>

          </>
      )}
    </Box>
  );
}

export default Characters;
