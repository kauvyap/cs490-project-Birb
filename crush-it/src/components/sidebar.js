// We import bootstrap to make our application look better.
import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
 
import { NavLink,useLocation } from "react-router-dom";
import { Box, VStack, Text, Button, Image, Spacer} from "@chakra-ui/react";
import logOutIcon from '../media/logout.png'
import userIcon from '../media/userIcon.png'
 // Here, we display our Navbar
export default function Sidebar() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
}

  if (location.pathname === "/login" || location.pathname === "/signup"){
      return null;
  }

      return (



        
        <VStack align="start" height={"100vh"} width="200px" spacing={4} p={4} bg="#252628" alignItems={"center"}>
          <NavLink to="/">
          <Text fontFamily={"'Fredoka', sans-serif"} fontSize="30px" fontWeight={"400"} textColor={"white"} align={"center"} >Crush It</Text>
          </NavLink>
          
          <Box height={"1px"} width={"160px"} bg={"#3E3F42"}></Box>

          <Image textColor="white" src="/smallLogo.svg" alt="SVG Image" />
          
          <Text fontFamily={"'DM Sans', sans-serif"} textAlign={"center"} fontSize={"20px"} textColor={"white"} fontWeight={"700"}>It's time to plan your day!</Text>
          <Button fontFamily={"'DM Sans', sans-serif"} height={"54px"} borderRadius={"14px"} variant="outline" color={"white"} fontSize={"18px"} fontWeight={"700"} width={"160px"}>Plan Day</Button>
          <Spacer></Spacer>

          <Button fontFamily={"'DM Sans', sans-serif"} leftIcon={<Image borderRadius='full' boxSize="24px" src={logOutIcon} display='fixed'/>} onClick={handleLogout} fontSize={"12px"} borderRadius={"10px"} bg="#252628" variant={"outline"} textColor={"white"} margin={"14"} w={"120px"} h="38">
            Log Out
          </Button>
        </VStack>
        
      );
}



