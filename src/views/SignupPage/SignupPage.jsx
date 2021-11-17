import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Layout from "components/Layout/Layout.jsx";
import Article from "components/Article/Article.jsx";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import BecomeAMemberForm from "./Sections/BecomeAMemberForm.jsx";

const useStyles = makeStyles(landingPageStyle);

const SignupPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg").default}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Night of Passion</h1>
              <h4>Socialt. Passion. Sex.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article title="Bli medlem">
            <p className={classes.description}>
              Vad roligt att ni är intresserade av att vara med. Börja med att
              fylla i nedanstående så tar vi verifieringen i nästa steg.
            </p>

            <BecomeAMemberForm />
          </Article>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
