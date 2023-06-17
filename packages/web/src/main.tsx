import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from '@chakra-ui/react'
import MyRoutes from './routes/index.tsx'

interface QueryFnProps {
  queryKey: [string];
}

const defaultQueryFn = async ({ queryKey }: QueryFnProps) => {
  const res = await fetch(`https://hpapi.onrender.com${queryKey[0]}`);
  if (!res.ok) {
    throw new Error('There was an error when fetching the data');
  }
  return res.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
    keepPreviousData: true,
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <MyRoutes />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
