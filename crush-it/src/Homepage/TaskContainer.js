import React, {useState} from "react";
import { Heading, Card, Image, Box,Flex, Text,Input, useColorModeValue} from '@chakra-ui/react';
import {Accordion,AccordionItem, AccordionButton, AccordionPanel, Icon } from '@chakra-ui/react'
import {IoChevronDownCircleOutline, IoMove, IoSwapHorizontalSharp} from 'react-icons/io5'
import {IoIosRadioButtonOff, IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from 'react-icons/io'
import editImg from '../media/edit-2.svg'
import ip from '../media/fi_7154459.svg'
import saveImg from '../media/Vector.svg'
import addSqr from '../media/add-square.svg'
import subSqr from '../media/minus-square.svg'



//creates a swapable icon on the left side of the screen
function EditableIcon( txt ){

    const [currentIcon, setCurrentIcon] = useState(txt);
    const hv = useColorModeValue("#F3F3F3", "#1a202c");

    
    const toggleIcon = () => {
        switch (currentIcon) {
          case 'NS':
            setCurrentIcon('IP');
            break;
          case 'IP':
            setCurrentIcon('FN');
            break;
          case 'FN':
            setCurrentIcon('MO');
            break;
          case 'MO':
            setCurrentIcon("default");
            break;
          default:
            setCurrentIcon("NS");
        }
      };

      return(
        
            currentIcon === 'NS'
            ? <Icon as={IoIosRadioButtonOff} boxSize={"22"} marginRight={"5px"} _hover={{bg:hv}} style={{ cursor: 'pointer' }} onClick={toggleIcon}/>
            : currentIcon === 'IP'
            ? <Image src={ip} boxSize={"22"} marginRight={"5px"}  _hover={{bg:hv}} style={{ cursor: 'pointer' }} onClick={toggleIcon}/>
            : currentIcon === 'FN'
            ? <Icon as={IoIosCheckmarkCircleOutline} boxSize={"22"} _hover={{bg:hv}} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
            :currentIcon === 'MO'
            ? <Icon as={IoSwapHorizontalSharp} boxSize={"22"} _hover={{bg:hv}} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
            : <Icon as={IoIosCloseCircleOutline} boxSize={"22"} _hover={{bg:hv}} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
        
      );
}


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

    const ic = useColorModeValue('#6284FF', '#90cdf4');
    const tx = useColorModeValue("#1f1f1f", "#CCCCCC");
    const nt = useColorModeValue("#545454", "#999999");
    const hv = useColorModeValue("#F3F3F3", "#1a202c");

    return (
      <div>
         <Flex justifyContent="space-between" marginBottom={"2px"}>
            <Box fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={nt}>Notes</Box>
            <Box boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} _hover={{bg:hv}} onClick={handleEditClick}>
            {isEditing ? <Image borderRadius={"6"} bg={ic} boxSize="20px"  src={saveImg} />: <Image boxSize="20px" src={editImg}/>}
            </Box>
        </Flex>
        {isEditing ? (
          <Input fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={tx}
            value={text}
            onChange={handleInputChange}
            autoFocus
          />
        ) : (
          <Text fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} fontWeight="bold" textColor={tx}>{text}</Text>
        )}
      </div>
    );
  }

// creates an editable pmodoro timer form
  function EditablePomo( txt ) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(txt); // Replace with your initial text

    const ic = useColorModeValue('#6284FF', '#90cdf4');
    const tx = useColorModeValue("#1f1f1f", "#CCCCCC");
    const hv = useColorModeValue("#F3F3F3", "#1a202c");
  
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
         
            <Box flex={"1"} fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={tx}>Number of pomodoro timers (30 min each)</Box>
            <Flex flex={"1"} justifyContent={"flex-end"}>
            {isEditing ? (
                <>
                <Box marginRight={5} boxSize="20px" _hover={{bg:hv}} borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handleSClick}>
                    <Image borderRadius={"6"}  boxSize="20px"  src={subSqr}/>
                </Box>
                
                <Text marginRight={5} fontFamily={"'DM Sans', sans-serif"} fontSize={"14px"} textColor={"#FE754D"}
                    onChange={handleInputChange}
                >{text}</Text>
                <Box marginRight={5} boxSize="20px" _hover={{bg:hv}} borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handlePClick}>
                    <Image borderRadius={"6"}  boxSize="20px"  src={addSqr}/>
                </Box>
                </>
            ) : (
                <Box marginRight="5" fontFamily={"'DM Sans', sans-serif"} fontSize={"16px" } textColor={"#FE754D"} >{text}</Box>
            )}

            <Box boxSize="20px" _hover={{bg:hv}} borderRadius={"6"} style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                {isEditing ? <Image borderRadius={"6"} bg={ic} boxSize="20px"  src={saveImg}></Image> : <Image boxSize="20px" src={editImg}></Image>}
            </Box>
            </Flex>
        
        </Flex>
            
      </>
    );
  }

function TaskContainer(props) {
  // get all topPriority tasks

  // split into 2d arrays [ [ Title, description, pomoTimer#, status]]
  // status = notStarted, inProgress, finished
  const elements = props.categoryList;
  const bg = useColorModeValue('#F5F7F9', '#1A202C');
  const hd = useColorModeValue('#6284FF', '#90cdf4');
  console.log(props);

  const createCard = (elements) => {
    // create all card views inside of elements
    let cards = [];

    for (let i = elements.length - 1; i >= 0; i--) {
      cards.push(
        <Card borderRadius="8" key={i} margin={2} padding={3}>
          <Accordion allowToggle>
            <AccordionItem border="none">
              {({ isExpanded }) => (
                <>
                  <Flex justifyContent="center">
                    <>
                      <Box as="span" flex="1" textAlign="left">
                        <Flex justifyContent="flex-left">
                          {/* Use hd directly in the following line */}
                          {EditableIcon(elements[i][3])}
                          <Heading
                            fontWeight="700"
                            fontSize="16px"
                            textColor={hd}
                            fontFamily="'DM Sans', sans-serif"
                          >
                            {elements[i][0]}
                          </Heading>
                        </Flex>
                      </Box>
                    </>
                    <Flex justifyContent="flex-end">
                      <Icon as={IoMove} marginRight="4px" boxSize="20px" />
                      <AccordionButton w="20px" h="20px" justifyContent="center">
                        {isExpanded ? (
                          <Icon boxSize="22px" as={IoChevronDownCircleOutline} />
                        ) : (
                          <Icon
                            boxSize="22px"
                            transform="rotate(270deg)"
                            as={IoChevronDownCircleOutline}
                          />
                        )}
                      </AccordionButton>
                    </Flex>
                  </Flex>
                  <AccordionPanel pb={4}>
                    <Box height="1px" width="100%" bg="#E2EAF1"></Box>
                    {EditablePomo(elements[i][2])}
                    {EditableNote(elements[i][1])}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          </Accordion>
        </Card>
      );
    }

    return <div>{cards}</div>;
  };

  return (
    <Card bg={bg} width="100%" height={200} maxH="200px" p={5} marginBottom={5} overflowY="auto">
      <Heading>{props.category}</Heading>
      {createCard(elements)}
    </Card>
  );
}

export default TaskContainer;