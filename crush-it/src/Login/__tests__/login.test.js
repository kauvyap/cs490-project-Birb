



import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../login.js';

// Mock the fetch function to simulate a delay
global.fetch = jest.fn((url, options) => {
  //console.log("in Fetch")
  if(url === "http://localhost:5000/api/auth/getUsername"){
    return Promise.resolve({
      json: () => Promise.resolve({ data:{isLoggedIn:false, token:123456} }),
    });
  }
  if (url === "http://localhost:5000/api/auth/login" && options.method === "POST") {
    const { body } = options;
    const requestBody = JSON.parse(body);
    //console.log("mocking response")
    //console.log("Trying to find where user is at " + JSON. stringify(requestBody))
    if (requestBody.username === 'invalid@example' && requestBody.password === 'wrongpassword') {
      // Return a response indicating a failed login
     // console.log("Fail")
      return Promise.resolve({
        ok: false, 
        status: 404,
        json: () => Promise.resolve({ message: 'Email or password is incorrect.' }),
      });
    } 
    if (requestBody.username === 'invalid@example.com' && requestBody.password === 'wrongpassword') {
      // Return a response indicating a failed login
      //console.log("Fail")
      return Promise.resolve({
        ok: false, 
        status: 400,
        json: () => Promise.resolve({ message: 'Email or password is incorrect.' }),
      });
    }
      else {
      //console.log("Success" )
      // You can handle other cases or return a success response if needed
      return Promise.resolve({
        ok: true, 
        status: 200,
        json: () => Promise.resolve({ loggedIn:true }),
      });
    }
  }
  // Handle other requests if needed
  return Promise.reject(new Error(`Unexpected request to ${url}`));
});

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {

  test('renders Login page successfully', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getAllByText, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      expect(getAllByText('Login')[0]).toBeInTheDocument();
      expect(getAllByText('Login')[1]).toBeInTheDocument();
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Password')).toBeInTheDocument();
      expect(getByText('Crush It')).toBeInTheDocument();
    });
  });

  test('Form is working', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, queryByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByRole('button', { name: 'Login' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    await waitFor(() => {
      // Assertions for error messages
      //console.log(""+emailInput.value)
      expect(emailInput.value).toEqual("valid@example.com");
      expect(passwordInput.value).toEqual("password");
    });
  });


  test('renders error messages for invalid login', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByRole('button', { name: 'Login' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'invalid@example' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(loginButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByTestId('EmailErrorMsg')).toBeInTheDocument();
      expect(getByText('Email does not exist.')).toBeInTheDocument();
    });
  });

  test('renders error messages for invalid password', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getAllByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByRole('button', { name: 'Login' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(loginButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getAllByText('Email or password is incorrect.')[0]).toBeInTheDocument();
    });
  });

  test('User is successful at logging in', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, queryByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Login />
        </ChakraProvider>
      </BrowserRouter>
    );
    delete window.location;
    window.location = { ...window.location, reload: reloadMock };
    const reloadMock = jest.fn();
    Object.defineProperty(window.location, 'reload', {
      configurable: true,
      value: reloadMock,
    });
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const loginButton = getByRole('button', { name: 'Login' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(loginButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(queryByText('Email or password is incorrect.')).toBeNull();
    });
  });

});