import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DJ_BASE_URL } from '../config';
import { PasswordResetConfirmForm } from '@/components/LoginFormComponent';
import { toast, Toaster } from 'sonner';

const PasswordResetConfirmPage = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { uidb64, token } = useParams();

  const validateForm = (password) => {
    const newErrors = {};
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 5) newErrors.password = 'Password must be at least 5 characters long';
    return newErrors;
  };

  const confirmPasswordReset = async (e) => {
    e.preventDefault();

    const password = e.target.password.value;

    const formErrors = validateForm(password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
      return;
    }

    const resetPromise = fetch(`${DJ_BASE_URL}/api/reset-password-confirm/${uidb64}/${token}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong!');
      }
    });

    toast.promise(resetPromise, {
      loading: 'Loading...',
      success: 'Password has been reset.',
      error: 'Something went wrong!',
    }).then(() => {
      navigate('/login');
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <PasswordResetConfirmForm confirmPasswordReset={confirmPasswordReset} />
      {/* <Toaster richColors closeButton /> */}
    </div>
  );
};

export default PasswordResetConfirmPage;