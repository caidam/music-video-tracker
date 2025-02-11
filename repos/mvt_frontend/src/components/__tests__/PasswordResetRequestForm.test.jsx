import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HashRouter } from 'react-router-dom';
import { PasswordResetRequestForm } from '../LoginFormComponent';

describe('PasswordResetRequestForm Component', () => {
  const requestPasswordResetMock = jest.fn();

  beforeEach(() => {
    render(
      <HashRouter>
        <PasswordResetRequestForm requestPasswordReset={requestPasswordResetMock} />
      </HashRouter>
    );
  });

  test('renders PasswordResetRequestForm with fields and button', () => {
    expect(screen.getByRole('heading', { name: /Request Password Reset/i })).toBeInTheDocument();
    expect(screen.getByText(/Enter your email below to update your password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  test('calls requestPasswordReset on form submission', () => {
    fireEvent.change(screen.getByPlaceholderText(/m@example.com/i), { target: { value: 'test@example.com' } });

    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));

    expect(requestPasswordResetMock).toHaveBeenCalled();
  });
});
