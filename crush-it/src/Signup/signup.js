import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router";
import { Link as ReactRouterLink } from "react-router-dom";
import {Box, Heading, FormControl, FormLabel, FormErrorMessage, Input, Button, Text, Link as ChakraLink, Card, CardHeader, CardBody, CardFooter, VStack} from '@chakra-ui/react';

import MainLogo from '../media/mainlogo';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [usernameLengthError, setUsernameLengthError] = useState(false);
  const [usernameSameError, setUsernameSameError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  useEffect(() => {
    setUsernameSameError(false);
    console.log(username);
    if (username.length !== 0 && username.length < 6) {
      setUsernameLengthError(true);
    }
    else {
      setUsernameLengthError(false);
    }
  }, [username])


  useEffect(() => {
    console.log(password);
    if (password.length !== 0 && password.length < 6) {
      setPasswordLengthError(true);
    }
    else {
      setPasswordLengthError(false);
    }
  }, [password])

  useEffect(() => {
    console.log(confirmPassword);
    if (confirmPassword.length !== 0 && password !== confirmPassword) {
      setPasswordMatchError(true);
    }
    else {
      setPasswordMatchError(false);
    }
  }, [password, confirmPassword])


  async function onSubmit() {
    // Implement your login logic here
    if (username.length < 6) {
      console.log("Username is not long enough");
      return;
    }
    if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      console.log("Passwords must match");
      return;
    }

    const usersResponse = await fetch('http://localhost:5000/api/user');
    const users = await usersResponse.json();
    console.log(users);
    for (const user in Object.keys(users)) {
      if (username === users[user].username) {
        console.log("Username already exists");
        setUsernameSameError(true);
        return;
      }
    }
    console.log({username: username, password: password, fname: 'fName', lname: 'lName', pomodoro: {timer: 25, short: 5, long: 15}});
    const response = await fetch('http://localhost:5000/api/user', {
      method: 'POST',
      body: JSON.stringify({username: username, password: password, fname: 'fName', lname: 'lName', pomodoro: {timer: 25, short: 5, long: 15}}),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.log(response);
      return;
    }
    if (response.ok) {
      console.log(response)
      navigate("/homepage");
    }

    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm-Password:', confirmPassword);
  };

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
                Sign Up
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={10} direction='row'>
                  <FormControl id="username" isInvalid={usernameLengthError || usernameSameError} isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameLengthError && (
                        <FormErrorMessage>Username must be at least 6 characters</FormErrorMessage>
                       )}
                    {usernameSameError && (
                        <FormErrorMessage>Username is already taken</FormErrorMessage>
                       )}
                  </FormControl>
                  <FormControl id="password" isInvalid={passwordLengthError} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordLengthError && (
                        <FormErrorMessage>Password must be at least 6 characters</FormErrorMessage>
                       )}
                  </FormControl>
                  <FormControl id="confirm-password" isInvalid={passwordMatchError} isRequired>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your password again"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                      {passwordMatchError && (
                        <FormErrorMessage>Passwords must match</FormErrorMessage>
                       )}
                    </FormControl>

                  <Button colorScheme="brand" onClick={onSubmit}>Sign Up</Button>

              </VStack>
            </CardBody>
            <br/><br/><br/><br/><br/><br/><br/>
            <CardFooter bg="white" style={{ textAlign: 'center' }} padding-top='100px'>
              <Box w="100%" bg="#F5F7F9" display="inline-block" p={2} rounded="md">
                <Text display="inline" textAlign="center">Already Have an Account?</Text>
                <ChakraLink as={ReactRouterLink} to='/' display="inline" color="#6284FF" style={{ marginLeft: '5px', fontWeight: 'bold'}}>Log in Here!</ChakraLink>
              </Box>
            </CardFooter>
          </Card>
        </Box>
      </Box>
    </Box>
  );  
};


export default Signup;
