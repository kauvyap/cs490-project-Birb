import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router";
import { Box, Heading, VStack, FormControl, FormLabel, FormErrorMessage, Input, Button, Divider, Flex, HStack, Card, 
         Icon, Switch, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons'
import { RiLockPasswordLine } from 'react-icons/ri'
import {RxPerson} from 'react-icons/rx'

function Profile() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [pomodoro, setPomodoro] = useState(null);
  const [timer, setTimer] = useState(0);
  const [short, setShort] = useState(0);
  const [long, setLong] = useState(0);

  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [comboError, setComboError] = useState(false)

  const digitRegex = /\d/;
  const lowerRegex = /[a-z]/;
  const upperRegex = /[A-Z]/;
  const specialRegex = /[^a-zA-Z0-9]/;

  const { colorMode, toggleColorMode } = useColorMode() //for extra-credit
  const isDarkMode = colorMode === "dark";
  const themeLabel = isDarkMode ? "Dark Mode" : "Light Mode";
  //assign background colors
  const bg = useColorModeValue('#F5F7F9', '#1A202C')
  const ic = useColorModeValue("#6284FF", "#90cdf4")

  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState({});
  console.log(userData);

  useLayoutEffect(() => {
    console.log(localStorage.getItem("token"));
    fetch("http://localhost:5000/api/auth/getUsername", {
      headers: {
        "x-access-token": localStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(data => data.isLoggedIn ? setUser(data.username): navigate('/login'))
    .catch((err) => alert(err))
  }, [navigate])


  useEffect(() => {
    fetch("http://localhost:5000/api/user/" + user)
    .then(res => res.json())
    .then(data => {setUserData(data)})
    .catch((err) => console.log(err))
  }, [user])

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      setFname(userData.fname)
      setLname(userData.lname)
      setPomodoro(userData.pomodoro)
    }
  }, [userData])

  useEffect(() => {
    if (pomodoro) {
      setTimer(userData.pomodoro.timer)
      setShort(userData.pomodoro.short)
      setLong(userData.pomodoro.long)
    }
  }, [pomodoro])
//userData.pomodoro.timer, userData.pomodoro.short, userData.pomodoro.long

  const handleSave = async () => {
    console.log(password.length);
    if (password.length > 0 && password.length < 8) {
      console.log("Password is incorrect");
      setPasswordError(true);
      return;
    }
    if (newPassword.length > 0 && newPassword.length < 8) {
      console.log("New password must be at least 8 characters");
      return;
    }
    if (newPassword.length > 0) {
      if (!specialRegex.test(newPassword) || !lowerRegex.test(newPassword) || !upperRegex.test(newPassword) || !digitRegex.test(newPassword)) {
        console.log("Passwords must contain a mix of uppercase letters, lowercase letters, numbers, and symbols");
        return;
      }
    }
    if (newPassword !== confirmNewPassword) {
      console.log("Passwords must match");
      return;
    }

    if (password.length >= 8) {
      console.log("Hello")
      const userInfo = {
        username: user,
        password: password
      }
      const response = await fetch('http://localhost:5000/api/auth/password', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(userInfo)
      })
      if (!response.ok) {
        if (response.status === 400) {
          setPasswordError(true);
          return;
        }
        if (response.status === 404) {
          console.log("User does not exist");
          return;
        }
        console.log(response);
      } else {
        const validPassword = await response.json();
        if (validPassword.isValid) {
          console.log("Password updated")
          await fetch('http://localhost:5000/api/user/password/' + user, {
            method: "PUT",
            body: JSON.stringify({
              username: user,
              password: newPassword,
              fname: fname,
              lname: lname,
              pomodoro: {timer: timer, short: short, long: long}
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
        else {
          await fetch('http://localhost:5000/api/user/' + user, {
            method: "PUT",
            body: JSON.stringify({
              username: user,
              fname: fname,
              lname: lname,
              pomodoro: {timer: timer, short: short, long: long}
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
          window.location.reload();
          return;
        }
      }
    }
    await fetch('http://localhost:5000/api/user/' + user, {
      method: "PUT",
      body: JSON.stringify({
        username: user,
        fname: fname,
        lname: lname,
        pomodoro: {timer: timer, short: short, long: long}
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    window.location.reload();
  }

  const handleCancel = () => {
    setFname(userData.fname)
    setLname(userData.lname)
    setTimer(userData.pomodoro.timer)
    setShort(userData.pomodoro.short)
    setLong(userData.pomodoro.long)
    setPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }


  //Error handling
  useEffect(() => {
    setPasswordError(false);
  }, [password])
  
  useEffect(() => {
    setPasswordLengthError(false);
    if (newPassword.length !== 0 && newPassword.length < 8) {
      setPasswordLengthError(true);
    }
  }, [newPassword])

  useEffect(() => {
    setPasswordMatchError(false);
    if (confirmNewPassword.length !== 0 && newPassword !== confirmNewPassword) {
      setPasswordMatchError(true);
    }
  }, [newPassword, confirmNewPassword])

  useEffect(() => {
    setComboError(false);
    const digitRegex = /\d/;
    const lowerRegex = /[a-z]/;
    const upperRegex = /[A-Z]/;
    const specialRegex = /[^a-zA-Z0-9]/;

    if (!passwordLengthError && newPassword.length !== 0) {
      if (!specialRegex.test(newPassword) || !lowerRegex.test(newPassword) || !upperRegex.test(newPassword) || !digitRegex.test(newPassword)) {
        console.log("True")
        setComboError(true)
      }
    }
  }, [newPassword, passwordLengthError])


    return (
    <Box p={5} height={"94vh"} bg={bg}>    
      <VStack spacing={4} align="start">
        <Box w="100%">
        <Flex justifyContent="space-between" width="100%" mb={2}>
          <Heading as="h2" size="md">
            User Info
          </Heading>
          <Flex alignItems="center">
            <FormLabel mb={0} mr={2}>
              {themeLabel}
            </FormLabel>
            <Switch
              isChecked={isDarkMode}
              onChange={toggleColorMode}
              aria-label="Switch theme"
            />
          </Flex>
        </Flex>
          <Box
          flex="1"
          position="relative"
          w="100%"
         
          >
          <Card boxShadow='xl' p={5} mb={4} w="100%">
          <HStack spacing={4} align="start">
          <FormControl id="firstName" flex={1}>
            <Flex spacing={4}>
                <Icon as={RxPerson} color={ic}/>
                <FormLabel ml={2}>First Name</FormLabel>
            </Flex>
            <Input 
            type="text" 
            placeholder="First Name" 
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            />
          </FormControl>
          <FormControl id="lastName" flex={1}>
            <Flex spacing={4}>
                <Icon as={RxPerson} color={ic}/>
                <FormLabel ml={2}>Last Name</FormLabel>
            </Flex>
            <Input 
            type="text" 
            placeholder="Last Name" 
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            />
          </FormControl>
        </HStack>
        </Card>
        </Box>
        </Box>

        <Divider />

        <Box w="100%">
        <Heading as="h2" size="md" mb={2}>
          Change Password
        </Heading>
        <Card boxShadow='xl' p={5} mb={4} w="100%">
        <HStack spacing={4} align="start">
          <FormControl id="currentPassword" isInvalid={passwordError} flex={1}>
            <Flex spacing={4}>
                <Icon as={RiLockPasswordLine} color={ic}/>
                <FormLabel ml={2}>Current Password</FormLabel>
            </Flex>
            <Input 
            type="password" 
            placeholder="Current password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <FormErrorMessage>Password is Incorrect</FormErrorMessage>
              )}
          </FormControl>
          <FormControl id="newPassword" isInvalid={passwordLengthError || comboError} flex={1}>
            <Flex spacing={4}>
                <Icon as={RiLockPasswordLine} color={ic}/>
                <FormLabel ml={2}>New Password</FormLabel>
            </Flex>
            <Input 
            type="password" 
            placeholder="New password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            />
            {passwordLengthError && (
              <FormErrorMessage>Password must be at least 8 characters</FormErrorMessage>
            )}
            {comboError && !passwordLengthError && (
              <FormErrorMessage>Passwords must contain a mix of uppercase letters, lowercase letters, numbers, and symbols</FormErrorMessage>
            )}
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={passwordMatchError} flex={1}>
            <Flex spacing={4}>
                <Icon as={RiLockPasswordLine} color={ic}/>
                <FormLabel ml={2}>Confirm New Password</FormLabel>
            </Flex>
            <Input 
            type="password" 
            placeholder="Confirm password" 
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {passwordMatchError && (
              <FormErrorMessage>Passwords must match</FormErrorMessage>
              )}
          </FormControl>
        </HStack>
        </Card>
        </Box>

        <Divider />

        <Box w="100%">
        <Heading as="h2" size="md" mb={2}>
          Pomodoro Timer (Minutes)
        </Heading>
        <Card boxShadow='xl' p={5} mb={4} w="100%">
        <HStack spacing={4} align="start">
          <FormControl id="pomodoro" flex={1}>
            <Flex spacing={4}>
                <TimeIcon color={ic}/>
                <FormLabel ml={2}>Pomodoro</FormLabel>
            </Flex>
            <Input 
            type="number" 
            placeholder="Current Setting" 
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            />
          </FormControl>
          <FormControl id="shortBreak" flex={1}>
            <Flex spacing={4}>
                <TimeIcon color={ic}/>
                <FormLabel ml={2}>Short Break</FormLabel>
            </Flex>
            <Input 
            type="number" 
            placeholder="Current Setting" 
            value={short}
            onChange={(e) => setShort(e.target.value)}
            />
          </FormControl>
          <FormControl id="longBreak" flex={1}>
          <Flex spacing={4}>
                <TimeIcon color={ic}/>
                <FormLabel ml={2}>Long Break</FormLabel>
            </Flex>
            <Input 
            type="number" 
            placeholder="Current Setting" 
            value={long}
            onChange={(e) => setLong(e.target.value)}
            />
          </FormControl>
        </HStack>
        </Card>
        </Box>

        <Divider />

        <Box w="100%" display="flex" justifyContent="center">
        <HStack spacing={5}>
            <Button size='lg' width='200px' colorScheme="blue" variant='outline' onClick={handleCancel}>Cancel</Button>
            <Button size='lg' width='200px' colorScheme="blue" variant='solid' onClick={handleSave}>Save</Button>
        </HStack>
        </Box>

      </VStack>
    </Box>
  );
};

export default Profile;