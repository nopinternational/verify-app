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
              <h1 className={classes.title}>Night op</h1>
              <h4>Socialt. Passion. S.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <Article title="Bli medlem">
            <p>
              Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar
              emot par som medlemmar som är seriösa och som delar nätverkets
              värderingar.
            </p>
            <p className={classes.description}>
              Nedan kan ni ansöka om att bli medlemmar. För att bli medlemmar så
              krävs det också att ni verifierar er som ett par. Det sker i nästa
              steg efter att ni fyllt i nedanstående.
            </p>
            <BecomeAMemberForm />
          </Article>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
