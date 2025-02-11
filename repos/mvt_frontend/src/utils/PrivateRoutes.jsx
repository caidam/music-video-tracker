// import React from 'react'
// import { Outlet, Navigate } from 'react-router-dom'
// import { useContext } from 'react'
// import AuthContext from '../context/AuthContext'

// const PrivateRoutes = () => {
//   let { user } = useContext(AuthContext)

//   return (
//     // auth.token ? <Outlet /> : <Navigate to='/login' />
//     user ? <Outlet /> : <Navigate to='/login' />
//   )
// }

// export default PrivateRoutes

import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // List of public paths that should be accessible without authentication
  const publicPaths = ['/login', '/signup', '/signupotp', '/landing', '/request-password-reset', '/reset-password-confirm/:uidb64/:token', '/activate/:uid/:token'];

  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => location.pathname.match(new RegExp(`^${path.replace(/:\w+/g, '.*')}$`)));

  // If user is authenticated, allow access to protected routes
  // If the path is public, also allow access
  return user || isPublicPath ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;