import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import {Box, Heading, FormControl, FormLabel, FormErrorMessage, Input, Button, Text, Link as ChakraLink, Card, CardHeader, CardBody, CardFooter, VStack} from '@chakra-ui/react';

import MainLogo from '../media/mainlogo';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();


  async function onSubmit() {
    var bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const response = await fetch('http://localhost:5000/api/user');
    const users = await response.json();
    console.log(users);
  
    setUsernameError(true);
    var usernameErr = true;

    for (const user in Object.keys(users)) {
      if (username === users[user].username) {
        usernameErr = false;
        setUsernameError(false);
        
        console.log(hashedPassword);
        console.log(users[user].password);
        const validPassword = await bcrypt.compare(password, users[user].password)
        console.log("pass", validPassword);
        if (validPassword) {
          navigate("/homepage");
          return;
        }
      }
    }
    console.log(usernameErr);
    if (usernameErr) {
      console.log("username does not exist");
      return;
    }
    else {
      setPasswordError(true);
      console.log("password does not match");
    }
  };

  useEffect(() => {
    setUsernameError(false);
    setPasswordError(false);
  }, [username, password])


  return (
    <Box h="100vh" display="flex">
      <MainLogo />
      <Box
        flex="1"
        bg="white"
        position="relative"
      >
        <Box
          w="90%"
          mx="5%"
          p={4}
          position="absolute"
          top="50%"
          left="30%"
          transform="translate(-50%, -50%)"
        >
          <Card boxShadow='2xl'>
            <CardHeader>
              <Heading as="h2" size="lg" mb={4}>
                Login
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <FormControl id="username" isInvalid={usernameError} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                        <FormErrorMessage>Username does not exist</FormErrorMessage>
                       )}
                </FormControl>
                <FormControl id="password" isInvalid={passwordError} isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && (
                    <FormErrorMessage>Password does not match</FormErrorMessage>
                    )}
                </FormControl>
                  <Button width='200px' colorScheme="brand" onClick={onSubmit}>Login</Button>
              </VStack>
            </CardBody>
            <br/><br/><br/><br/><br/><br/><br/>
            <CardFooter bg="white" style={{ textAlign: 'center' }}>
              <Box w="100%" bg="#F5F7F9" display="inline-block" p={2} rounded="md">
                <Text display="inline" textAlign="center">Don't Have an Account?</Text>
                <ChakraLink as={ReactRouterLink} to='/signup' display="inline" color="#6284FF" style={{ marginLeft: '5px', fontWeight: 'bold'}}>Sign up Here!</ChakraLink>
              </Box>
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );  
};


export default Login;
