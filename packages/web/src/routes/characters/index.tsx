import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, Image, SimpleGrid, useColorModeValue, Button, LinkBox, LinkOverlay, Select, Flex, ButtonGroup, Spacer } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight } from 'react-icons/fi'

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
              <LinkBox>
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
                  ))}
                </SimpleGrid>
              </LinkBox>
              <Flex py={4}>
                <Spacer />
                <ButtonGroup isAttached variant='outline'>
                  <Button colorScheme='blue' variant='outline' onClick={() => setPage(1)}><FiChevronsLeft /></Button>
                  {page > 1 ? (
                    <>
                      <Button colorScheme='blue' variant='outline' onClick={() => setPage(page - 1)}><FiChevronLeft /></Button>
                      <Button colorScheme='blue' variant='outline' onClick={() => setPage(page - 1)}>{page - 1}</Button>
                    </>
                  ) : (
                      <>
                      <Button colorScheme='blue' variant='outline' isDisabled><FiChevronLeft /></Button>
                    <Button colorScheme='blue' variant='outline' isDisabled>{page - 1}</Button>
                      </>
                  )}
                  <Button colorScheme='blue' variant='solid'>{page}</Button>
                  <Button colorScheme='blue' variant='outline' onClick={() => setPage(page + 1)}>{page + 1}</Button>
                  <Button colorScheme='blue' variant='outline' onClick={() => setPage(page + 1)}><FiChevronRight /></Button>
                  <Button colorScheme='blue' variant='outline' onClick={() => setPage(page + 10)}><FiChevronsRight /></Button>
                </ButtonGroup>
              <Select variant='outline' value={size} w={20} ml={4} onChange={(e) => setSize(parseInt(e.target.value))}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                </Select>
              </Flex>
          </>
      )}
    </Box>
  );
}

export default Characters;
