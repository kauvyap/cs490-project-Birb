import React from 'react';
import { render, fireEvent, waitFor , act} from '@testing-library/react';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Sidebar from '../sidebar.js';


// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Signup Component', () => {

  test('renders sidebar successfully', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByText } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Sidebar />
        </ChakraProvider>
      </BrowserRouter>
    );
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      expect(getByText('Crush It')).toBeInTheDocument();
      expect(getByText("It's time to plan your day!")).toBeInTheDocument();
      expect(getByText("Log Out")).toBeInTheDocument();
    });
  });

  test('Crush It takes home', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Sidebar />
        </ChakraProvider>
      </BrowserRouter>
    );

    const homeBtn = getByTestId('home')
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
        // Assertions for error messages
        fireEvent.click(homeBtn)
        expect(getByText('Crush It')).toBeInTheDocument();
        expect(getByText("It's time to plan your day!")).toBeInTheDocument();
        expect(getByText("Log Out")).toBeInTheDocument();
    });
  });

  test('Log Out logs out', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByTestId, queryByText } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Sidebar />
        </ChakraProvider>
      </BrowserRouter>
    );
    const logBtn = getByTestId('logout')
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      fireEvent.click(logBtn)
      expect(queryByText('Crush It')).toBeNull();
      expect(queryByText("It's time to plan your day!")).toBeNull();
      expect(queryByText("Log Out")).toBeNull();
    });
  });

});