import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../navbar';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(() => ({ pathname: '/' })),
}));

describe('Navbar Component', () => {
  it('Profile is on the page', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument();
  });

});