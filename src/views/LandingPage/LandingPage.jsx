import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Layout from "components/Layout/Layout.jsx";
import Article from "components/Article/Article.jsx";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.js";
import { logout } from "services/firebase/auth";

// Sections for this page

const useStyles = makeStyles(landingPageStyle);

const LandingPage = () => {
  const classes = useStyles();

  const ctaSignup = [{ link: "signup", text: "Gå med" }];
  const ctaLogin = [{ link: "login", text: "Logga in" }];

  const signOut = () => {
    logout();
  };
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
          <Article title="Bli medlem" cta={ctaSignup}>
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
          </Article>
          <Article title="Logga in" cta={ctaLogin}>
            <p className={classes.description}>
              Är ni redan med eller har påbörjat er ansökan så ska ni logga in
              istället.
            </p>
          </Article>

          <Article title="Logga ut">
            <p className={classes.description}>
              Om ni är inloggade går det bra att logga ut här
            </p>
            <Button
              color="primary"
              onClick={() => {
                signOut();
              }}
            >
              Logga ut
            </Button>
          </Article>
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage;
