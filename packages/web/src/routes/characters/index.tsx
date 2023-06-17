import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Text, SimpleGrid, Button, LinkBox, Select, Flex, ButtonGroup, Spacer, InputGroup, Input, InputLeftElement } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronsLeft, FiChevronRight, FiChevronsRight, FiSearch } from 'react-icons/fi'
import { InfoCard } from '../../components/InfoCard';

function Characters() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');
  const { data, status } = useQuery<any>([`/characters?page=${page}&size=${size}&name=${searchTerm}`]);
  const isLoading = status === 'loading';
  const error = status === 'error';

  const handleSearchTermInput = (event: any) => setSearchTerm(event.target.value);

  return (
    <Box>
    <Text as='h1' fontSize='3xl' fontWeight='bold' mb={4}>Characters</Text>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none" children={<FiSearch />} />
        <Input placeholder="Search..." value={searchTerm} onChange={handleSearchTermInput} />
      </InputGroup>
      
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
        ) : (
            <>
              <LinkBox>
                <SimpleGrid columns={{sm: 2, lg: 3, xl: 4}} spacing={4}>
                  {data.data.map((character: any) => (
                    <InfoCard
                      image={character.image}
                      href={`/characters/${character.id}`}
                      cardTitle={character.name}
                    />
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
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
                </Select>
              </Flex>
          </>
      )}
    </Box>
  );
}

export default Characters;
