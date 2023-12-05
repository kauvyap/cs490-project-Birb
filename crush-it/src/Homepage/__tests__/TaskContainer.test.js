import React from 'react';
import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Task from '../TaskContainer.js';
global.fetch = jest.fn((url, options) => {
  //console.log("in Fetch")
  if(url === "http://localhost:5000/api/user/null"){
    return Promise.resolve({
      json: () => Promise.resolve({isLoggedIn:true,username:"valid@gmail.com" , token:123456} ),
    });
  }
  if(url === "http://localhost:5000/api/auth/getUsername"){
    return Promise.resolve({
      json: () => Promise.resolve( {isLoggedIn:true,username:"valid@gmail.com", token:123456}),
    });
  }
  if(url === "http://localhost:5000/api/user/valid@gmail.com"){
    return Promise.resolve({
      json: () => Promise.resolve({isLoggedIn:true,username:"valid@gmail.com" , token:123456} ),
    });
  }
  return Promise.reject(new Error(`Unexpected request to ${url}`));
})



jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Task Container', () => {
  test('Renders Task container', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
        </BrowserRouter>
    );

    // Interact with Chakra UI form elements using placeholder text
    await act( async() => {
      // Assertions for error messages
      expect(getByText("Top Priority")).toBeInTheDocument();
    });
  });

  test('Renders sample task', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    var topTasks = 
    [
    {dateAssigned : "3-December-2023", description: "dwadwada", pomodoroTimers : 1, priority : "Top", status : "NS", title : "adwjkdkwadhw", _id : "656d573aacecfeb589ec6481"},
    ]
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Task category='Top Priority' categoryList={topTasks} dateSelected={'3-December-2023'} timerLength={1} />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Simulate button click and wait for login to complete
    await act( async () => {
      // Assertions for error messages
      expect(getByText("adwjkdkwadhw")).toBeInTheDocument();
      //expect(Description).toBeInTheDocument();
    });
  });

  test('Renders description and pomo# sample task', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    var topTasks = 
    [
    {dateAssigned : "3-December-2023", description: "dwadwada", pomodoroTimers : 1, priority : "Top", status : "NS", title : "adwjkdkwadhw", _id : "656d573aacecfeb589ec6481"},
    ]

    const {  getByText, getAllByText, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Task category='Top Priority' categoryList={topTasks} dateSelected={'3-December-2023'} timerLength={1} />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Simulate button click and wait for login to complete


    await act(async () => {
      expect(getByText("dwadwada")).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});