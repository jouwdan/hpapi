import { FC } from 'react'
import { Box, Button, Flex, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

interface NavbarProps {
  currentPath: string
}

const Navbar: FC<NavbarProps> = ({ currentPath }) => {

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h='16' alignItems='center' justifyContent='space-between'>
        <Box fontSize='2xl' fontWeight='bold'>
          HPApi
        </Box>
        <Box>
          <Button variant={currentPath === '/' ? 'solid' : 'ghost'}>Home</Button>
          <Button variant={currentPath === '/about' ? 'solid' : 'ghost'}>About</Button>
        </Box>
        <Button onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  )
}

export default Navbar