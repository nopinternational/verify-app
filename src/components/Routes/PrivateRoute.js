import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { isLogin } from "../utils";
import PropTypes from "prop-types";
import { getUser } from "services/firebase/auth";

const isLogin = () => {
  const u = getUser();
  const empty = !isEmpty(u);
  return empty;
};
const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.func,
};
