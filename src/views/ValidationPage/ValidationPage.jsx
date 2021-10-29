import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";

// @material-ui/icons

// core components
import Layout from "../../Layout/Layout.jsx";
import Article from "../../Article/Article.jsx";
import Button from "../../CustomButtons/Button.jsx";
import GridContainer from "../../Grid/GridContainer.jsx";
import GridItem from "../../Grid/GridItem.jsx";
import Parallax from "../../Parallax/Parallax.jsx";
import Quote from "../../Typography/Quote.jsx";

import landingPageStyle from "../../../assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ValidationForm from "./ValidationForm.jsx";
import firebase from "gatsby-plugin-firebase";
import { getUser } from "../../Auth/auth";
import { setValidationRetry } from "../../Firebase/FirebaseService";

const ValidationPage = (props) => {
  const { classes } = props;

  const [validationStatus, setValidationStatus] = useState({
    status: "none",
    message: "no message",
  });

  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const user = getUser();

    const uid = user.uid;
    const validationDataRef = firebase
      .database()
      .ref(`/validation/${uid}/status/`);

    validationDataRef.on(
      "value",
      (snapshot) => {
        const data = snapshot.val();

        setValidationStatus({ ...data });
        setContentLoaded(true);
      },
      (cancelCallback) => {
        //console.log("cancelCallback: ", cancelCallback)
      }
    );

    //componentWillUnmount
    return () => {
      validationDataRef.off();
    };
  }, []);

  const revalidate = () => {
    setValidationRetry(firebase);
  };
  const setStatus = (status) => {
    const user = getUser();

    const uid = user.uid;
    const validationDataRef = firebase
      .database()
      .ref(`/validation/${uid}/status/`);

    const newState = { ...validationStatus, status };
    validationDataRef.set(newState);
    setValidationStatus(newState);
  };

  const renderValidationForm = () => {
    return (
      <Article title="Verifiering">
        <p>
          Nätverket Night of Passion är en exklusiv medlemsklubb. Vi tar emot
          par som medlemmar som är seriösa och som delar nätverkets värderingar.
        </p>
        <p className={classes.description}>
          För att bli medlemmar så krävs det att ni verifierar er som ett par.
          Det gör ni så här:
        </p>
        <ul>
          <li>
            Skriv någon rad om er själva, ex var ni bor, ålder, hur länge ni
            varit tillsammans, ev erfarenheter och förväntningar etc. Valfritt
            är att skicka med andra kontaktuppgifter såsom mobilnummer,
            facebook, kik, BC etc. Det hindrar er inte från att gå med, men allt
            sådant bidrar till att stärka er trovärdighet som ett seriöst par
          </li>
          <li>
            Ladda upp en eller flera bilder på er. En av bilderna ska vara en
            nytagen bild på er tillsammans där ni håller upp en lapp med texten
            Night of Passion, eller NoP kort och gott.
          </li>
        </ul>
        <p className={classes.description}>
          Text och bilder som ni anger här kommer endast att användas för
          verifering. Den sköts av utvalda medlemspar i Night of Passion.
        </p>

        {renderValidationMessage()}
        <ValidationForm setValidationStatus={setStatus} />
      </Article>
    );
  };

  const renderValidationMessage = () => {
    if (validationStatus.message)
      return (
        <>
          <p className={classes.description}>
            Från er tidigare försök så fick ni meddelandet:
          </p>
          <Quote text={validationStatus.message || "(okänd anledning)"} />
        </>
      );
    return null;
  };

  const renderValidationPending = () => {
    return (
      <Article title="Tack för er ansökan!">
        <p className={classes.description}>
          Vi har mottagit er medlemsansökan med verifiering och vi kommer att
          granska den och återkommer så snart som möjligt. Detta sker normalt
          inom någon dag.
        </p>
      </Article>
    );
  };
  const renderValidationConfirmed = () => {
    return (
      <Article title="Medlemsansökan godkänd">
        <p className={classes.description}>
          Vi har godkänt er ansökan och ni är nu ett par i Night of Passion.
          Välkommen!
        </p>
        <p className={classes.description}>
          Men... Medlemssidan för Night of Passion är under uppbyggnad och vi
          jobbar för fullt med att göra klart siten för era härliga och sexiga
          profiler. Håll tillgodo men framförallt utkik... ses snart ;)
        </p>
      </Article>
    );
  };
  const renderValidationIncomplete = () => {
    return (
      <Article title="Komplettering krävs">
        <p className={classes.description}>
          Vi har behandlat er medlemsansökan med verifering och vi kan tyvärr
          inte godkänna den så som ni skickade in den. Nedan anger vi orsaken
          och hur ni kan rätta till det.
        </p>
        <Quote text={validationStatus.message || "(okänd anledning)"} />
        <p className={classes.description}>
          Ni kan fortsätta er verifering genom att klicka nedan.
        </p>
        <Button onClick={revalidate} color="primary">
          Verifiera
        </Button>
      </Article>
    );
  };

  const renderDenied = () => {
    return (
      <Article title="Medlemsansökan underkänd">
        <p className={classes.description}>
          Vi har underkänt er ansökan och vi kommer inte att kunna erbjuda er en
          plats i Night of Passion.
        </p>
        {validationStatus.message && <Quote text={validationStatus.message} />}
      </Article>
    );
  };

  const renderSpinner = () => {
    return (
      <Article>
        <CircularProgress />
      </Article>
    );
  };

  const renderContent = () => {
    switch (validationStatus.status) {
      case "PENDING": {
        return renderValidationPending();
      }

      case "CONFIRMED": {
        return renderValidationConfirmed();
      }
      case "INCOMPLETE": {
        return renderValidationIncomplete();
      }
      case "DENIED": {
        return renderDenied();
      }
      default: {
        return contentLoaded ? renderValidationForm() : renderSpinner();
      }
    }
  };

  return (
    <Layout>
      <Parallax filter image={require("assets/img/zero.jpg")}>
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
        <div className={classes.container}>{renderContent()}</div>
      </div>
    </Layout>
  );
};

export default withStyles(landingPageStyle)(ValidationPage);
