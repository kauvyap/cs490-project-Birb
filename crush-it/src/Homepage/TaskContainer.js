import React, {useState} from "react";
import { Heading, Card, Image, Box,Flex, Text,Input} from '@chakra-ui/react';
import {Accordion,AccordionItem, AccordionButton, AccordionPanel, Icon, useColorMode, useColorModeValue } from '@chakra-ui/react'
import {IoChevronDownCircleOutline, IoMove, IoSwapHorizontalSharp} from 'react-icons/io5'
import {IoIosRadioButtonOff, IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline} from 'react-icons/io'
import editImg from '../media/edit-2.svg'
import editImgD from '../media/edit-2d.svg'
import ip from '../media/fi_7154459.svg'
import ipD from '../media/fi_7154459d.svg'
import saveImg from '../media/Vector.svg'
import addSqr from '../media/add-square.svg'
import subSqr from '../media/minus-square.svg'



//creates a swapable icon on the left side of the screen
function EditableIcon( txt ){

    const [currentIcon, setCurrentIcon] = useState(txt);
    const hv = useColorModeValue("#F3F3F3", "#1a202c");

    const { colorMode } = useColorMode();
    const ipSource = colorMode === 'light' ? ip : ipD;

    
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
            ? <Icon as={IoIosRadioButtonOff} boxSize={"22px"} marginRight={"5px"} _hover={{bg:hv }} style={{ cursor: 'pointer' }} onClick={toggleIcon}/>
            : currentIcon === 'IP'
            ? <Image src={ipSource} boxSize={"22px"} marginRight={"5px"}  _hover={{bg:hv }} style={{ cursor: 'pointer' }} onClick={toggleIcon}/>
            : currentIcon === 'FN'
            ? <Icon as={IoIosCheckmarkCircleOutline} boxSize={"22px"} _hover={{bg:hv }} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
            :currentIcon === 'MO'
            ? <Icon as={IoSwapHorizontalSharp} boxSize={"22px"} _hover={{bg:hv }} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
            : <Icon as={IoIosCloseCircleOutline} boxSize={"22px"} _hover={{bg:hv }} style={{ cursor: 'pointer' }} marginRight={"5px"} onClick={toggleIcon}/>
        
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

    const { colorMode } = useColorMode();
    const editImgSource = colorMode === 'light' ? editImg : editImgD;

    return (
      <div>
         <Flex justifyContent="space-between" marginBottom={"2px"}>
         <Box fontSize={"12px" }  fontFamily={"'DM Sans', sans-serif"} textColor={nt}>Notes</Box>
            <Box boxSize="20px" borderRadius={"6"} style={{ cursor: 'pointer' }} _hover={{bg:hv}} onClick={handleEditClick}>
            {isEditing ? <Image borderRadius={"6"} bg={ic} boxSize="20px"  src={saveImg} />: <Image boxSize="20px" src={editImgSource}/>}
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

    const { colorMode } = useColorMode();
    const editImgSource = colorMode === 'light' ? editImg : editImgD;
  
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
                {isEditing ? <Image borderRadius={"6"} bg={ic} boxSize="20px"  src={saveImg}></Image> : <Image boxSize="20px" src={editImgSource}></Image>}
            </Box>
            </Flex>
        
        </Flex>
            
      </>
    );
  }


function TaskContainer(props) {
// get all topPriority taks

//split into 2d arrays [ [ Title, description, pomoTimer#, status]]
//status = notStarted, inProgress, finished
const elements = props.categoryList
const bg = useColorModeValue('#F5F7F9', '#1A202C')
const hd = useColorModeValue('#6284FF', '#90cdf4');
console.log(props)

const createCard = (elements) => {
  // create all card views inside of elements
  // [["Complete Math Homework", "This is a hw", 1, "FN"]]
  var list = []
  console.log(elements)
  if (typeof elements !== 'undefined') {
    if (elements[0] !== null) {
      Object.keys(elements).map((element) => {
        list.push([elements[element].title, elements[element].description, elements[element].pomodoroTimers, elements[element].priority])
      })
    }
  }
  console.log(list)
  var cards = []

  for (let i = 0; i < list.length; i++){

      cards.push(
      
          <Card borderRadius={"8"} key={i} margin={2} padding={3}>
              <Accordion allowToggle >
                  <AccordionItem border={"none"}>

                      {({ isExpanded }) => (
                          <>
                          <Flex justifyContent={"center"}>
                          <>
                          <Box as="span" flex='1' textAlign='left'>
                              <Flex justifyContent={"flex-left"} alignItems={"top"}>
                              {EditableIcon(list[i][3])}<Heading fontWeight={"700"} fontSize={"16px"} textColor={hd} fontFamily={"'DM Sans', sans-serif"}>{list[i][0]}</Heading>
                              </Flex>
                          </Box>
                          </>
                          <Flex justifyContent={"flex-end"}>
                          <Icon as={IoMove} marginRight={"4px"} boxSize={"20px"}/>
                          <AccordionButton w="20px" h="20px" justifyContent={"center"}>
                          {isExpanded ? (
                              <Icon boxSize={"22px"} as={IoChevronDownCircleOutline}/>
                                  ) : (
                              <Icon boxSize={"22px"} transform="rotate(270deg)" as={IoChevronDownCircleOutline}/>
                              
                          )}
                          </AccordionButton>
                          </Flex>
                          </Flex>
                      <AccordionPanel pb={4}>
                          <Box height={"1px"} width={"100%"} bg={"#E2EAF1"} marginBottom={"2"}></Box>
                          {EditablePomo(list[i][2])}
                          {EditableNote(list[i][1])}
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

return(
             
    <Card borderRadius={"8"} bg={bg} Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"} 
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
                    background-color: #1E40AF; // Change the color when clicked`
                  }>
  
        <Heading fontSize={"20px"} fontWeight={"700"} fontFamily={"'DM Sans', sans-serif"}>
            {props.category}
        </Heading>
        <Box >
        {createCard(elements) }
        </Box>
    </Card>
)
}

export default TaskContainer;