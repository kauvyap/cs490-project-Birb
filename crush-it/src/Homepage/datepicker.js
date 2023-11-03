import React from 'react';
import {Center, IconButton, Menu, MenuButton, MenuList, MenuItem, Button, Text} from '@chakra-ui/react';
import {IoChevronBackCircleSharp, IoChevronForwardCircleSharp, IoChevronDownCircleOutline} from 'react-icons/io5'

const DatePicker = () => {
  return (
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
        <MenuList maxH="230px" overflowY="auto" w="auto" overflowX="hidden" fontSize={'xl'}
                css={`
                &::-webkit-scrollbar {
                    width: 8px;
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
                    background-color: #1E40AF; // Change the color when clicked
                  }
        `}>
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
        <MenuList maxH="230px" overflowY="auto" w="auto" overflowX="hidden" fontSize={'xl'}
                css={`
                &::-webkit-scrollbar {
                    width: 8px;
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
                    background-color: #1E40AF; // Change the color when clicked
                  }
        `}>
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
        <MenuList maxH="230px" overflowY="auto" w="auto" overflowX="hidden" fontSize={'xl'}
                css={`
                &::-webkit-scrollbar {
                    width: 8px;
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
                    background-color: #1E40AF; // Change the color when clicked
                  }
        `}>
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
  );
};

export default DatePicker;