import React, { useEffect, useState } from "react";
import {Box, Table, Tbody, TableContainer, Tr, Td, useColorModeValue} from '@chakra-ui/react';
import AppointmentContainer from "./appointmentContainer";
import {parse, format, endOfDay, parseISO, getHours, getMinutes} from 'date-fns';

function Appointment(props){
    // const bg = useColorModeValue('#F5F7F9', '#1A202C')
    const cont = useColorModeValue("white", "#2d3748")

    // data = raw data from the google calendar api for the selected day
    const [data, setData] = useState(null);

    // ** FOR GUI **
    // events with relevant information from google calendar are stored here => check the second useEffect 
    // [
//     title, 
//     description (usually undefined), 
//     eventType(default, focusTime, etc.),
//     start hour,
//     start minutes,
//     end hour,
//     end minutes
//  ]
    const [events, setEvents] = useState([]);
    console.log('events from google calendar', events)
    
    //fill list with tasks to do today (do not use 0, use military time (1-24) and the function will convert to regular time)
    //title = string, isFocus = bool,
    var list= [[],["Hello1", true, "many", 0, 4],["Hello", false],["Hell", false],["Hel",true, "notes", 0, 4],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

    useEffect(() => {
        if (props.username !== null && props.selectedDate !== null && data === null) {
            const dateString = props.selectedDate
            const parsedDate = parse(dateString, "d-MMMM-yyyy", new Date());
            const endOfDayParsed = endOfDay(parsedDate)
            const endOfDayFormatted = format(endOfDayParsed, "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
            const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
        
            fetch("http://localhost:5000/api/events/calendar/" + props.username, {
                method: "POST",
                body: JSON.stringify({
                    start: formattedDate.toString(),
                    end: endOfDayFormatted.toString()
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(dataReturn => {setData(dataReturn)})
            .catch((err) => console.log(err));  
            
            console.log(data)
        }
    }, [props.username, props.selectedDate, data])
    


    useEffect(() => {
        if (data !== null) {
            if (data.items !== null) {
                const newEvents = data.items.map(item => ([
                    item.summary,
                    item.description,
                    item.eventType,
                    getHours(parseISO(item.start.dateTime)),
                    getMinutes(parseISO(item.start.dateTime)),
                    getHours(parseISO(item.end.dateTime)),
                    getMinutes(parseISO(item.end.dateTime))
                  ]));
                setEvents(newEvents)
            }
        }
    }, [data])


    return (
    <Box borderRadius={"10"} bg={cont} h={"680px"} marginTop={"5px"} overflowY={"auto"} boxShadow={"2px 5px 50px 0px rgba(36, 37, 40, 0.10)"} 
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
           
                {createTable(list)}
                
            
        </TableContainer>
    </Box>
  
  )
    
}


function createTable(list){

    var child = []

    console.log(list)
    console.log(list[0])
    for( var i=5; i < 25; i++){
        if(i <= 12){
            if(list[i].length >= 1){
                child.push(
                    <Tr>
                        <Td padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
                        <AppointmentContainer title={list[i][0]} isFocus={list[i][1]} notes={list[i][2]}/>
                    </Tr>
                )
            }
            else{
                child.push(
                    <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
    
                    </Tr>
                )
            }
            if(i===4){
                break;
            }
        }
        else{
            if(list[i].length >= 1){
                child.push(
                    <Tr>
                        <Td padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
                        <AppointmentContainer title={list[i][0]} notes={list[i][2]} remaining={list[i][3]} total={list[i][4]}/>
                    </Tr>
                )
            }
            else{
                child.push(
                    <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
        
                    </Tr>
                )
            }
            if(i===24){
                i=0;
            }
        } 
    }

    return(
        <Table variant='unstyled' key={list}>
            <Tbody >
                {child.map((el, index)=> 
                    <div key={index}>{el}</div>
                    )}
            </Tbody>
            
        </Table>
    )
}


export default Appointment;