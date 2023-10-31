// Import necessary modules and libraries
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar';

// Mock the useLocation hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/' })),
}));

describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
    // Assert that some key element is rendered in the Navbar
    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

  it('renders profile links when not on profile page', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Assert that the elements you expect are rendered when not on the profile page
    expect(screen.getByRole('button', { name: /name lastName/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('does not render profile links when on profile page', () => {
    // Mock the useLocation hook to simulate being on the profile page
    jest.spyOn(require('react-router-dom'), 'useLocation').mockImplementation(() => ({ pathname: '/profile' }));

    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Assert that the elements you expect are NOT rendered when on the profile page
    expect(screen.queryByRole('button', { name: /profile/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
  });

  // We can add more tests as needed for specific functionality and interactions
});
