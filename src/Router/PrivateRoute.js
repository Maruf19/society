import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Firbase/authContext';

const PrivateRoute = () => {
  const { user } = useAuth(); // Access user from AuthContext

  return user ? <Outlet /> : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
