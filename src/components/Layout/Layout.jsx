import React from "react";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.js";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
const dashboardRoutes = [];
import PropTypes from "prop-types";

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

const Layout = ({ children }) => {
  return (
    <>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Night of Passion"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 80,
          color: "white",
        }}
      />
      {children}
      <Footer></Footer>
    </>
  );
};
export default Layout;
