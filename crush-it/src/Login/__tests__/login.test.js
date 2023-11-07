import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../login';

// Mock react-router-dom NavLink and Link
jest.mock('react-router-dom', () => ({
  NavLink: ({ children }) => <div>{children}</div>,
  Link: 'a',
}));

test('Login component renders correctly', () => {
  render(<Login />);

  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('Login form handles input changes', () => {
  render(<Login />);

  const usernameInput = screen.getByPlaceholderText('Enter your username');
  const passwordInput = screen.getByPlaceholderText('Enter your password');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('testpassword');
});

test('Login button calls handleLogin function', () => {
  render(<Login />);
  const handleLoginSpy = jest.spyOn(Login.prototype, 'handleLogin');
  
  const loginButton = screen.getByText('Login');
  fireEvent.click(loginButton);

  expect(handleLoginSpy).toHaveBeenCalled();

  handleLoginSpy.mockRestore();
});