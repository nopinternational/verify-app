import React from "react";

import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.js";
//import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Button from "components/CustomButtons/Button.js";

import ReactGA from "react-ga";

import PropTypes from "prop-types";

import styles from "assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import { logout, isLoggedIn, getUser } from "services/firebase/auth";

const dashboardRoutes = [];

const handleSignout = (event) => {
  event.preventDefault();
  logout().then(() => {
    console.log("user is logged out");
  });
  ReactGA.event({
    category: "MyAccount",
    action: "Signout clicked",
  });
};

const user = () => {
  const u = getUser();
  console.log("user:", u);
  return u.displayName || "";
};

const rightLinks = (classes) => {
  if (isLoggedIn())
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button
            href=""
            className={classes.navLink}
            onClick={(e) => e.preventDefault()}
            color="transparent"
          >
            {user()}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Link to={"/"} className={classes.link}>
            <Button
              href=""
              className={classes.navLink}
              onClick={(e) => handleSignout(e)}
              color="transparent"
            >
              Logga ut
            </Button>
          </Link>
        </ListItem>
      </List>
    );
  return null;
};
const useStyles = makeStyles(styles);
const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Night of Passion"
        rightLinks={rightLinks(classes)}
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white",
        }}
      />
      {children}
      <Footer>hello</Footer>
    </>
  );
};
export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
