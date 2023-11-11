import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '../login.js';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ok: false, status: 404}),
  })
);

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
    const loginButton = getByRole('button', {name: 'Login'});

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    // Simulate button click and wait for login to complete
    fireEvent.click(loginButton);
    await waitFor(() => {
      // Assertions for error messages
      expect(getByTestId('EmailErrorMsg')).toBeInTheDocument();
      expect(getByText('Email or password is incorrect.')).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  // Add more test cases as needed
});
