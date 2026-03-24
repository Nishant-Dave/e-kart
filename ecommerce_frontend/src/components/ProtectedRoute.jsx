import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

/**
 * A wrapper component that strictly checks for an active JWT token.
 * If validation fails, violently redirects the user straight to /login, 
 * preserving their original requested destination in react-router state.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem('access_token') || localStorage.getItem('token');
  const location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so we can drop them off there after they login (e.g. /cart)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
