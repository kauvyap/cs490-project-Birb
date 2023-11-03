import React, {useLayoutEffect} from "react";
import { useNavigate } from "react-router";
import {Box, Heading, Card, Container, Table, Tbody, TableContainer, Tr, Td, VStack, HStack, Center, IconButton, Button, Text} from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
  } from '@chakra-ui/react'
import {IoChevronBackCircleSharp, IoChevronForwardCircleSharp, IoChevronDownCircleOutline} from 'react-icons/io5'

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

        <Center w={"93%"} bg="#6284FF26" p={3} ml={5}>
        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronBackCircleSharp />}
        />
        <Menu>
        <MenuButton as={Button} variant='outline' colorScheme='blue' ml={1} mr={1} color="#6284FF" size='lg' fontSize={'3xl'} rightIcon={<IoChevronDownCircleOutline />}>
            <Text color="black" p={2} mt={3}>Month</Text>
        </MenuButton>
        <MenuList maxH="230px" overflowY="auto" w="100" overflowX="hidden" fontSize={'xl'}>
            <MenuItem ml={5}>January</MenuItem>
            <MenuItem ml={5}>February</MenuItem>
            <MenuItem ml={5}>March</MenuItem>
            <MenuItem ml={5}>April</MenuItem>
            <MenuItem ml={5}>May</MenuItem>
            <MenuItem ml={5}>June</MenuItem>
            <MenuItem ml={5}>July</MenuItem>
            <MenuItem ml={5}>August</MenuItem>
            <MenuItem ml={5}>September</MenuItem>
            <MenuItem ml={5}>October</MenuItem>
            <MenuItem ml={5}>November</MenuItem>
            <MenuItem ml={5}>December</MenuItem>
        </MenuList>
        </Menu>
        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronForwardCircleSharp />}
        />

        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronBackCircleSharp />}
            ml={5}
        />
        <Menu>
        <MenuButton as={Button} variant='outline' colorScheme='blue' ml={1} mr={1} color="#6284FF" size='lg' fontSize={'3xl'} rightIcon={<IoChevronDownCircleOutline />}>
            <Text color="black" p={2} mt={3}>Day</Text>
        </MenuButton>
        <MenuList maxH="230px" overflowY="auto" w="100" overflowX="hidden" fontSize={'xl'}>
            <MenuItem ml={5}>1</MenuItem>
            <MenuItem ml={5}>2</MenuItem>
            <MenuItem ml={5}>3</MenuItem>
            <MenuItem ml={5}>4</MenuItem>
            <MenuItem ml={5}>5</MenuItem>
            <MenuItem ml={5}>6</MenuItem>
            <MenuItem ml={5}>7</MenuItem>
            <MenuItem ml={5}>8</MenuItem>
            <MenuItem ml={5}>9</MenuItem>
            <MenuItem ml={5}>10</MenuItem>
            <MenuItem ml={5}>11</MenuItem>
            <MenuItem ml={5}>12</MenuItem>
            <MenuItem ml={5}>13</MenuItem>
            <MenuItem ml={5}>14</MenuItem>
            <MenuItem ml={5}>15</MenuItem>
            <MenuItem ml={5}>16</MenuItem>
            <MenuItem ml={5}>17</MenuItem>
            <MenuItem ml={5}>18</MenuItem>
            <MenuItem ml={5}>19</MenuItem>
            <MenuItem ml={5}>20</MenuItem>
            <MenuItem ml={5}>21</MenuItem>
            <MenuItem ml={5}>22</MenuItem>
            <MenuItem ml={5}>23</MenuItem>
            <MenuItem ml={5}>24</MenuItem>
            <MenuItem ml={5}>25</MenuItem>
            <MenuItem ml={5}>26</MenuItem>
            <MenuItem ml={5}>27</MenuItem>
            <MenuItem ml={5}>28</MenuItem>
            <MenuItem ml={5}>29</MenuItem>
            <MenuItem ml={5}>30</MenuItem>
            <MenuItem ml={5}>31</MenuItem>
        </MenuList>
        </Menu>
        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronForwardCircleSharp />}
        />

        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronBackCircleSharp />}
            ml={5}
        />
        <Menu>
        <MenuButton as={Button} variant='outline' colorScheme='blue' ml={1} mr={1} color="#6284FF" size='lg' fontSize={'3xl'} rightIcon={<IoChevronDownCircleOutline />}>
            <Text color="black" p={2} mt={3}>Year</Text>
        </MenuButton>
        <MenuList maxH="230px" overflowY="auto" w="100" overflowX="hidden" fontSize={'xl'}>
            <MenuItem ml={5}>2023</MenuItem>
            <MenuItem ml={5}>2024</MenuItem>
            <MenuItem ml={5}>2025</MenuItem>
            <MenuItem ml={5}>2026</MenuItem>
            <MenuItem ml={5}>2027</MenuItem>
            <MenuItem ml={5}>2028</MenuItem>
            <MenuItem ml={5}>2029</MenuItem>
            <MenuItem ml={5}>2030</MenuItem>
            <MenuItem ml={5}>2031</MenuItem>
            <MenuItem ml={5}>2032</MenuItem>
            <MenuItem ml={5}>2033</MenuItem>
            <MenuItem ml={5}>2034</MenuItem>
        </MenuList>
        </Menu>
        <IconButton
            variant='outline'
            colorScheme='blue'
            color="#6284FF"
            aria-label='previousMonth'
            size='lg'
            fontSize={'3xl'}
            icon={<IoChevronForwardCircleSharp />}
        />
  
        </Center>
  
        <HStack justify={"left"} p={5}  H={"96%"} width={ "96%"}>
            <VStack  H={"100%"} width={"60%" } align="top-left" justify={"left"}>
            <Heading>Tasks</Heading>
  
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