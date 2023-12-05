import React from 'react';
import { fireEvent, render, screen , waitFor, act, getByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Button, ChakraProvider } from '@chakra-ui/react';
import Datepicker from '../datepicker.js';

describe('datepicker', () => {
    test('Renders datepickers', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Datepicker  onDateSelected={mockCallback} />
            </ChakraProvider>
          
        );
        const MLButton =  getByTestId("monthLeft")
        const MRButton =  getByTestId("monthRight")
        const DLButton =  getByTestId("dayLeft")
        const DRButton =  getByTestId("dayRight")
        const YLButton =  getByTestId("yearLeft")
        const YRButton =  getByTestId("yearRight")
        // Interact with Chakra UI form elements using placeholder text
        await waitFor(() => {
          // Assertions for error messages
          expect(MLButton).toBeInTheDocument();
          expect(MRButton).toBeInTheDocument();
          expect(DLButton).toBeInTheDocument();
          expect(DRButton).toBeInTheDocument();
          expect(YLButton).toBeInTheDocument();
          expect(YRButton).toBeInTheDocument();

        });
      });

      test('Pickers can be clicked', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Datepicker  onDateSelected={mockCallback} />
            </ChakraProvider>
          
        );
        const MLButton =  getByTestId("monthLeft")
        const MRButton =  getByTestId("monthRight")
        const DLButton =  getByTestId("dayLeft")
        const DRButton =  getByTestId("dayRight")
        const YLButton =  getByTestId("yearLeft")
        const YRButton =  getByTestId("yearRight")
        const Mtext =  getByTestId("month")
        const Dtext =  getByTestId("day")
        const Ytext =  getByTestId("year")
        
        fireEvent.click(MLButton)
        fireEvent.click(DLButton)
        fireEvent.click(YLButton)
            
        await waitFor(() => {
            // Assertions for error messages
            expect(getByTestId("month").textContent).toBe(Mtext.textContent);
            expect(getByTestId("day").textContent).toBe(Dtext.textContent);
            expect(getByTestId("year").textContent).toBe(Ytext.textContent);
        });
      });


      test('Month and year is adjusted if day is clicked too many times', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Datepicker  onDateSelected={mockCallback} />
            </ChakraProvider>
          
        );
      
        const MRButton =  getByTestId("monthRight")
    
        const DRButton =  getByTestId("dayRight")
        const YRButton =  getByTestId("yearRight")
        const Mtext =  getByTestId("month")
        const Dtext =  getByTestId("day")
        const Ytext =  getByTestId("year")
        const expectedY = parseInt(Ytext.textContent,10)+1

        while(Mtext.textContent != "December"){
            fireEvent.click(MRButton);
        }
        while(Dtext.textContent != "31"){
            fireEvent.click(DRButton);
        }
        fireEvent.click(DRButton);
        
        
        await waitFor(() => {
            // Assertions for error messages
            expect(getByTestId("month").textContent).toBe("January");
            expect(getByTestId("day").textContent).toBe("1");
            expect(getByTestId("year").textContent).toBe(""+expectedY);
        });
      });

      test('year and day is adjusted if month is clicked too many times', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Datepicker  onDateSelected={mockCallback} />
            </ChakraProvider>
          
        );
      
        const MRButton =  getByTestId("monthRight")
        const DRButton =  getByTestId("dayRight")
        const YRButton =  getByTestId("yearRight")
        const Mtext =  getByTestId("month")
        const Dtext =  getByTestId("day")
        const Ytext =  getByTestId("year")
        const expectedY = parseInt(Ytext.textContent,10)+1

        while(Mtext.textContent != "December"){
            fireEvent.click(MRButton);
        }
        while(Dtext.textContent != "31"){
            fireEvent.click(DRButton);
        }
        fireEvent.click(MRButton);
        
        
        await waitFor(() => {
            // Assertions for error messages
            expect(getByTestId("month").textContent).toBe("January");
            expect(getByTestId("day").textContent).toBe("31");
            expect(getByTestId("year").textContent).toBe(""+expectedY);
        });
      });

      test('leap year day is adjusted if year is clicked', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        function isLeapYear(year) {
            year = parseInt(year,10)
            // Leap years are divisible by 4
            if (year % 4 !== 0) {
              return false;
            }
          
            // If the year is divisible by 100, it must also be divisible by 400 to be a leap year
            if (year % 100 === 0 && year % 400 !== 0) {
              return false;
            }
          
            // If the year is divisible by 4 but not divisible by 100, or divisible by 400, it's a leap year
            return true;
        }
        const mockCallback = jest.fn();

        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Datepicker  onDateSelected={mockCallback} />
            </ChakraProvider>
          
        );
      
        const MRButton =  getByTestId("monthRight")
        const DRButton =  getByTestId("dayRight")
        const YRButton =  getByTestId("yearRight")
        const Mtext =  getByTestId("month")
        const Dtext =  getByTestId("day")
        const Ytext =  getByTestId("year")
        
        while(Mtext.textContent != "February"){
            fireEvent.click(MRButton);
        }
        while(! isLeapYear(Ytext.textContent)){
            fireEvent.click(YRButton);
        }
        while(Dtext.textContent != "29"){
            fireEvent.click(DRButton);
        }

        const expectedY = parseInt(Ytext.textContent,10)+1
        fireEvent.click(YRButton);
        
        
        await waitFor(() => {
            // Assertions for error messages
            expect(getByTestId("month").textContent).toBe("February");
            expect(getByTestId("day").textContent).toBe("28");
            expect(getByTestId("year").textContent).toBe(""+expectedY);
        });
      });

  // Add more test cases as needed
});