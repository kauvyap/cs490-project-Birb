import React, {useLayoutEffect, useState} from "react";
import { useNavigate } from "react-router";
import {Box, Heading, Container, Table, Tbody, TableContainer, Tr, Td, VStack, HStack} from '@chakra-ui/react';
// import Prio from "./topPriority"
// import Important from "./important"
// import Other from "./Other"
import TaskContainer from "./TaskContainer"
import DatePicker from './datepicker';
import AddTask from './addtask';


function Homepage(){

    //selectedDate uses a CallBack function to get the currentDay from DatePicker
    //setting up selectedDate
    const [selectedDate, setSelectedDate] = useState(null);
    //handle the date change
    const handleSelected = (date) => {
        setSelectedDate (date)  
    };
    //use {slectedDate} anywhere

  const navigate = useNavigate();

  useLayoutEffect(() => {
      console.log(localStorage.getItem("token"));
      fetch("http://localhost:5000/api/auth/getUsername", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
      .then(res => res.json())
      .then(data => data.isLoggedIn ? console.log(data.username): navigate('/login'))
      .catch((err) => alert(err))
    }, [navigate])

    //status is broken into 4 different elements notStarted="NS", Finished="FN", InProgress="IP", Canceled="anything", movedOver="MO" 
    const topPriorityList = [["Complete Math Homework", "This is a hw", 1, "FN" ], ["Homework 2","This is a hw", 3, "NS"]];
    const importantList = [["Homework 1", "This is a hw", 4, "FN" ], ["Homework 7","This is a hw", 2, "CA"]];
    const otherList = [["Homework 4", "", 10, "IP" ], ["Homework 3","", 3, "MO"]];

    return (
      

        <Box p={5} bg="#F5F7F9" height={"94vh"}>

        <DatePicker onDateSlected={handleSelected} />
  
        <HStack justify={"left"} p={5}  H={"90%"} width={ "100%"}>
            <VStack  H={"100%"} width={"60%" } align="top" justify={"left"} marginBottom={1}>
            <Heading fontSize={"30px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>Tasks {selectedDate}
            <AddTask />
            </Heading>

              <Container borderRadius={"10"} bg="#FFFFFF"  minW={"100%"} H={"670px"} paddingTop={"5"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"}>
                <TaskContainer category='Top Priority' categoryList={topPriorityList}/>
                <TaskContainer category='Important' categoryList={importantList}/>
                <TaskContainer category='Other' categoryList={otherList}/>
                
              </Container>

          </VStack>
  
          <VStack H={"100%"} width={"40%" } align="left" justify={"left"} >
              <Heading fontSize={"30px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"} marginBottom={3}>Appointments</Heading>
                  <Box borderRadius={"10"} bg="white" h={"680px"} overflowY={"auto"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} 
                  css={`
                  &::-webkit-scrollbar {
                      width: 6px;
                      height: 80px;
                    }
                    &::-webkit-scrollbar-thumb {
                      background-color: #6284FF;
                      border-radius: 8px;
                    }
                    &::-webkit-scrollbar-track {
                      background-color: rgba(98, 132, 255, 0.15);
                    }
                    &::-webkit-scrollbar-thumb:hover {
                      background-color: #405DC9;
                    }
                    &::-webkit-scrollbar-thumb:active {
                      background-color: #1E40AF; // Change the color when clicked`
                    }>
                  <TableContainer>
                      <Table variant='simple'>
  
                          <Tbody>
                          <Tr>
                              <Td>5  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>6  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>7  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>8  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>9  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>10 AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>11 AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>12 AM</Td>
                              <Td></Td>
                          </Tr>
  
                          <Tr>
                              <Td>1  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>2  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>3  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>4  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>5  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>6  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>7  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>8  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>9  PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>10 PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>11 PM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>12 PM</Td>
                              <Td></Td>
                          </Tr>
  
                          <Tr>
                              <Td>1  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>2  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>3  AM</Td>
                              <Td></Td>
                          </Tr>
                          <Tr>
                              <Td>4  AM</Td>
                              <Td></Td>
                          </Tr>
                          </Tbody>
  
                      </Table>
                  </TableContainer>
              </Box>
  
  
          </VStack>
  
      </HStack>
  
  </Box>
  )
    
}
export default Homepage;