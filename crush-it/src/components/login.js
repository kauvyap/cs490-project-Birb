import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card, CardHeader, CardBody, CardFooter,
  VStack,
} from '@chakra-ui/react';

import MainLogo from './mainlogo';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <Box h="100vh" display="flex">
      <MainLogo />
    <Box
      flex="1"
      bg="white"
      w="300px"
    >
      <Card>
      <CardHeader>
      <Heading as="h2" size="lg" mb={4}>
        Login
      </Heading>
      </CardHeader>
      <CardBody>
      <VStack spacing={4}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
      </CardBody>
      </Card>
    </Box>
  </Box>
);
};


export default LoginForm;
