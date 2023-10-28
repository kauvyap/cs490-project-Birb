import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import navbar from "./navbar2";
import { NavLink } from "react-router-dom";
import { Box, VStack, Text, Button,ChakraProvider } from "@chakra-ui/react";


 // Here, we display our Navbar
export default function Sidebar() {
      return (
        
        <VStack align="start" height={"100vh"} width="55" spacing={4} p={4} bg="gray.200">
          <Text fontSize="30xl">Crush It</Text>
          <Button variant="outline">Item 1</Button>
          <Button variant="outline">Item 2</Button>
          <Button variant="outline">Item 3</Button>
        </VStack>
        
      );
}


