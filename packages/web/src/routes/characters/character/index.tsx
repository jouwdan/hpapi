import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, SimpleGrid, useColorModeValue, Button, LinkBox, LinkOverlay } from '@chakra-ui/react';
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
              <LinkBox>
                <SimpleGrid columns={{sm: 2, lg: 3, xl: 4}} spacing={4}>
                    <Box role={'group'}
                      p={6}
                      w={'full'}
                      bg={bgColor}
                      boxShadow={'sm'}
                      rounded={'lg'}
                      pos={'relative'}
                      zIndex={1}>
                      <Image src={character.image} fallbackSrc='https://via.placeholder.com/150' mx='auto' my={8} alt={character.name} />
                      <LinkOverlay href={`/characters/${character.id}`}>
                        <Text
                          color={'gray.500'}
                          fontWeight={600}
                          fontSize={'sm'}
                          textTransform={'uppercase'}
                          mt={1}>
                          {character.name}
                        </Text>
                      </LinkOverlay>
                    </Box>
                </SimpleGrid>
              </LinkBox>
          </>
      )}
    </Box>
  );
}

export default Character;
