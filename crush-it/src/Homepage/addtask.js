import React from 'react';
import { IconButton } from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

function AddTask() {
    return (
        <IconButton isRound={true} variant='solid' aria-label='Done' fontSize='15px' fontWeight={"extrabold"} icon={<AddIcon />} ml={4} mb={1.5}
                        colorScheme="blue" style={{ background: 'linear-gradient(#5D8EFF 100%, #3E6FE1 100%)', color: 'white' }}/>

    
  );
};

export default AddTask;