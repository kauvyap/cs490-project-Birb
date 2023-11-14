import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { ChakraProvider } from '@chakra-ui/react';
import Task from '../TaskContainer.js';


// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Login Component', () => {
  test('renders error messages for invalid login', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const props = [["Hw","ahdiowah", 1,"NS"], ["Hw2","ahdiowaha", 4,"IP"]]
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      <BrowserRouter>
        <ChakraProvider>
          <Task category='Top Priority' categoryList={props}/>
        </ChakraProvider>
      </BrowserRouter>
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
  });

  // Add more test cases as needed
});