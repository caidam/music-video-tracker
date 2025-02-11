import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import { PasswordResetConfirmForm } from '../LoginFormComponent';

describe('PasswordResetConfirmForm Component', () => {
  const confirmPasswordResetMock = jest.fn();

  beforeEach(() => {
    render(
      <HashRouter>
        <PasswordResetConfirmForm confirmPasswordReset={confirmPasswordResetMock} />
      </HashRouter>
    );
  });

  test('renders PasswordResetConfirmForm with fields and button', () => {
    expect(screen.getByRole('heading', { name: /Password Reset/i })).toBeInTheDocument();
    expect(screen.getByText(/Enter your new password below/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/New Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('shows and hides password', () => {
    const passwordInput = screen.getByPlaceholderText(/Your new password/i);
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

  test('calls confirmPasswordReset on form submission', () => {
    fireEvent.change(screen.getByPlaceholderText(/Your new password/i), { target: { value: 'newpassword' } });

    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));

    expect(confirmPasswordResetMock).toHaveBeenCalled();
  });
});
