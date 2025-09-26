import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const isAutenticated =localStorage.getItem("token");

  if (isAutenticated) {
    return children;
  } else {
    return <Navigate to="/login" />
  }
};

export default PrivateRoute