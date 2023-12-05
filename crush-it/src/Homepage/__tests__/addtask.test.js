import React from 'react';
import { fireEvent, render, screen , waitFor, act, getByText } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { Button, ChakraProvider } from '@chakra-ui/react';
import Task from '../addtask.js';
global.fetch = jest.fn((url, options) => {
  //console.log("in Fetch")
  if(url === "http://localhost:5000/api/tasks/undefined"){
    return Promise.resolve({
      json: () => Promise.resolve({topTasks:[],importantTasks:[] , otherTasks:[]} ),
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

describe('addTask Form', () => {
    test('Renders addTask button', async () => {
        // Render the Login component within the BrowserRouter and ChakraProvider
        const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
          
            <ChakraProvider>
              <Task category='Top Priority' />
            </ChakraProvider>
          
        );
        const addButton = getByRole("button")
        // Interact with Chakra UI form elements using placeholder text
        await act(() => {
          // Assertions for error messages
          expect(addButton).toBeInTheDocument();
        });
      });

  test('Renders addTask Form', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")
    fireEvent.click(addButton)
    // Interact with Chakra UI form elements using placeholder text
    await act(() => {
      // Assertions for error messages
      expect(getByText("Add A New Task")).toBeInTheDocument();
      expect(getByText("Title")).toBeInTheDocument();
      expect(getByText("Description")).toBeInTheDocument();
      expect(getByText("Priority")).toBeInTheDocument();
      expect(getByText("# of Pomodoro Timers")).toBeInTheDocument();
    });
  });

  test('Handles input change in title and desc addTask Form', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")

    fireEvent.click(addButton)

    const titleInput = getByPlaceholderText('Enter task title');
    const descriptionInput = getByPlaceholderText('Enter task description');


    fireEvent.change(titleInput, { target: { value: 'task2' } });
    fireEvent.change(descriptionInput, { target: { value: 'task desc' } });
    
    //fireEvent.select( priorityInput, {"Top", "Important","Other" });
    //const pomoInput = getByPlaceholderText('Enter your email');
    // Interact with Chakra UI form elements using placeholder text
    await act(() => {
      // Assertions for error messages
      expect(titleInput.value).toBe("task2");
      expect(getByText("task desc")).toBeInTheDocument();
    });
  });

  test('Handles input change in select priority addTask Form', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByTestId , getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")

    fireEvent.click(addButton)

    const selectElement = getByTestId("select")
    fireEvent.change(selectElement, { target: { value: 'Top' } });
    //fireEvent.select( priorityInput, {"Top", "Important","Other" });
    //const pomoInput = getByPlaceholderText('Enter your email');
    // Interact with Chakra UI form elements using placeholder text
    await act(() => {
      // Assertions for error messages
      expect(selectElement.value).toBe("Top");
    });
  });

  test('Handles input change in # of pomodoro in addTask Form', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByTestId , getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")

    fireEvent.click(addButton)
    
    const add1 = getByTestId("add1")
    const sub1 = getByTestId("sub1")
    const pomo = getByTestId("pomoNum")
    fireEvent.click(add1);
    fireEvent.click(add1);
    fireEvent.click(sub1);
    //fireEvent.select( priorityInput, {"Top", "Important","Other" });
    //const pomoInput = getByPlaceholderText('Enter your email');
    // Interact with Chakra UI form elements using placeholder text
    await act(() => {
      // Assertions for error messages
      expect(pomo.value).toBe("2");
    });
  });



  test('Expect for error in title when empty', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")

    fireEvent.click(addButton);

    const titleInput = getByPlaceholderText('Enter task title');
    const save = getByTestId("save");
    
    fireEvent.click(save);
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      //debug()
        expect(getByText("A title is required")).toBeInTheDocument();
    });
  });

  test('Expect for error in select when empty', async () => {
    // Render the Login component within the BrowserRouter and ChakraProvider
    const { getByPlaceholderText, getByText, getByTestId, getByRole } = render(
      
        <ChakraProvider>
          <Task category='Top Priority' />
        </ChakraProvider>
      
    );
    const addButton = getByRole("button")

    fireEvent.click(addButton);

    const titleInput = getByPlaceholderText('Enter task title');
    const save = getByTestId("save");
        
    fireEvent.change(titleInput, { target: { value: 'task2' } });
    fireEvent.click(save);
    // Interact with Chakra UI form elements using placeholder text
    await waitFor(() => {
      // Assertions for error messages
      //debug()
        expect(getByText("Select a valid option.")).toBeInTheDocument();
    });
  });
  // Add more test cases as needed
});