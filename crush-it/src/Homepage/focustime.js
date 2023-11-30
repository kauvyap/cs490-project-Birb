import React, { useState, useEffect, useLayoutEffect }  from 'react';
import { useNavigate } from "react-router";
import { HStack, Spacer, useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Text, Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
         Tab, TabList, TabPanel, TabPanels, Tabs, TabIndicator, Flex, useColorModeValue} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function FocusTime() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const bg = useColorModeValue("#F3F3F3", "#1a202c");
    const blueTxt = useColorModeValue('#6284FF', '#90cdf4');

    const [isPaused, setIsPaused] = useState(true);

    const handleToggle = () => {
      setIsPaused((prevState) => !prevState);
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
 
    const [pomoLength, setPomoLength] = useState('');
    const [shortLength, setShortLength] = useState('');
    const [longLength, setLongLength] = useState('');

    useEffect(() => {
      fetch('http://localhost:5000/api/user/' + username)
        .then(res => res.json())
        .then(userData => {
          if (userData && userData.pomodoro && userData.pomodoro.timer) {
            setPomoLength(userData.pomodoro.timer);
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

    return (
        <>
        <IconButton onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                        colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>


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
                                <Box bg = {bg} alignContent={"center"} p={10} textAlign={"center"}>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                    {formatTime(pomoLength * 60)}
                                  </Text>
                                  <Button colorScheme="blue" size="lg" onClick={handleToggle}>
                                    {isPaused ? "Start" : "Pause"}
                                  </Button>
                                </Box>
                                <Text mt={5} mb={5} fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"20px"}>Task Title</Text>
                                <Box bg = {bg} p={5}>
                                  <Text fontFamily={"DM Sans"} textColor={blueTxt} fontWeight={"bold"} fontSize={"16px"} mb={3}>Notes</Text>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"12px"} mb={3}>
                                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                  </Text>
                                </Box>
                                <Box mt={5} bg="black" p={5}>
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
                                  <Box bg = {bg} alignContent={"center"} p={10} textAlign={"center"}>
                                    <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                      {formatTime(shortLength * 60)}
                                    </Text>
                                    <Button colorScheme="blue" size="lg" onClick={handleToggle}>
                                      {isPaused ? "Start" : "Pause"}
                                    </Button>
                                  </Box>
                              </TabPanel>
                              <TabPanel>
                                <Box bg = {bg} alignContent={"center"} p={10} textAlign={"center"}>
                                  <Text fontFamily={"DM Sans"} fontWeight={"bold"} fontSize={"100px"}>
                                    {formatTime(longLength * 60)}
                                  </Text>
                                  <Button colorScheme="blue" size="lg" onClick={handleToggle}>
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