import React from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, 
         Box, Input, Textarea, Select, FormControl, FormLabel, VStack, HStack, NumberInput, NumberInputField} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function AddTask() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <IconButton boxSize={39} onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                        colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>

                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Add A New Task</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                          <VStack spacing={4}>
                            <FormControl>
                            <FormLabel>Title</FormLabel>
                            <Input type="text" placeholder="Enter task title" />
                            </FormControl>

                            <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Enter task description"
                                rows={3}
                            />
                            </FormControl>

                            <HStack w={'100%'}>
                            <FormControl>
                            <FormLabel>Priority</FormLabel>
                            <Select>
                                <option value="top">Top</option>
                                <option value="important" selected>
                                Important
                                </option>
                                <option value="other">Other</option>
                            </Select>
                            </FormControl>
  
                            <FormControl>
                                <FormLabel># of Pomodoro Timers</FormLabel>
                                <NumberInput defaultValue={1} min={1}>
                                    <NumberInputField />
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