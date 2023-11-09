const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import BrowserRouter from "react-router-dom";
import '@testing-library/jest-dom';
import Login from '../login.js';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockedUsedNavigate,
}));

// Mock react-router-dom NavLink and Link
jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => <div>{children}</div>,
  Link: 'a',
}));


describe('Login component renders correctly', () => {
  test('renders' , () =>{
    expect(() =>{
      render(<BrowserRouter><Login/></BrowserRouter>)
    })
  })
  
  

 /* test('renders 2.0', async () => {
    const {queryByTestId } = render(<BrowserRouter><Login/></BrowserRouter>)
    const element = queryByTestId('Login')
    expect( element.textContent).toEqual("Login");
  } )*/

});
/*
describe('Login form handles input changes', () => {
  it( 'Empty click', () =>{

   render(<BrowserRouter><Login/></BrowserRouter>);

    const usernameInput = screen.getByPlaceholderText('Enter your username');
    const passwordInput = screen.getByPlaceholderText('Enter your password');

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpassword');
  });
});

test('Login button calls handleLogin function', () => {
  render(<BrowserRouter><Login/></BrowserRouter>);
  const handleLoginSpy = jest.spyOn(Login.prototype, 'handleLogin');
  
  const loginButton = screen.getByText('Login');
  fireEvent.click(loginButton);

  expect(handleLoginSpy).toHaveBeenCalled();

  handleLoginSpy.mockRestore();
});*/