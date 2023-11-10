import React, { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
 // We import NavLink to utilize the react router.
import { NavLink, useLocation } from "react-router-dom";
import { Flex, Input, Heading, Spacer, Button, Image, useColorModeValue} from '@chakra-ui/react';
import userIcon from '../media/userIcon.png';

 // Here, we display our Navbar
export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState({});
    console.log(userData);

    const bg = useColorModeValue('white', '#1E1E1E')
    const text = useColorModeValue('black', 'white')

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

  
    if (location.pathname === "/login" || location.pathname === "/signup"){
        return null;
    }

    if (location.pathname !== "/profile/" + user ){
        return (
            <Flex as={"nav"} bg={bg} width={"100%"} height={"6vh" } alignItems={"center"} p={"20px"}>
                <Input placeholder='What are you looking for?' width={"100vh"} mt={5} mb={5} />
                <Spacer></Spacer>
                <NavLink to={"/profile/" + user} >
                    <Button leftIcon={<Image borderRadius='full' boxSize="40px" src={userIcon} display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={bg} color={text}>{userData.fname} {userData.lname}</Button>
                </NavLink>
            </Flex>
        )
    }
 return ( 
    
    <Flex as={"nav"} bg={bg} width={"100%"} height={"8vh" } alignItems={"center"} p={"20px"}>
    <Heading mt={2} mb={3}>Profile</Heading>
    <Spacer></Spacer>
    <NavLink to={"/profile/" + user} >
            <Button leftIcon={<Image borderRadius='full' boxSize="40px" src={userIcon} display='fixed'/>} variant={"ghost"} colorScheme="linkedin" bg={bg} color={text}>{userData.fname} {userData.lname}</Button>
    </NavLink>
                     
    </Flex>

     
 );
}