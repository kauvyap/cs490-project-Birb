import {React} from "react";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";
import { Flex, Heading, Spacer, Button, Image, VStack, Popover, PopoverTrigger, PopoverContent} from '@chakra-ui/react';


 // Here, we display our Navbar
export default function Navbar() {
    const location = useLocation()

  
    if (location.pathname === "/" || location.pathname === "/signup"){
        return null;
    }

    if (location.pathname !== "/profile" ){
        return (
            <Flex as={"nav"} bg={"white"} width={"100%"} height={"6%" } alignItems={"center"} p={"20px"} >
                <Spacer></Spacer>
                <Popover>
                    <PopoverTrigger>
                        <Button leftIcon={<Image borderRadius='full' boxSize="40px" src="/user.png" display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={"white"} color={"black"}>name lastName</Button>
                    </PopoverTrigger>
                    <PopoverContent width='180px' height='140px' padding='20px'>
                        <VStack spacing={4}>
                            <NavLink to="/profile" >
                                <Button colorScheme="gray">Profile</Button>
                            </NavLink>
                            <NavLink to="/">
                                <Button colorScheme="red">Logout</Button>
                            </NavLink>
                        </VStack>
                    </PopoverContent>
                </Popover>
            </Flex>
        )
    }
 return ( 
    
    <Flex as={"nav"} bg={"white"} width={"100%"} height={"6%" } alignItems={"center"} p={"20px"}>
    <Heading>Profile</Heading>
    <Spacer></Spacer>
    <Popover>
        <PopoverTrigger>
            <Button leftIcon={<Image borderRadius='full' boxSize="40px" src="/user.png" display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={"white"} color={"black"}>name lastName</Button>
        </PopoverTrigger>
        <PopoverContent width='180px' height='140px' padding='20px'>
            <VStack spacing={4}>
                <NavLink to="/profile" >
                    <Button colorScheme="gray">Profile</Button>
                </NavLink>
                <NavLink to="/">
                    <Button colorScheme="red">Logout</Button>
                </NavLink>
            </VStack>
        </PopoverContent>
    </Popover>
        </Flex>
     
 );
}