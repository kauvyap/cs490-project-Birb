import React from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button, Divider, Flex, HStack, Card} from '@chakra-ui/react';
import { TimeIcon } from '@chakra-ui/icons'

function Profile(){


    return (
    <Box p={5}>    
      <VStack spacing={4} align="start">
        <Box w="100%">
          <Heading as="h2" size="md" mb={2}>
            User Info
          </Heading>
          <Box
          flex="1"
          bg="white"
          position="relative"
          w="100%"
         
          >
          <Card boxShadow='2xl' p={5} mb={4} w="100%">
          <HStack spacing={4} align="start">
          <FormControl id="firstName" flex={1}>
            <FormLabel>First Name</FormLabel>
            <Input type="text" placeholder="Current name" />
          </FormControl>
          <FormControl id="lastName" flex={1}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" placeholder="New name" />
          </FormControl>
        </HStack>
        </Card>
        </Box>
        </Box>

        <Divider />

        <Box w="100%">
        <Heading as="h2" size="md" mb={2}>
          Change Password
        </Heading>
        <Card boxShadow='2xl' p={5} mb={4} w="100%">
        <HStack spacing={4} align="start">
          <FormControl id="currentPassword" flex={1}>
            <FormLabel>Current Password</FormLabel>
            <Input type="password" placeholder="Current password" />
          </FormControl>
          <FormControl id="newPassword" flex={1}>
            <FormLabel>New Password</FormLabel>
            <Input type="password" placeholder="New password" />
          </FormControl>
          <FormControl id="confirmPassword" flex={1}>
            <FormLabel>Confirm New Password</FormLabel>
            <Input type="password" placeholder="Confirm password" />
          </FormControl>
        </HStack>
        </Card>
        </Box>

        <Divider />

        <Box w="100%">
        <Heading as="h2" size="md" mb={2}>
          Pomodoro Timer (Minutes)
        </Heading>
        <Card boxShadow='2xl' p={5} mb={4} w="100%">
        <HStack spacing={4} align="start">
          <FormControl id="pomodoro" flex={1}>
            <Flex spacing={4}>
                <TimeIcon color={"#6284FF"}/>
                <FormLabel ml={2}>Pomodoro</FormLabel>
            </Flex>
            <Input type="number" placeholder="Current Setting" />
          </FormControl>
          <FormControl id="shortBreak" flex={1}>
            <Flex spacing={4}>
                <TimeIcon color={"#6284FF"}/>
                <FormLabel ml={2}>Short Break</FormLabel>
            </Flex>
            <Input type="number" placeholder="Current Setting" />
          </FormControl>
          <FormControl id="longBreak" flex={1}>
          <Flex spacing={4}>
                <TimeIcon color={"#6284FF"}/>
                <FormLabel ml={2}>Long Break</FormLabel>
            </Flex>
            <Input type="number" placeholder="Current Setting" />
          </FormControl>
        </HStack>
        </Card>
        </Box>

        <Divider />

        <Box w="100%" display="flex" justifyContent="center">
        <HStack spacing={5}>
            <Button size='lg' color="#6284FF" variant='outline'>Cancel</Button>
            <Button size='lg' colorScheme="blue" variant='solid'>Save</Button>
        </HStack>
        </Box>

      </VStack>
    </Box>
  );
};

export default Profile;