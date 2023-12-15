import React from 'react';
import { render, fireEvent, waitFor , act, getByTestId} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../navbar.js';

global.fetch = jest.fn((url, options) => {
    if(url === "http://localhost:5000/api/user/null"){
      return Promise.resolve({
        json: () => Promise.resolve({pomodoro:{timer:1, short:2, long:3}} ),
      });
    }
    if(url === "http://localhost:5000/api/auth/getUsername"){
      return Promise.resolve({
        json: () => Promise.resolve( {isLoggedIn:true,username:"valid@gmail.com", token:123456}),
      });
    }
    if(url === "http://localhost:5000/api/user/valid@gmail.com"){
      return Promise.resolve({
        json: () => Promise.resolve({pomodoro:{timer:1, short:2, long:3}} ),
      });
    }
    return Promise.reject(new Error(`Unexpected request to ${url}`));
  });
// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Navbar Component', () => {

  test('renders Navbar successfully', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Navbar />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const but =  getByTestId("prof")
    await act( async () => {
      // Assertions for error messages
      expect(but).toBeInTheDocument();
    });
  });

  test('Profile button is clicked', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Navbar />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const but =  getByTestId("prof")
    await act( async () => {
        fireEvent.click(but);
        // Assertions for error messages
        expect(but).toBeInTheDocument();
    });
  });

});