import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  currentPath: string
}

const Navbar: FC<NavbarProps> = ({ currentPath }) => {
  const { t } = useTranslation(`home`)
  
  return (
    <Box>
      
    </Box>
  )
}

export default Navbar
