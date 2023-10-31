import React, { useLayoutEffect, useEffect, useState } from 'react';
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



  useEffect(() => {
    setUsernameError(false);
    setPasswordError(false);
  }, [username, password])


  useLayoutEffect(() => {
    fetch("http://localhost:5000/api/auth/getUsername", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? navigate("/"): null)
    .catch((err) => console.log(err))
  }, [navigate])


  async function onSubmit() {
    const user = {
      username: username,
      password: password
    }

    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
    if (!response.ok) {
      if (response.status === 400) {
        setPasswordError(true);
      }
      if (response.status === 404) {
        setUsernameError(true);
      }
      console.log(response);
    } else {
      const tokenHolder = await response.json();
      localStorage.setItem("token", tokenHolder.token)
      window.location.reload();
    }
  }


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
              <VStack spacing={10}>
                <FormControl id="username" isInvalid={usernameError} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                        <FormErrorMessage>Username does not exist.</FormErrorMessage>
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
                    <FormErrorMessage>Password is incorrect.</FormErrorMessage>
                    )}
                </FormControl>
                  <Button width='200px' colorScheme="brand" onClick={onSubmit}>Login</Button>
              </VStack>
              <Box height={"15vh"}></Box>
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
