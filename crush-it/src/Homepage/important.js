import React, {useState} from "react";
import { Heading, Card, Button, Image, Box,Flex, Text,Input, IconButton} from '@chakra-ui/react';
import {Accordion,AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'
import dropD from '../media/arrow-circle-down.svg'
import editImg from '../media/edit-2.png'
import saveImg from '../media/Vector.svg'
import addSqr from '../media/add-square.svg'
import subSqr from '../media/minus-square.svg'


//creates a editable note container
function EditableNote( txt ) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(txt); // Replace with your initial text
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handleInputChange = (event) => {
      setText(event.target.value);
    };
    return (
      <div>
         <Flex justifyContent="space-between">
            <Box fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={"#545454"}>Notes</Box>
            <Box boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                {isEditing ? <Image borderRadius={"6"} bg="#6284FF" boxSize="20px"  src={saveImg}></Image> : <Image boxSize="20px" src={editImg}></Image>}
            </Box>
        </Flex>
        {isEditing ? (
          <Input fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#1F1F1F"}
            value={text}
            onChange={handleInputChange}
            autoFocus
          />
        ) : (
          <Text fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#1F1F1F"}>{text}</Text>
        )}
      </div>
    );
  }

// creates an editable pmodoro timer form
  function EditablePomo( txt ) {
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

    const handlePClick = () => {
        const inp = parseInt(text);
        setText(inp+1)
    }

    const handleSClick = () => {
        const inp = parseInt(text);
        if(inp -1 >= 1){
            setText(inp-1)
        }
        
    }
   
    return (
      <>
        <Flex alignItems={"center"}>
         
            <Box flex={"1"} fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={"#1F1F1F"}>Number of pomodoro timers (30 min each)</Box>
            <Flex flex={"1"} justifyContent={"flex-end"}>
            {isEditing ? (
                <>
                <Box marginRight={5} boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handleSClick}>
                    <Image borderRadius={"6"}  boxSize="20px"  src={subSqr}/>
                </Box>
                
                <Text marginRight={5} fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#FE754D"}
                    onChange={handleInputChange}
                >{text}</Text>
                <Box marginRight={5} boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handlePClick}>
                    <Image borderRadius={"6"}  boxSize="20px"  src={addSqr}/>
                </Box>
                </>
            ) : (
                <Box marginRight="5" fontFamily={"'DM Sans', sans-serif"} fontSize={"16px" } textColor={"#FE754D"} >{text}</Box>
            )}

            <Box boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                {isEditing ? <Image borderRadius={"6"} bg="#6284FF" boxSize="20px"  src={saveImg}></Image> : <Image boxSize="20px" src={editImg}></Image>}
            </Box>
            </Flex>
        
        </Flex>
            
      </>
    );
  }


function createCard( elements){
    // create all card views inside of elements
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
                            {EditablePomo(elements[i][2])}
                            {EditableNote(elements[i][1])}
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



function Important() {
// get all topPriority taks

//split into 2d arrays [ [ Title, description, pomoTimer#, status]]
//status = notStarted, inProgress, finished
let elements = [["Homework", "This is a hw", 1, "finished" ], ["Homework 2","This is a hw", 3, "finished"]]

return(
  
             
    <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
  
        <Heading>
            Important
        </Heading>
        {createCard(elements) }
  
    </Card>
)
}

export default  Important;