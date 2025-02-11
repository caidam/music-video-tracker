import React, { useState } from 'react';
import { DJ_BASE_URL } from '../config';
import { PasswordResetRequestForm } from '@/components/LoginFormComponent';
import { toast, Toaster } from 'sonner';

const PasswordResetRequestPage = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = (email) => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format';
    return newErrors;
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;

    const formErrors = validateForm(email);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
      return;
    }

    const resetPromise = fetch(`${DJ_BASE_URL}/api/request-password-reset/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong!');
      }
    });

    toast.promise(resetPromise, {
      loading: 'Loading...',
      success: 'Password reset email has been sent.',
      error: 'Something went wrong!',
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen" >
      <PasswordResetRequestForm requestPasswordReset={requestPasswordReset} />
      {/* <Toaster richColors closeButton /> */}
    </div>
  );
};

export default PasswordResetRequestPage;