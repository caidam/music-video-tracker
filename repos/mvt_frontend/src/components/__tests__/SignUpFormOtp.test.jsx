import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import { SignUpFormOtp } from '../LoginFormComponent';

describe('SignUpFormOtp Component', () => {
  const signupUserMock = jest.fn();
  const validateOtpMock = jest.fn();

  const renderComponent = (isOtpValid) => {
    render(
      <HashRouter>
        <SignUpFormOtp signupUser={signupUserMock} isOtpValid={isOtpValid} validateOtp={validateOtpMock} />
      </HashRouter>
    );
  };

  test('renders OTP input when OTP is not valid', () => {
    renderComponent(false);
    expect(screen.getByText(/Enter your access code to sign up/i)).toBeInTheDocument();
    // Ensure input is associated with label
    expect(screen.getByLabelText(/Access Code/i)).toBeInTheDocument();
  });

  test('renders sign up form when OTP is valid', () => {
    renderComponent(true);
    expect(screen.getByText(/Enter your information to create an account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('shows and hides password', () => {
    renderComponent(true);
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

  test('calls signupUser on form submission when OTP is valid', () => {
    renderComponent(true);

    fireEvent.change(screen.getByPlaceholderText(/Enter a username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/m@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Enter a password/i), { target: { value: 'password' } });

    fireEvent.submit(screen.getByRole('button', { name: /Sign Up/i }));

    expect(signupUserMock).toHaveBeenCalled();
  });
});
