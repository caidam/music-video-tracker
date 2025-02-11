import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { LoginForm } from '@/components/LoginFormComponent';
import { toast, Toaster } from 'sonner';

const LoginPage = () => {
  const [errors, setErrors] = useState({});
  let { loginUser } = useContext(AuthContext);

  const validateForm = (username, password) => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    const formErrors = validateForm(username, password);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      Object.values(formErrors).forEach(error => toast.error(error));
      return;
    }

    const loginPromise = loginUser(e);

    toast.promise(loginPromise, {
      loading: 'Signing in...',
      // success: 'Signed in successfully!', // not needed since it switches to home immediately
      error: 'Sign-in failed!',
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm loginUser={handleLogin} />
      {/* <Toaster richColors closeButton /> */}
    </div>
  );
};

export default LoginPage;