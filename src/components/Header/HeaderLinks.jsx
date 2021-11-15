/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload, AccountCircle } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.js";

import ReactGA from "react-ga";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.js";
//import { app as firebase } from "services/firebase.js";
import { logout, isLoggedIn, getUser } from "services/firebase/auth";

const HeaderLinks = (props) => {
  const handleSignout = () => {
    logout().then(() => {});
    ReactGA.event({
      category: "MyAccount",
      action: "Signout clicked",
    });
  };

  const user = () => {
    const u = getUser();
    return u.displayName || "";
  };

  const getLoggedInItems = () => {
    return [
      // <Link to={"/app/profile"} className={classes.link}>
      //   <Button color="transparent" className={classes.navLink}>
      //     Min sida
      //   </Button>
      // </Link>,
      <Button>{user()}</Button>,
      <Link to={"/app/profile"} className={classes.link}>
        <Button color="transparent" className={classes.navLink}>
          Min sida
        </Button>
      </Link>,
      <Link to={"/"} className={classes.link}>
        <Button
          color="transparent"
          onClick={handleSignout}
          className={classes.navLink}
        >
          Logga out
        </Button>
      </Link>,
    ];
  };
  const getNotLoggedInItems = () => {
    return [
      <Link to={"/signup"} className={classes.link}>
        <Button color="transparent" className={classes.navLink}>
          Bli medlem
        </Button>
      </Link>,
      <Link to={"/login"} className={classes.link}>
        <Button color="transparent" className={classes.navLink}>
          Logga in
        </Button>
      </Link>,
    ];
  };
  const getMenuItems = () => {
    if (isLoggedIn()) {
      return getLoggedInItems();
    }
    return getNotLoggedInItems();
  };
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Mitt konto "
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={AccountCircle}
          dropdownList={getMenuItems()}
        />
      </ListItem>
    </List>
  );
};

export default withStyles(headerLinksStyle)(HeaderLinks);
