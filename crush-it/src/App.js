import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Edit from "./components/edit";
import Create from "./components/create";
import Homepage from "./Homepage/homepage.js";
import Profile from "./Profile/profile.js";
import Login from "./Login/login";

const App = () => {
  return (
   <ChakraProvider>
     <Flex>
      <Sidebar />
       <Box flex="1">
         <Navbar />
         <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/create" element={<Create />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/profile" element={<Profile/>} />
         </Routes>
       </Box>
     </Flex>
   </ChakraProvider>
    
  );
 };

 export default App;