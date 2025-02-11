import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import { LoginForm } from '../LoginFormComponent';

describe('LoginForm Component', () => {
  const loginUserMock = jest.fn();

  beforeEach(() => {
    render(
      <HashRouter>
        <LoginForm loginUser={loginUserMock} />
      </HashRouter>
    );
  });

  test('renders LoginForm with fields and button', () => {
    expect(screen.getByRole('heading', { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByText(/Enter your email below to log into your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('shows and hides password', () => {
    const passwordInput = screen.getByPlaceholderText(/Your password/i);
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

  test('calls loginUser on form submission', () => {
    fireEvent.change(screen.getByPlaceholderText(/Your username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText(/Your password/i), { target: { value: 'password' } });

    fireEvent.submit(screen.getByRole('button', { name: /Sign In/i }));

    expect(loginUserMock).toHaveBeenCalled();
  });
});
