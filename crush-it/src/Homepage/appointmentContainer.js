import React, {useLayoutEffect, useState, useEffect} from "react";
import {Box,   Spacer,  Td, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import { Heading, Card, Flex, } from '@chakra-ui/react';
import {Accordion,AccordionItem, AccordionButton, AccordionPanel, Icon } from '@chakra-ui/react'
import {IoHourglassOutline} from 'react-icons/io5'
import {IoIosRadioButtonOff, IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from 'react-icons/io'
import FocusTime from "./focustime";





function AppointmentContainer(props){

    const { isOpen, onOpen, onClose } = useDisclosure();



    
    const bg = useColorModeValue('#F5F7F9', '#1A202C')
    const cont = useColorModeValue("white", "#2d3748")

    return (
             <Td padding={0} width={"88%"}>
                
                {props.isFocus? (
                
                <Flex justifyContent={"center"} border={"2px solid #6284FF"} width={"95%"} bg={"white"} marginLeft={4} height={45} maxH={"100px"} overflowY={"auto"}>
                    <Flex justifyContent={"flex-left"} alignItems={"center"} style={{ cursor: 'pointer' }} onClick={onOpen}>
                        <Heading padding={3} fontSize={"14px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
                        Focus Time
                        </Heading>
                        <Box alignSelf={"center"} height="6px" marginBottom={1} width={"6px"} bg={"#6284FF"} rounded={100}></Box>
                        <Heading padding={3}  fontSize={"14px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
                        {props.title}
                        </Heading>
                    </Flex>
                    <Spacer></Spacer>
                    <Flex justifyContent={"flex-end"} alignItems={"center"}>
                        <Icon as={IoHourglassOutline}  boxSize={"14px"} marginRight={"5px"} />
                        <Box> Time</Box>
                    </Flex>
                </Flex>
                ) : 
                (
                    <Flex justifyContent={"center"} border={"2px solid #E2EAF1"} width={"95%"} bg={"white"} marginLeft={4} height={45} maxH={"100px"} overflowY={"auto"}>
                        <Flex justifyContent={"flex-left"} alignItems={"center"}>
                            <Heading  padding={3} fontSize={"14px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
                                {props.title}
                            </Heading>
                        </Flex>
                        <Spacer></Spacer>
                        <Flex justifyContent={"flex-end"} alignItems={"center"}>
                           
                            <Box> Content</Box>
                        </Flex>
                    </Flex>

                ) 
                
                } 
                <FocusTime isOpen={isOpen} onClose={onClose} />
            </Td>
  )
    
}
export default AppointmentContainer;