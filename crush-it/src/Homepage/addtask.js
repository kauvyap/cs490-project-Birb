import React from 'react';
import { useDisclosure } from "@chakra-ui/react";
import { IconButton, Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function AddTask() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <IconButton onClick={onOpen} isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                        colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>

                        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text fontWeight='bold' mb='1rem'>
                              You can scroll the content behind the modal
                            </Text>
                          </ModalBody>
                
                          <ModalFooter>
                            <Button colorScheme='blue' mr={3} >
                              Save
                            </Button>
                            <Button variant='ghost'  onClick={onClose}>Cancel</Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
        </>  
  );
};

export default AddTask;