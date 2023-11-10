import React, {useLayoutEffect} from "react";
import { useNavigate } from "react-router";
import {Box, Heading, Container, Table, Tbody, TableContainer, Tr, Td, VStack, HStack, useColorMode, useColorModeValue, Spacer} from '@chakra-ui/react';
// import Prio from "./topPriority"
// import Important from "./important"
// import Other from "./Other"
import TaskContainer from "./TaskContainer"
import DatePicker from './datepicker';
import AddTask from './addtask';


function Homepage(){
  const navigate = useNavigate();
  // const [username, setUsername] = useState(null)
  const bg = useColorModeValue('#F5F7F9', '#1A202C')
  const cont = useColorModeValue("white", "#2d3748")

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
    const topPriorityList = [["Homework", "This is a hw", 1, "FN" ], ["Homework 2","This is a hw", 3, "NS"]]
    const importantList = [["Homework", "This is a hw", 1, "FN" ], ["Homework 2","This is a hw", 3, "CA"]]
    const otherList = [["Homework", "This is a hw", 1, "IP" ], ["Homework 2","This is a hw", 3, "MO"]]

    return (
      

        <Box p={5} bg={bg} height={"94vh"}>

        <DatePicker />
  
        <HStack justify={"left"} p={5}  H={"90%"} width={ "100%"}>
            <VStack  H={"100%"} width={"60%" } align="top" justify={"left"} marginBottom={1}>
            <Heading fontSize={"30px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>Tasks
            <AddTask />
            </Heading>

              <Container borderRadius={"10"} bg={cont}  minW={"100%"} minH={"700px"} paddingBottom={5} paddingTop={5} >
                <TaskContainer category='Top Priority' categoryList={topPriorityList}/>
                <TaskContainer category='Important' categoryList={importantList}/>
                <TaskContainer category='Other' categoryList={otherList}/>
                
              </Container>

          </VStack>
          <Spacer></Spacer>
  
          <VStack H={"100%"} width={"45%" } align="left" justify={"left"} >
              <Heading fontSize={"30px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"} marginBottom={3}>Appointments</Heading>
                  <Box borderRadius={"10"} bg={cont} h={"700px"} overflowY={"auto"} >
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