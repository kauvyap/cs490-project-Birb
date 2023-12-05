import React from "react";
import {Box,  Spacer,  Td, useDisclosure} from '@chakra-ui/react';
// import {Box,  Spacer,  Td, useColorModeValue, useDisclosure} from '@chakra-ui/react';
import { Heading, Flex } from '@chakra-ui/react';
import {Icon } from '@chakra-ui/react'
import {IoHourglassOutline, IoChevronDownCircleOutline} from 'react-icons/io5'
// import {IoIosRadioButtonOff, IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from 'react-icons/io'
import FocusTime from "./focustime";

function AppointmentContainer(props){

    const { isOpen, onOpen, onClose } = useDisclosure();
    // const bg = useColorModeValue('#F5F7F9', '#1A202C')
    // const cont = useColorModeValue("white", "#2d3748")

    return (
             <Td padding={0} width={"88%"}>
                
                {props.isFocus? (
                
                <Flex justifyContent={"center"} border={"2px solid #6284FF"} _hover={{bg:"#6284ff14"}} width={"95%"} bg={"white"} marginLeft={4} height={45} maxH={"100px"} overflowY={"auto"}>
                    <Flex justifyContent={"flex-left"} alignItems={"center"} style={{ cursor: 'pointer' }} onClick={onOpen}>
                        <Heading margin={3} textAlign={"center"} fontSize={"14px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
                        Focus Time
                        </Heading>
                        <Box alignSelf={"center"} height="6px" width={"6px"} bg={"#6284FF"} rounded={100}></Box>
                        <Heading margin={3} textAlign={"center"} fontSize={"14px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
                        {props.title}
                        </Heading>
                    </Flex>
                    <Spacer></Spacer>
                    <Flex justifyContent={"flex-end"} alignItems={"center"}  >
                        <Icon as={IoHourglassOutline} margin={1} boxSize={"20px"} color={"#6284FF"} marginRight={"5px"} />
                        <Heading   fontSize={"14px"}  margin={1} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>0/3</Heading>
                        <Box width={"56px"} height={"26px"} borderRadius={"8px"} margin={1} justifyContent={"center"} alignItems={"center"} textAlign={"center"} background={"#6284ff1a"}>
                            <Heading fontSize={"14px"} textColor={"#6284FF"}  margin={1} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>19:07</Heading>    
                        </Box>
                        <Icon  as={IoChevronDownCircleOutline} transform="rotate(270deg)" margin={1} boxSize={"20px"} marginRight={"5px"} />
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
                    </Flex>

                ) 
                
                } 
                <FocusTime isOpen={isOpen} onClose={onClose} title={props.title} notes={props.notes} />
            </Td>
  )
    
}
export default AppointmentContainer;