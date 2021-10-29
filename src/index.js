import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.10.0";

// pages for this product
import LoginPage from "views/LoginPage/LoginPage.js";
import SignupPage from "views/SignupPage/SignupPage";
import ReactGA from "react-ga";
import ValidationPage from "views/ValidationPage/ValidationPage";

var hist = createBrowserHistory();

ReactGA.initialize("UA-134177845-1");

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/app/validation" component={ValidationPage} />
      <Route path="/app/profile" component={ValidationPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/" component={SignupPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
