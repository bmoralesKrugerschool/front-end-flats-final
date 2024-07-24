import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from "./../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const requiredRole = "admin";
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  console.log('requiredRole:', requiredRole);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  /* if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  } */

  return(
    <Outlet />
  )


  /* const { isAuthenticated, user } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children; */
};

export default ProtectedRoute;
