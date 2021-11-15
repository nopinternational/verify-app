import React from "react";
import { Route, Redirect } from "react-router-dom";
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

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isLogin() && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.func,
  restricted: PropTypes.bool,
};
