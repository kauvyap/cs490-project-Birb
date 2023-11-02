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
        <MenuList maxH="220px" overflowY="auto" w="200px">
            <MenuItem ml={5} fontSize={'lg'}>January</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>February</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>March</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>April</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>May</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>June</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>July</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>August</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>September</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>October</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>November</MenuItem>
            <MenuItem ml={5} fontSize={'lg'}>December</MenuItem>
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
        <MenuList>
            <MenuItem>1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
            <MenuItem>4</MenuItem>
            <MenuItem>5</MenuItem>
            <MenuItem>6</MenuItem>
            <MenuItem>7</MenuItem>
            <MenuItem>8</MenuItem>
            <MenuItem>9</MenuItem>
            <MenuItem>10</MenuItem>
            <MenuItem>11</MenuItem>
            <MenuItem>12</MenuItem>
            <MenuItem>13</MenuItem>
            <MenuItem>14</MenuItem>
            <MenuItem>15</MenuItem>
            <MenuItem>16</MenuItem>
            <MenuItem>17</MenuItem>
            <MenuItem>18</MenuItem>
            <MenuItem>19</MenuItem>
            <MenuItem>20</MenuItem>
            <MenuItem>21</MenuItem>
            <MenuItem>22</MenuItem>
            <MenuItem>23</MenuItem>
            <MenuItem>24</MenuItem>
            <MenuItem>25</MenuItem>
            <MenuItem>26</MenuItem>
            <MenuItem>27</MenuItem>
            <MenuItem>28</MenuItem>
            <MenuItem>29</MenuItem>
            <MenuItem>30</MenuItem>
            <MenuItem>31</MenuItem>
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
        <MenuList>
            <MenuItem>2023</MenuItem>
            <MenuItem>2024</MenuItem>
            <MenuItem>2025</MenuItem>
            <MenuItem>2026</MenuItem>
            <MenuItem>2027</MenuItem>
            <MenuItem>2028</MenuItem>
            <MenuItem>2029</MenuItem>
            <MenuItem>2030</MenuItem>
            <MenuItem>2031</MenuItem>
            <MenuItem>2032</MenuItem>
            <MenuItem>2033</MenuItem>
            <MenuItem>2034</MenuItem>
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