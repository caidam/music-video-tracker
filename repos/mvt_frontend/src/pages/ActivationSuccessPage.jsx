import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DJ_BASE_URL } from '../config';
import { Button } from '@/components/ui/button';

const ActivationSuccessPage = () => {
  const { uid, token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const activateUser = async () => {
      const response = await fetch(`${DJ_BASE_URL}/api/activate/${uid}/${token}/`);
      if (response.ok) {
        setMessage('Congratulations! User activation was successful, you can now login.');
      } else {
        setMessage('User activation failed. Please try again.');
      }
    };

    activateUser();
  }, [uid, token]);

  return (
    <div className="flex items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-1 items-center justify-center w-full max-w-screen-lg p-16 rounded-lg border shadow-sm">
        <div className="flex flex-col items-center gap-4 text-center p-4 sm:p-8 lg:p-16">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Account Activation
          </h3>
          <p className="text-md sm:text-lg lg:text-xl">
            {message}
          </p>
          <Button className="mt-4">
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivationSuccessPage;