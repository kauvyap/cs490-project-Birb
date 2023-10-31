import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";
import { Flex, Input, Heading, Spacer, Button, Image, VStack, Popover, PopoverTrigger, PopoverContent} from '@chakra-ui/react';
import userIcon from '../media/userIcon.png';

 // Here, we display our Navbar
export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState({});
    console.log(userData);


    useLayoutEffect(() => {
        if (location.pathname !== "/login" && location.pathname !== "/signup") {
            console.log(localStorage.getItem("token"));
            fetch("http://localhost:5000/api/auth/getUsername", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
            })
            .then(res => res.json())
            .then(data => data.isLoggedIn ? setUser(data.username): navigate('/login'))
            .catch((err) => alert(err))
        }
    }, [location.pathname, navigate])
        

    useEffect(() => {
    fetch("http://localhost:5000/api/user/" + user)
    .then(res => res.json())
    .then(data => {setUserData(data)})
    .catch((err) => console.log(err))
    }, [user])



    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
  
    if (location.pathname === "/login" || location.pathname === "/signup"){
        return null;
    }

    if (location.pathname !== "/profile/" + user ){
        return (
            <Flex as={"nav"} bg={"white"} width={"100%"} height={"6%" } alignItems={"center"} p={"20px"} >
                <Input placeholder='What are you looking for?' />
                <Spacer></Spacer>
                <Popover>
                    <PopoverTrigger>
                        <Button leftIcon={<Image borderRadius='full' boxSize="40px" src={userIcon} display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={"white"} color={"black"}>{userData.fname} {userData.lname}</Button>
                    </PopoverTrigger>
                    <PopoverContent width='180px' height='140px' padding='20px'>
                        <VStack spacing={4}>
                            <NavLink to={"/profile/" + user} >
                                <Button colorScheme="gray">Profile</Button>
                            </NavLink>

                            <Button colorScheme="red" onClick={handleLogout}>Logout</Button>

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
            <Button leftIcon={<Image borderRadius='full' boxSize="40px" src={userIcon} display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={"white"} color={"black"}>{userData.fname} {userData.lname}</Button>
        </PopoverTrigger>
        <PopoverContent width='180px' height='140px' padding='20px'>
            <VStack spacing={4}>
                <NavLink to={"/profile/" + user} >
                    <Button colorScheme="gray">Profile</Button>
                </NavLink>
                <NavLink to="/">
                    <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
                </NavLink>
            </VStack>
        </PopoverContent>
    </Popover>
        </Flex>
     
 );
}