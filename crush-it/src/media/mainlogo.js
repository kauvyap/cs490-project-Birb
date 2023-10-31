import React from 'react';
import { Box, Image, Text, VStack } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Box
      bg="#252628"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="55%"
    >
      <VStack >
      <Text fontFamily={"'Fredoka', sans-serif"} fontSize="60px" fontWeight={"400"} textColor={"white"} align={"center"} >Crush It</Text>
      <Image src="/crush-it.png" alt="Logo" />
      </VStack>
    </Box>
  );
};

export default Logo;