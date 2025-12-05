import React from "react";
import { Route, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';  // Correcta


const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {

    return <Navigate to="/iniciarsesion" />;
  }

  const decodedToken = jwtDecode(token);

  const hasRole = roles.some(role => decodedToken.roles.includes(role));

  if (!hasRole) {

    return <Navigate to="/" />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default PrivateRoute;
