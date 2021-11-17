import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage";
import ValidationPage from "views/ValidationPage/ValidationPage";
import LandingPage from "views/LandingPage/LandingPage.jsx";
import ReactGA from "react-ga";
import PrivateRoute from "components/Routes/PrivateRoute";
import PublicRoute from "components/Routes/PublicRoute";

var hist = createBrowserHistory();

ReactGA.initialize("UA-134177845-1");

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <PrivateRoute path="/validation" component={ValidationPage} />
      <PublicRoute path="/signup" restricted={false} component={SignupPage} />
      <PublicRoute path="/login" restricted={false} component={LoginPage} />
      <PublicRoute path="/" restricted={false} component={LandingPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
