import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const Logo = () => {
  return (
    <Box
      bg="black"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="55%"
    >
      <Image src="/crush-it.png" alt="Logo" />
    </Box>
  );
};

export default Logo;