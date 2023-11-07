import React from "react";
import { Heading, Card, Container, VStack} from '@chakra-ui/react';

function Important() {

return(
  
             
    <Card bg="#F5F7F9" Width={"100%"} height={200} maxH={"200px"} p={5} marginBottom={5} overflowY={"auto"}>
  
        <Heading>
            Important              
        </Heading>
        <Card margin={2} padding={3}>
            Homework
        </Card>
  
    </Card>
)
}

export default  Important;