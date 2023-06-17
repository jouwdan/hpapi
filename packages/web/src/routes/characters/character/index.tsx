import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

function Character() {
  const params = useParams<{ id: string }>();
  const { data, status } = useQuery<any>([`/characters?id=${params.id}`]);
  const isLoading = status === 'loading';
  const error = status === 'error';

  let character = null;
  if (data && data.data && data.data.length > 0) {
    character = data.data[0];
  }

  const bgColor = useColorModeValue('white', 'gray.800');

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
        ) : (
            <>
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
          </>
      )}
    </Box>
  );
}

export default Character;
