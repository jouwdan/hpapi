import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from '@chakra-ui/react'
import MyRoutes from './routes/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <ChakraProvider>
        <MyRoutes />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
