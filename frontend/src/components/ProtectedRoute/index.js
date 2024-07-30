import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';

// Example authentication function (replace with actual logic)
const isAuthenticated = () => {
  const token = Cookies.get('token');
  console.log('token: ', token);
  return !!token;
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      
      render={(props) =>
        isAuthenticated() ? (
          <Component {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
