import React, {useState} from "react";
import { Heading, Card, Button, Image, Box,Flex, Text,Input ,Spacer, Divider} from '@chakra-ui/react';
import {Accordion,AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'
import dropD from '../media/arrow-circle-down.svg'
import editImg from '../media/edit-2.png'
import saveImg2 from '../media/Vector.svg'

function EditableElement( txt ) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(txt); // Replace with your initial text
  
    const handleEditClick = () => {
        if(!isEditing){
            setIsEditing(!isEditing);
        }
        else{
            setIsEditing(!isEditing);
        }
    };
  
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div>
         <Flex justifyContent="space-between">
            <Box fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={"#545454"}>Notes</Box>
            <Button variant={"ghost"} onClick={handleEditClick}>
                {isEditing ? <Box boxSize="20px" borderRadius={"6"} bg="#6284FF" alignItems={"center"}><Image boxSize="20px" src={saveImg2}></Image></Box> : <Image boxSize="20px" src={editImg}></Image>}
            </Button>
            
        </Flex>
        {isEditing ? (
          <Input fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#1F1F1F"}
            value={text}
            onChange={handleInputChange}
            onBlur={handleEditClick}
            autoFocus
          />
        ) : (
          <Text fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#1F1F1F"}>{text}</Text>
        )}
        
      </div>
    );
  }





function createCard( elements){
    // create all card views inside on elements
    let cards = []

    for (let i = 0; i < elements.length; i++){

        cards.push(
        
            <Card key={i} margin={2} padding={3}>
                <Accordion allowToggle >
                    <AccordionItem>

                        {({ isExpanded }) => (
                            <>
                        
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                <Heading fontWeight={"700"} fontSize={"16px"} textColor={"#6284FF"} fontFamily={"'DM Sans', sans-serif"}>{elements[i][0]}</Heading>
                            </Box>
                            {isExpanded ? (
                                <Image transform="rotate(180deg)" src={dropD}></Image>
                                    ) : (
                                <Image src={dropD}></Image>
                             )}
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Box height={"1px"} width={"100%"} bg={"#E2EAF1"}></Box>
                            <Flex justifyContent="space-between"  >
                                <Box fontFamily={"'DM Sans', sans-serif"} fontSize={"12px" } textColor={"#1F1F1F"} >Number of pomodoro timers (30 min each)</Box>
                                <Box fontFamily={"'DM Sans', sans-serif"} fontSize={"16px" } textColor={"#FE754D"} >{elements[i][2]}</Box>
                            </Flex>
                           
                            {EditableElement(elements[i][1])}
                        </AccordionPanel>
                        </>
                        )}
                    </AccordionItem>

                </Accordion>  
            </Card>
        )
    }

    return (
        <div>
        {
        cards.map((el, index)=> 
            <div key={index}>{el}</div>
        )
        
        }
        </div>
    )
}



function topPrio() {
// get all topPriority taks

//split into 2d arrays [ [ Title, description, pomoTimer#, status]]
//status = notStarted, inProgress, finished
let elements = [["Homework", "This is a hw", 1, "finished" ], ["Homework 2","This is a hw", 3, "finished"]]

return(
  
             
    <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
  
        <Heading>
            Top Priority
        </Heading>
        {createCard(elements) }
  
    </Card>
)
}

export default  topPrio;