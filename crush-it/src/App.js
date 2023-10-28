import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

import { Flex, Box, ChakraProvider } from "@chakra-ui/react";
 // We import all the components we need in our app
import Navbar from "./components/navbar";
import Navbar2 from "./components/navbar2";
import Sidebar from "./components/sidebar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Homepage from "./Homepage/index";
import Profile from "./Profile";
 const App = () => {
 return (
  <ChakraProvider>
    <Flex>
      <Sidebar />
      <Box flex="1">
        <Navbar2 />
        <Routes>
          <Route exact path="/" element={<RecordList />} />
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