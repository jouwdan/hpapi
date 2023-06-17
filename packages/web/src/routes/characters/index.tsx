import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Text,
  SimpleGrid,
  LinkBox,
  Select,
  Flex,
  Spacer,
  InputGroup,
  Input,
  InputLeftElement,
  Skeleton,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FiSearch, FiArrowDown, FiArrowUp } from "react-icons/fi";
import { InfoCard } from "../../components/InfoCard";
import { Pagination } from "../../components/Pagination";

function Characters() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, status } = useQuery<any>([
    `/characters?page=${page}&size=${size}&name=${searchTerm}&sort=${sort}&order=${order}`,
  ]);
  const isLoading = status === "loading";
  const error = status === "error";

  const handleSearchTermInput = (event: any) =>
    setSearchTerm(event.target.value);

  return (
    <Box>
      <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4}>
        Characters
      </Text>
      <Flex>
        <InputGroup mb={4}>
          <InputLeftElement pointerEvents="none" children={<FiSearch />} />
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermInput}
          />
        </InputGroup>
        <Select
          variant="outline"
          value={sort}
          w={40}
          mx={4}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="gender">Gender</option>
          <option value="born">Born</option>
          <option value="died">Died</option>
          <option value="house">House</option>
          <option value="animagus">Animagus</option>
        </Select>
        {order === "asc" ? (
          <IconButton
            variant="outline"
            aria-label="Sort Descending"
            icon={<FiArrowUp />}
            onClick={() => setOrder("desc")}
          />
        ) : (
          <IconButton
            variant="outline"
            aria-label="Sort Ascending"
            icon={<FiArrowDown />}
            onClick={() => setOrder("asc")}
          />
        )}
      </Flex>
      {isLoading ? (
        <SimpleGrid columns={{ sm: 2, lg: 3, xl: 4 }} spacing={4}>
          {Array.from(Array(12).keys()).map(() => (
            <Skeleton isLoaded={!isLoading}>
              <InfoCard image={""} href={""} cardTitle={""} />
            </Skeleton>
          ))}
        </SimpleGrid>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <LinkBox>
            <SimpleGrid columns={{ sm: 2, lg: 3, xl: 4 }} spacing={4}>
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
            <Pagination
              page={page}
              setPage={setPage}
              pageSize={size}
              count={data.count}
            />
            <Select
              variant="outline"
              value={size}
              w={20}
              ml={4}
              onChange={(e) => setSize(parseInt(e.target.value))}
            >
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
