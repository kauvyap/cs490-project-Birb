import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../login.js';

// Mock the fetch function to simulate a delay
global.fetch = jest.fn((url, options) => {
  if (url === "http://localhost:5000/api/auth/login" && options.method === "POST") {
    const { body } = options;
    const requestBody = JSON.parse(body);

    if (requestBody.email === 'invalid@example.com' && requestBody.password === 'wrongpassword') {
      // Return a response indicating a failed login
      return Promise.resolve({
        json: () => Promise.resolve({ ok: false, status: 404 }),
      });
    } else {
      // You can handle other cases or return a success response if needed
      return Promise.resolve({
        json: () => Promise.resolve({ ok: true, status: 200 }),
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
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Simulate button click and wait for login to complete
    fireEvent.click(loginButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByTestId('EmailErrorMsg')).toBeInTheDocument();
      expect(getByText('Email or password is incorrect.')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});