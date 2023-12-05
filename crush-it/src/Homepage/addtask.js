import React, {useState, useEffect} from 'react';
import { FormErrorMessage, useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Textarea, Select, FormControl, FormLabel, VStack, HStack} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function AddTask(props) {

  //use date.dateSelected to get the date selected by the datePicker component.
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [timers, setTimers] = useState(1);
  const [priorityError, setPriorityError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    setTitleError(false)
  }, [title])

  useEffect(() => {
    setPriorityError(false)
  }, [priority])

  // Delete unsaved task creation values
  useEffect(() => {
    setTitle('')
    setDescription('')
    setPriority('')
    setTimers(1)
  }, [isOpen])

  //Bug handling for pomodoro number field
  useEffect(() => {
  }, [timers])

    const onSubmit = async (e) => {
      e.preventDefault();
      setPriorityError(false);
      setTitleError(false);
      var topTasks = []
      var importantTasks = []
      var otherTasks = []
      await fetch('http://localhost:5000/api/tasks/' + props.user)
      .then(res => res.json())
      .then(data => {topTasks = data.topTasks; importantTasks = data.importantTasks; otherTasks = data.otherTasks})
      .catch((err) => console.log(err))

      if(!title.length > 0){
        setTitleError(true);
        return -1;
      }

      if (priority === 'Top') {
        if (topTasks[0] === null) {
          topTasks = [{dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0,  status: 'NS'}]  
        } else {
          topTasks.push({dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0, status: 'NS'})
        }        
      }
      else if (priority === 'Important') {
        if (importantTasks[0] === null) {
          importantTasks = [{dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0, status: 'NS'}]  
        } else {
          importantTasks.push({dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0, status: 'NS'})
        }
      }
      else if (priority === 'Other') {
        if (otherTasks[0] === null) {
          otherTasks = [{dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0, status: 'NS'}]  
        } else {
          otherTasks.push({dateAssigned: props.dateSelected, title: title, description: description, priority: priority, pomodoroTimers: timers, completedPomodoroTimers:0, status: 'NS'})
        }
      }
      else{
        setPriorityError(true);
        return -1;
      }

    const response = await fetch('http://localhost:5000/api/tasks/' + props.user, {
      method: "PUT",
      body: JSON.stringify({
        username: props.user,
        topTasks: topTasks,
        importantTasks: importantTasks,
        otherTasks: otherTasks,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      console.log(response)
    } else {
      props.handleTop(topTasks)
      props.handleImportant(importantTasks)
      props.handleOther(otherTasks)
    }

    onClose();
    setTitle('')
    setDescription('')
    setPriority('')
    setTimers(1)
  }


  return (
      <>
      <IconButton  boxSize={39} onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                      colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>

                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Add A New Task</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          <VStack spacing={4}>
                            <FormControl isInvalid={titleError} isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input type="text"  placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                            {titleError && (<FormErrorMessage>A title is required</FormErrorMessage>)}
                            </FormControl>
                                            
                          <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Enter task description"
                                rows={3}
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)}
                            />
                          </FormControl>

                            <HStack w={'100%'} align={"flex-start"} >
                            <FormControl isInvalid={priorityError} isRequired>
                            <FormLabel>Priority</FormLabel>
                            <Select data-testid="select" placeholder='Select priority'  value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="Top">Top</option>
                                <option value="Important">Important</option>
                                <option value="Other">Other</option>
                            </Select>
                            {priorityError && (<FormErrorMessage>Select a valid option.</FormErrorMessage>)}
                            </FormControl>
  
                            <FormControl>
                                <FormLabel># of Pomodoro Timers</FormLabel>
                                <NumberInput  min={1} value={timers} >
                                  <NumberInputField data-testid="pomoNum" onChange={(e) => {if (/^\d+$/.test(e.target.value)) {setTimers(e.target.value)}}}/>
                                  <NumberInputStepper>
                                    <NumberIncrementStepper data-testid="add1" onClick={() => setTimers(1 + Number(timers))}/>
                                    <NumberDecrementStepper data-testid="sub1" onClick={() => {if (timers > 1) {setTimers(timers - 1)}}}/>
                                  </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            </HStack>
                            </VStack>
                          </ModalBody>
                
                          <ModalFooter>
                            <Button data-testid="close" variant='ghost'  onClick={onClose}>Cancel</Button>
                            <Button data-testid="save" colorScheme='blue' mr={3} onClick={e => onSubmit(e)}>
                              Save
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
        </>  

  );
};

export default AddTask;