import { useQuery } from '@tanstack/react-query';
import { Box } from '@chakra-ui/react';

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

  return (
    <Box>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error</div>
      ) : (
            <div>
              {data.data.map((character: any) => (
                <div key={character.id}>
                  <h1>{character.name}</h1>
                </div>
              ))}
        </div>
      )}
    </Box>
  );
}

export default Characters;
