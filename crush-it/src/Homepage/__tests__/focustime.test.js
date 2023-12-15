import React from 'react';
import { fireEvent, render, screen , waitFor, act, getByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Button, ChakraProvider } from '@chakra-ui/react';
import Focustime from '../focustime.js';


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

jest.setTimeout(70000)

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

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));

describe('focustime', () => {
    test('Renders focustime', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
            <BrowserRouter>
                <ChakraProvider>
                    <Focustime  isOpen={mockCallback} onClose={mockCallback} title={"Test"} notes={"testing this note"} timers={"5"} />
                </ChakraProvider>
            </BrowserRouter>
        );
        
        const PSButton =  getByTestId("pomoStart")
        const SSButton =  getByTestId("shortStart")
        const LSButton =  getByTestId("longStart")
        const ST =  getByTestId("shortTimer")
        const PT =  getByTestId("pomoTimer")
        const LT =  getByTestId("longTimer")
        const pomoRemain = getByTestId("pomoLeft")
        const pomoTitle = getByTestId("title")
        const pomoNote = getByTestId("note")

        const pomoTab = getByTestId("pomoTab")
        const shortTab = getByTestId("shortTab")
        const longTab = getByTestId("longTab")

        fireEvent.click(pomoTab);
        fireEvent.click(shortTab);
        fireEvent.click(longTab);

        // Interact with Chakra UI form elements using placeholder text
        await act( async () => {
          // Assertions for error messages
          expect(PSButton).toBeInTheDocument();
          expect(SSButton).toBeInTheDocument();
          expect(LSButton).toBeInTheDocument();
          expect(PT.textContent).toBe("01:00")
          expect(ST.textContent).toBe("02:00")
          expect(LT.textContent).toBe("03:00")
          expect(pomoRemain.textContent).toBe("/5");
          expect(pomoTitle.textContent).toBe("Test");
          expect(pomoNote.textContent).toBe("testing this note");
        });
      });
/*
      test('Renders focustime', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();
        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
            <BrowserRouter>
                <ChakraProvider>
                    <Focustime  isOpen={mockCallback} onClose={mockCallback} title={"Test"} notes={"testing this note"} timers={"5"} />
                </ChakraProvider>
            </BrowserRouter>
        );
        const PSButton =  getByTestId("pomoStart")
        const SSButton =  getByTestId("shortStart")
        const LSButton =  getByTestId("longStart")
        const ST =  getByTestId("shortTimer")
        const PT =  getByTestId("pomoTimer")
        const LT =  getByTestId("longTimer")
        const pomoRemain = getByTestId("pomoLeft")
        const pomoTitle = getByTestId("title")
        const pomoNote = getByTestId("note")

        const pomoTab = getByTestId("pomoTab")
        const shortTab = getByTestId("shortTab")
        const longTab = getByTestId("longTab")
        fireEvent.click(pomoTab);
        fireEvent.click(PSButton);
        
        //console.log(PT.textContent)
        //console.log(screen.debug())
        // Interact with Chakra UI form elements using placeholder text
        await act( async () => {
          // Assertions for error messages
            
            
            expect(PSButton).toBeInTheDocument();
            expect(SSButton).toBeInTheDocument();
            expect(LSButton).toBeInTheDocument();
            await delay(30000);
            if(PT.textContent != "01:00"){
                expect(PT.textContent).toBe(PT.textContent);
                console.log(PT.textContent)
            }
            else
                expect(PT.textContent).toBe("01:00");
        });
      });
*/
  // Add more test cases as needed
});