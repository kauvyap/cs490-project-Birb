import React, {useState, useEffect} from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, NumberInput, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, NumberInputStepper, Textarea, Select, FormControl, FormLabel, VStack, HStack} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function AddTask(date) {
  //use date.dateSelected to get the date selected by the datePicker component.

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [timers, setTimers] = useState(1);

    // Delete unsaved task creation values
    useEffect(() => {
      setTitle('')
      setDescription('')
      setPriority('')
      setTimers(1)
    }, [isOpen])

    //Bug handling for pomodoro number field
    useEffect(() => {
      setTimers(timers)
    }, [timers])


    console.log("title", title)
    console.log("description", description)
    console.log("priority", priority)
    console.log("timers", timers)
    return (
        <>
        <IconButton boxSize={39} onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                        colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>

                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader> {date.dateSelected} - Add A New Task</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          <VStack spacing={4}>
                            <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)}/>
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

                            <HStack w={'100%'}>
                            <FormControl>
                            <FormLabel>Priority</FormLabel>
                            <Select placeholder='Select priority' value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="top">Top</option>
                                <option value="important" selected>
                                Important
                                </option>
                                <option value="other">Other</option>
                            </Select>
                            </FormControl>
  
                            <FormControl>
                                <FormLabel># of Pomodoro Timers</FormLabel>
                                <NumberInput min={1} value={timers} >
                                  <NumberInputField onChange={(e) => {if (/^\d+$/.test(e.target.value)) {setTimers(e.target.value)}}}/>
                                  <NumberInputStepper>
                                    <NumberIncrementStepper onClick={() => setTimers(1 + timers)}/>
                                    <NumberDecrementStepper onClick={() => {if (timers > 1) {setTimers(timers - 1)}}}/>
                                  </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                            </HStack>
                            </VStack>
                          </ModalBody>
                
                          <ModalFooter>
                            <Button variant='ghost'  onClick={onClose}>Cancel</Button>
                            <Button colorScheme='blue' mr={3} >
                              Save
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
        </>  
  );
};

export default AddTask;