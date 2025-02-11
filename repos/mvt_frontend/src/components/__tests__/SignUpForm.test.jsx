import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import { SignUpForm } from '../LoginFormComponent';

describe('SignUpForm Component', () => {
  const signupUserMock = jest.fn();

  beforeEach(() => {
    render(
      <HashRouter>
        <SignUpForm signupUser={signupUserMock} />
      </HashRouter>
    );
  });

  test('renders SignUpForm with fields and button', () => {
    expect(screen.getByRole('heading', { name: /Sign Up/i })).toBeInTheDocument();
    expect(screen.getByText(/Enter your information to create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows and hides password', () => {
    const passwordInput = screen.getByPlaceholderText(/Enter a password/i);
    const toggleButton = screen.getByRole('button', { name: '' });

    // Initially, the password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Simulate a click on the toggle button
    fireEvent.click(toggleButton);

    // Now, the password should be visible
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Simulate a click on the toggle button again
    fireEvent.click(toggleButton);

    // The password should be hidden again
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('calls signupUser on form submission', () => {
    fireEvent.change(screen.getByPlaceholderText(/Enter a username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/m@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter a password/i), { target: { value: 'password' } });

    fireEvent.submit(screen.getByRole('button', { name: /Sign Up/i }));

    expect(signupUserMock).toHaveBeenCalled();
  });
});
