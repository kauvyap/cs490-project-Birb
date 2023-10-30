import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { Flex, Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Homepage from "./Homepage/homepage.js";
import Profile from "./Profile/profile.js";
import Login from "./Login/login";
import Signup from "./Signup/signup";

const theme = extendTheme({
  colors: {
    brand: {
      500: '#6284FF'
    }
  }
});

const App = () => {
  return (
   <ChakraProvider theme={theme}>
     <Flex>
      <Sidebar />
       <Box flex="1">
         <Navbar />
         <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homepage" element={<Homepage/>} />
          <Route path="/profile" element={<Profile/>} />
         </Routes>
       </Box>
     </Flex>
   </ChakraProvider>
    
  );
 };

 export default App;