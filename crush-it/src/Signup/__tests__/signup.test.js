import React from 'react';
import { render, fireEvent, waitFor , act} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Signup from '../signup.js';

// Mock the fetch function to simulate a delay
global.fetch = jest.fn((url, options) => {
  //console.log("in Fetch")
    if(url === "http://localhost:5000/api/events/"){
        const { body } = options;
        const requestBody = JSON.parse(body);
            return Promise.resolve({
                ok: true, 
                status: 200,
                json: () => Promise.resolve({ message: 'Email or password is incorrect.' }),
        });
    }
    if(url === "http://localhost:5000/api/auth/register"){
        const { body } = options;
        const requestBody = JSON.parse(body);
        if (requestBody.username === 'valid@example.com' && requestBody.password === 'passwordD1!') {
            return Promise.resolve({
                ok: true, 
                status: 200,
                json: () => Promise.resolve({ message: 'Email or password is incorrect.' }),
        });
        }
        return Promise.resolve({
            ok: false, 
            status: 400,
            json: () => Promise.resolve({ data:{isLoggedIn:false, token:123456} }),
        });
    }
    if(url === "http://localhost:5000/api/auth/getUsername"){
        return Promise.resolve({
            json: () => Promise.resolve({ data:{isLoggedIn:false, token:123456} }),
        });
    }
    if (url === "http://localhost:5000/api/tasks") {
     // console.log("Fail")
        return Promise.resolve({
            ok: true, 
            status: 200,
            json: () => Promise.resolve({ message: 'Email or password is incorrect.' }),
        });
    } 
  // Handle other requests if needed
  return Promise.reject(new Error(`Unexpected request to ${url}`));
});

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Signup Component', () => {

  test('renders Signup page successfully', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getAllByText, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      expect(getAllByText('Sign Up')[0]).toBeInTheDocument();
      expect(getAllByText('Sign Up')[1]).toBeInTheDocument();
      expect(getByText('Email')).toBeInTheDocument();
      expect(getByText('Password')).toBeInTheDocument();
      expect(getByText('Confirm Password')).toBeInTheDocument();
      expect(getByText('Crush It')).toBeInTheDocument();
    });
  });

  test('Form is working', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, queryByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    await waitFor(() => {
      // Assertions for error messages
      //console.log(""+emailInput.value)
      expect(emailInput.value).toEqual("valid@example.com");
      expect(passwordInput.value).toEqual("password");
      expect(cpasswordInput.value).toEqual("password");
    });
  });


  test('renders error messages for invalid email', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Please enter in a valid email.')).toBeInTheDocument();
    });
  });

  test('renders error messages for invalid password', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwo' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Password must be at least 8 characters.')).toBeInTheDocument();
    });
  });

  test('renders error messages for invalid password 2', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Passwords must contain a mix of uppercase letters, lowercase letters, numbers, and symbols.')).toBeInTheDocument();
    });
  });

  test('renders error messages for invalid confirm password', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordpassword123#231dD' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Passwords must match.')).toBeInTheDocument();
    });
  });

  test('renders error messages for invalid confirm password', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordpassword123#231dD' } });
    fireEvent.change(cpasswordInput, { target: { value: 'password' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Passwords must match.')).toBeInTheDocument();
    });
  });

  test('successful at creating account', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, queryByText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordD1!' } });
    fireEvent.change(cpasswordInput, { target: { value: 'passwordD1!' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await act(() => {
      // Assertions for error messages
      expect(queryByText('Passwords must match.')).toBeNull();
      expect(queryByText('Passwords must contain a mix of uppercase letters, lowercase letters, numbers, and symbols.')).toBeNull();
      expect(queryByText('Password must be at least 8 characters.')).toBeNull();
      expect(queryByText('Please enter in a valid email.')).toBeNull();
    });
  });

  test('Email already exists', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText , getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Signup />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    // Interact with Chakra UI form elements using placeholder text
    const emailInput = getByPlaceholderText('Enter your email');
    const passwordInput = getByPlaceholderText('Enter your password');
    const cpasswordInput = getByPlaceholderText('Enter your password again');
    const signButton = getByRole('button', { name: 'Sign Up' });
    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'passwordD1!' } });
    fireEvent.change(cpasswordInput, { target: { value: 'passwordD1!' } });
    // Simulate button click and wait for login to complete
    fireEvent.click(signButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Email already in use.')).toBeInTheDocument();
    });
  });

});