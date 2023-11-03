import React, { useState } from 'react';
import {Center, IconButton, Menu, MenuButton, MenuList, MenuItem, Button, Text} from '@chakra-ui/react';
import {IoChevronBackCircleSharp, IoChevronForwardCircleSharp, IoChevronDownCircleOutline} from 'react-icons/io5'

function DatePicker() {
    const currentDate = new Date();
    const curMonth = currentDate.toLocaleString('default', { month: 'long' });
    const curDate = currentDate.getDate().toString();
    const curYear = currentDate.getFullYear().toString();


    const [selectedMonth, setSelectedMonth] = useState(curMonth);
    const [selectedDate, setSelectedDate] = useState(curDate);
    const [selectedYear, setSelectedYear] = useState(curYear);
  
    const handleMonthClick = (month) => {
      setSelectedMonth(month);
    };
  
    const handleDateClick = (date) => {
      setSelectedDate(date);
    };
  
    const handleYearClick = (year) => {
      setSelectedYear(year);
    };
  
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dates = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const years = Array.from({ length: 10 }, (_, i) => (2023 + i).toString());
  

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
            <Text color="black" p={2} mt={3}>{selectedMonth}</Text>
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
            {months.map((month) => (
            <MenuItem key={month} onClick={() => handleMonthClick(month)}>
              {month}
            </MenuItem>
          ))}
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
            <Text color="black" p={2} mt={3}>{selectedDate}</Text>
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
            {dates.map((date) => (
            <MenuItem key={date} onClick={() => handleDateClick(date)}>
              {date}
            </MenuItem>
          ))}
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
            <Text color="black" p={2} mt={3}>{selectedYear}</Text>
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
            {years.map((year) => (
            <MenuItem key={year} onClick={() => handleYearClick(year)}>
              {year}
            </MenuItem>
          ))}
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