import React, {useLayoutEffect} from "react";
import { useNavigate } from "react-router";
import {Box, Heading, Card, Container, Table, Tbody, TableContainer, Tr, Td, VStack, HStack} from '@chakra-ui/react';
import DatePicker from './datepicker';
import AddTask from './addtask';

function Homepage(){
  const navigate = useNavigate();
  // const [username, setUsername] = useState(null)

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

    return (
      
        <Box p={5} bg="#F5F7F9" height={"94%"}>

        <DatePicker />
  
        <HStack justify={"left"} p={5}  H={"96%"} width={ "96%"}>
            <VStack  H={"100%"} width={"60%" } align="top-left" justify={"left"}>
            <Heading>Tasks
            <AddTask />
            </Heading>
            
  
              <Container bg="#FFFFFF"  minW={"100%"} minH={"700px"} paddingBottom={5} paddingTop={5} >
                  <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
  
                      <Heading>
                          Top Priority
                      </Heading>
                      <Card margin={2} padding={3}>
                          Homework
                      </Card>
  
                  </Card>
  
  
  
                  <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
                      <Heading>
                          Important
                      </Heading>
                      <Card margin={2} padding={3}>
                          Homework
                      </Card>
                  </Card>
  
                  <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
                      <Heading>
                          Other
                      </Heading>
                      <Card margin={2} padding={3}>
                          Homework
                      </Card>
                      <Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card><Card margin={2} padding={3}>
                          Homework
                      </Card>
                  </Card>
              </Container>
          </VStack>
  
          <VStack H={"100%"} width={"40%" } align="left" justify={"left"}>
              <Heading>Appointments</Heading>
  
                  <Box bg="white" minH={"100%"} overflowY={"auto"} maxH={"700px"}>
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