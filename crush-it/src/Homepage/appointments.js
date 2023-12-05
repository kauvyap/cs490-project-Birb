import React, { useEffect, useState } from "react";
import {Box, Table, Tbody, TableContainer, Tr, Td, useColorModeValue} from '@chakra-ui/react';
import AppointmentContainer from "./appointmentContainer";
import {parse, format, addDays, parseISO, getHours, getMinutes, setHours, setMinutes, setSeconds, setMilliseconds} from 'date-fns';

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

    var list= [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]]

    useEffect(() => {
        if (props.username !== null && props.selectedDate !== null && data === null) {
            const dateString = props.selectedDate
            const parsedDate = parse(dateString, "d-MMMM-yyyy", new Date());
            const endOfDayParsed = addDays(parsedDate, 1)
            const endOfDayFormatted = format(setHours(setMinutes(setSeconds(setMilliseconds(endOfDayParsed, 0), 0), 0), 5), "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
            const formattedDate = format(setHours(setMinutes(setSeconds(setMilliseconds(parsedDate, 0), 0), 0), 5), "yyyy-MM-dd'T'HH:mm:ss.SSS") + 'Z';
        
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
            if (data.items !== null && data.items !== undefined) {
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
           
                {createTable(list, events)}
                
            
        </TableContainer>
    </Box>
  
  )
    
}


function createTable(list, events){

    var child = []

    if(events !== null){
        for(var i = 0; i < events.length; i++){
            //is event at 30 min mark or more?
            if(events[i][4]>=30){
                list[parseInt( events[i][3],10)*2] = events[i]
            }
            else{//if not mark as starting at the hour
                list[parseInt( events[i][3],10)*2-1] = events[i]
                list[parseInt( events[i][3],10)*2] = events[i]
            }
            var x = parseInt( events[i][3],10)+1
            // mark both hour and minute until it reaches the event
            while(x <= events[i][5]){
                if(x == parseInt(events[i][5],10) && parseInt(events[i][6],10) <= 30){
                }
                else{
                    list[x*2] = events[i];
                }
                if(x == parseInt(events[i][5],10) && parseInt(events[i][6],10) == 0){
                }else{
                    list[x*2-1] = events[i];
                }
                
                x+=1;
            }
        }

    }

    

    console.log(list)
    var boolIsEnd = false;
    var boolIsCont = false;
    var lastT = "";
    for( var i=5; i < 25; i++){
        if(i <= 12){//hours before 12 AM
            if(list[i*2-1].length >= 1){//insert hours
                if(lastT !== list[i*2-1][0]){//check if it is a continuation
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
                            <AppointmentContainer title={list[i*2-1][0]} isFocus={list[i*2-1][1]} notes={list[i*2-1][2]} isCont={false}/>
                        </Tr>
                        
                    )
                    boolIsCont = true
                    
                }
                else{// if it is a cont
                    if(list[i*2].length < 1 || lastT !== list[i*2][0] ){//It is the end
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
                            <AppointmentContainer title={""} isFocus={list[i*2-1][1]} notes={list[i*2-1][2]} isCont={true} isEnd={true}/>
                        </Tr>
                        
                    )
                    }
                    else{//It is not the end
                        child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
                            <AppointmentContainer title={""} isFocus={list[i*2-1][1]} notes={list[i*2-1][2]} isCont={true} isEnd={false}/>
                        </Tr>)
                    }
                }
                
                lastT = "" + list[i*2-1][0];
                
            }
            else{//no tasks
                child.push(
                    <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i}  AM</Td>
                    </Tr>
                )
            }
            if(list[i*2].length >= 1){//check 30 minute for task
                
                if(lastT !== list[i*2][0]){
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                            <AppointmentContainer title={list[i*2][0]} isFocus={list[i*2][1]} notes={list[i*2][2]} isCont={false}/>
                        </Tr>
                        
                    )
                    boolIsCont = true;
                }
                else{
                    if(list[i*2+1].length < 1 || lastT !== list[i*2][0] ){
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                            <AppointmentContainer title={""} isFocus={list[i*2][1]} notes={list[i*2][2]} isCont={true} isEnd={true}/>
                        </Tr>
                    )}
                    else{
                        child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                            <AppointmentContainer title={""} isFocus={list[i*2][1]} notes={list[i*2][2]} isCont={true} isEnd={false}/>
                        </Tr>)
                    }
                }
                
                lastT = "" + list[i*2][0];
            }
            else{
                child.push(
                    <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                    </Tr>
                )
            }
            if(i===4){
                break;
            }
        }
        else{
            if(list[i*2-1].length >= 1){// if it is an Hour
                if(lastT !== list[i*2-1][0]){//check if it is a cont
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
                            <AppointmentContainer title={list[i*2-1][0]} notes={list[i*2-1][2]} remaining={list[i*2-1][3]} total={list[i][4]} isCont={false}/>
                        </Tr>
                    )
                    boolIsCont = true
                }
                else{//if is cont
                    if(list[i*2].length < 1 || lastT !== list[i*2][0] ){//check if it is the end
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
                            <AppointmentContainer title={""} notes={list[i*2-1][2]} remaining={list[i*2-1][3]} total={list[i*2-1][4]} isCont={true} isEnd={true}/>
                        </Tr>
                    )
                    }
                    else{
                        child.push(
                            <Tr>
                                <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
                                <AppointmentContainer title={""} notes={list[i*2-1][2]} remaining={list[i*2-1][3]} total={list[i*2-1][4]} isCont={true} isEnd={false}/>
                            </Tr>
                        )
                    }
                }
                lastT=list[i*2-1][0]
                
            }
            else{
                child.push(
                    <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}>{i-12}  PM</Td>
        
                    </Tr>
                )
            }
            if(list[i*2].length >= 1){//it is min
                if(lastT !==list[i*2][0] ){//check if last insert was ==
                    boolIsCont = true
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                            <AppointmentContainer title={list[i*2][0]} notes={list[i*2][2]} remaining={list[i*2][3]} total={list[i*2][4]} isCont={false}/>
                        </Tr>
                    )
                }
                else{// if it is
                    if(list[i*2+1].length < 1 || lastT !== list[i*2][0] ){//check if next is also equal
                    child.push(
                        <Tr>
                            <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                            <AppointmentContainer title={""} notes={list[i*2][2]} remaining={list[i*2][3]} total={list[i*2][4]} isCont={true} isEnd={true}/>
                        </Tr>
                    )}
                    else{
                        child.push(
                            <Tr>
                                <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
                                <AppointmentContainer title={""} notes={list[i*2][2]} remaining={list[i*2][3]} total={list[i*2][4]} isCont={true} isEnd={false}/>
                            </Tr>
                        )
                    }
                }
                lastT = "" + list[i*2][0];
                
            }
            else{
                child.push(
                <Tr>
                        <Td height={"45px"} padding={0} paddingLeft={6} paddingBottom={6} verticalAlign="top" width={"80px"}></Td>
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