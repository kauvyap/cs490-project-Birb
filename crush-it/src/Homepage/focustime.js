import React, { useState, useEffect, useLayoutEffect }  from 'react';
import { useNavigate } from "react-router";

import { HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
         Tab, TabList, TabPanel, TabPanels, Tabs, TabIndicator, Flex, useColorModeValue} from '@chakra-ui/react';

import { AddIcon } from "@chakra-ui/icons";

function FocusTime({isOpen, onClose, title, notes}) {

    //const { isOpen, onOpen, onClose } = useDisclosure()
    const bg = useColorModeValue("#F3F3F3", "#1a202c");
    const blueTxt = useColorModeValue('#6284FF', '#90cdf4');

    const [pomoLength, setPomoLength] = useState('');
    const [shortLength, setShortLength] = useState('');
    const [longLength, setLongLength] = useState('');

    const [isPaused, setIsPaused] = useState(false);
    const [timer, setTimer] = useState('');
    const [flag, setFlag] = useState(true);

    const handleToggle = () => {
      console.log(pomoLength*60, timer, isPaused);
      setIsPaused(!isPaused);
      console.log(isPaused);
      if (!isPaused) {
        console.log('done');
        clearInterval(intervalId);
      }
      if (flag) {
        // startTimer();
        setFlag(false);
      }
    };

    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useLayoutEffect(() => {
        fetch("http://localhost:5000/api/auth/getUsername", {
        headers: {
            "x-access-token": localStorage.getItem("token")
        }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? setUsername(data.username): navigate('/login'))
        .catch((err) => alert(err))
    }, [navigate])

    useEffect(() => {
      fetch('http://localhost:5000/api/user/' + username)
        .then(res => res.json())
        .then(userData => {
          if (userData && userData.pomodoro && userData.pomodoro.timer) {
            setPomoLength(userData.pomodoro.timer);
            setTimer(userData.pomodoro.timer*60);
          }
        })
        .catch(err => console.log(err));
    }, [username]);

    useEffect(() => {
      fetch('http://localhost:5000/api/user/' + username)
        .then(res => res.json())
        .then(userData => {
          if (userData && userData.pomodoro && userData.pomodoro.short) {
            setShortLength(userData.pomodoro.short);
          }
        })
        .catch(err => console.log(err));
    }, [username]);

    useEffect(() => {
      fetch('http://localhost:5000/api/user/' + username)
        .then(res => res.json())
        .then(userData => {
          if (userData && userData.pomodoro && userData.pomodoro.long) {
            setLongLength(userData.pomodoro.long);
          }
        })
        .catch(err => console.log(err));
    }, [username]);

    

    function formatTime(totalSeconds) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
    
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
    
      return `${formattedMinutes}:${formattedSeconds}`;
    }

    let intervalId;
    function startTimer() {
      var seconds = pomoLength*60;
      
        intervalId = setInterval(() => {

          console.log(isPaused);
          seconds--;

          setTimer(seconds);

          if (seconds === 0) {
            clearInterval(intervalId);
          }

        }, 1000);
    }

    useEffect(() => {
      if (!isPaused) {
        var seconds = pomoLength*60;
      
        intervalId = setInterval(() => {

          console.log(isPaused);
          seconds--;

          setTimer(seconds);

          if (seconds === 0) {
            clearInterval(intervalId);
          }

        }, 1000);
      } else {
        clearInterval(intervalId);
      } 
    }, [isPaused]); // Include isPaused in the dependency array


//<IconButton onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5} colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>
    return (
        <>
        


                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                      <ModalContent maxW="40%" maxH="80%">
                        <ModalCloseButton />
                        <ModalBody>
                          <Tabs position="relative" variant="unstyled">
                            <TabList mb="0.5em">
                              <Tab fontFamily="DM Sans" fontWeight="bold" _selected={{ color: blueTxt }} mr="4">Pomodoro</Tab>
                              <Tab fontFamily="DM Sans" fontWeight="bold" _selected={{ color: blueTxt }} mr="4">Short Break</Tab>
                              <Tab fontFamily="DM Sans" fontWeight="bold" _selected={{ color: blueTxt }}>Long Break</Tab>
                            </TabList>
                            <TabIndicator
                              sx={{
                                width: "2px",
                                height: "3px",
                                backgroundColor: blueTxt,
                                borderRadius: "3px",
                              }}
                            />
                            <TabPanels>
                              <TabPanel>
                                <Box rounded={8} bg = {bg} alignContent={"center"} p={10} textAlign={"center"}>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                    {formatTime(timer)}
                                  </Text>
                                  <Button borderRadius={"16px"} width={"158px"} height={"54"} background="linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)" textColor={'white'} size="lg" onClick={handleToggle}>
                                    {isPaused ? "Pause" : "Start"}
                                  </Button>
                                </Box>
                                <Text mt={5} mb={5} fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"20px"}>{title}</Text>
                                <Box bg = {bg} p={5} rounded={8}>
                                  <Text fontFamily={"DM Sans"} textColor={blueTxt} fontWeight={"bold"} fontSize={"16px"} mb={3}>Notes:</Text>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"14px"} mb={3}>
                                    {notes}
                                  </Text>
                                </Box>
                                <Box mt={5} bg="black" p={5} rounded={8}>
                                  <Flex justifyContent="center" alignItems="center" mt={3}>
                                    <HStack>
                                      <Text fontFamily="DM Sans" textColor="white" fontWeight="bold" fontSize="20px">
                                        Pomos:
                                      </Text>
                                      <Text fontFamily="DM Sans" textColor={blueTxt} fontWeight="bold" fontSize="20px">
                                        0/3
                                      </Text>
                                      <Text fontFamily="DM Sans" textColor="white" fontWeight="bold" fontSize="20px" ml={8}>
                                        Finish At:
                                      </Text>
                                      <Text fontFamily="DM Sans" textColor={blueTxt} fontWeight="bold" fontSize="20px">
                                        19:53 (1.4h)
                                      </Text>
                                    </HStack>
                                  </Flex>
                                </Box>
                              </TabPanel>
                              <TabPanel>
                                  <Box bg = {bg} borderRadius={8} alignContent={"center"} p={10} textAlign={"center"}>
                                    <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                      {formatTime(shortLength * 60)}
                                    </Text>
                                    <Button borderRadius={"16px"} width={"158px"} height={"54"} background="linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)" textColor={'white'} size="lg" onClick={handleToggle}>
                                      {isPaused ? "Start" : "Pause"}
                                    </Button>
                                  </Box>
                              </TabPanel>
                              <TabPanel>
                                <Box bg = {bg} borderRadius={8} alignContent={"center"} p={10} textAlign={"center"}>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                    {formatTime(longLength * 60)}
                                  </Text>
                                  <Button borderRadius={"16px"} width={"158px"} height={"54"} background="linear-gradient(180deg, #6284FF 0%, #4B6DE9 100%)" textColor={'white'} size="lg" onClick={handleToggle}>
                                    {isPaused ? "Start" : "Pause"}
                                  </Button>
                                </Box>
                              </TabPanel>
                            </TabPanels>
                          </Tabs>
                        </ModalBody>
                        <ModalFooter>
                            
                        </ModalFooter>
                      </ModalContent>
                      </Modal>
        </>  
  );
};

export default FocusTime;