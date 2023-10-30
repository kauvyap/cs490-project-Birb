import React from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink,useLocation } from "react-router-dom";
import { Box, VStack, Text, Button, Image} from "@chakra-ui/react";

 // Here, we display our Navbar
export default function Sidebar() {

  const location = useLocation()
  if (location.pathname === "/" || location.pathname === "/signup"){
      return null;
  }

      return (
        
        <VStack align="start" height={"100vh"} width="200px" spacing={4} p={4} bg="#252628" alignItems={"center"}>
          <NavLink to="/homepage">
            <Text fontFamily={"'Fredoka', sans-serif"} fontSize="30px" fontWeight={"400"} textColor={"white"} align={"center"} >Crush It</Text>
          </NavLink>
          
          <Box height={"1px"} width={"160px"} bg={"#3E3F42"}></Box>

          <Image textColor="white" src="/smallLogo.svg" alt="SVG Image" />
          
          <Text fontFamily={"'DM Sans', sans-serif"} textAlign={"center"} fontSize={"20px"} textColor={"white"} fontWeight={"700"}>It's time to plan your day!</Text>
          <Button fontFamily={"'DM Sans', sans-serif"} height={"54px"} borderRadius={"14px"} variant="outline" color={"white"} fontSize={"18px"} fontWeight={"700"} width={"160px"}>Plan Day</Button>
        </VStack>
        
      );
}



