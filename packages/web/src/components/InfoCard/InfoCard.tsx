import { Box, Center, useColorModeValue, Image, LinkOverlay, Text } from '@chakra-ui/react';
import { FC } from 'react'

interface InfoCardProps {
  image: string;
  href: string;
  cardTitle: string;
}

const InfoCard: FC<InfoCardProps> = ({ image, href, cardTitle }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  return (
    <Box role={'group'}
    p={6}
    w={'full'}
    bg={bgColor}
    boxShadow={'sm'}
    rounded={'lg'}
    pos={'relative'}
    zIndex={1}>
    <Center w="200px" h="200px" mx='auto' my={4}>
      <Image src={image} fallbackSrc='https://via.placeholder.com/150' maxH='200px' maxW='200px' alt={cardTitle} />
    </Center>
    <LinkOverlay href={href}>
      <Text
        color={'gray.500'}
        fontWeight={600}
        fontSize={'sm'}
        textTransform={'uppercase'}
        mt={1}>
        {cardTitle}
      </Text>
    </LinkOverlay>
  </Box>
  )
}

export default InfoCard