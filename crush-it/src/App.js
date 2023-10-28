import React from "react";
import { ChakraProvider } from '@chakra-ui/react'
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";

import {
  Box,
  Flex
} from '@chakra-ui/react';

const App = () => {
  return (
   <ChakraProvider>
     <Flex>
       <Box flex="1">
         <Navbar />
         <Routes>
           <Route exact path="/" element={<RecordList />} />
           <Route path="/edit/:id" element={<Edit />} />
           <Route path="/create" element={<Create />} />
           <Route path="/login" element={<Login/>} />
         </Routes>
       </Box>
     </Flex>
   </ChakraProvider>
    
  );
 };
 export default App;