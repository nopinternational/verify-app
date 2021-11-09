import React from "react";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
const dashboardRoutes = [];
import PropTypes from "prop-types";
import { isLoggedIn } from "services/firebase/auth";

const rightLinks = () => {
  if (isLoggedIn()) return <HeaderLinks />;
  return null;
};
const Layout = ({ children }) => {
  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Night of Passion"
        rightLinks={rightLinks()}
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
