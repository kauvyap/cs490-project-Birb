import React from 'react';
import { render, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Task from '../TaskContainer.js';


describe('Task Container', () => {
  /*test('renders sample task', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    var topTasks = 
    [
    {dateAssigned : "3-December-2023", description: "dwadwada", pomodoroTimers : 1, priority : "Top", status : "NS", title : "adwjkdkwadhw", _id : "656d573aacecfeb589ec6481"},
    //{dateAssigned : "3-December-2023", description: "test2", pomodoroTimers : 1, priority : "Top", status : "NS", title : "test2", _id : "656d75bdacecfeb589ec6621"},
    //{dateAssigned : "3-December-2023", description: "test3", pomodoroTimers : 1, priority : "Top", status : "NS", title : "tes3", _id : "656d75bdacecfeb589ec6622"},
    //{dateAssigned : "3-December-2023", description: "test4", pomodoroTimers : 1, priority : "Top", status : "NS", title : "test4", _id : "656d75bdacecfeb589ec6621"}
    ]
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' categoryList={topTasks} dateSelected={'3-December-2023'} timerLength={1} />
        </ChakraProvider>
      
    );

    // Interact with Chakra UI form elements using placeholder text
    const Title = getByText('Hw');
    const Description = getByText('ahdiowah');


    // Simulate button click and wait for login to complete
    await waitFor(() => {
      // Assertions for error messages
      expect(Title).toBeInTheDocument();
      expect(Description).toBeInTheDocument();
    });
  });*/


  test('renders sample task', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );

    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText("Top Priority")).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});