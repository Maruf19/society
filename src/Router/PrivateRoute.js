import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element, isAuthenticated }) => {
  const location = useLocation();

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/Login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
