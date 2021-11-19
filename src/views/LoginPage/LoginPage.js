import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import FavoriteIcon from "@material-ui/icons/Favorite";

//import People from "@material-ui/icons/People";
// core components
//import Header from "components/Header/Header.jsx";
//import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/zero.jpg";
import { signin } from "services/firebase/auth";
import ReactGA from "react-ga";

const useStyles = makeStyles(styles);

export default function LoginPage(/*props*/) {
  const history = useHistory();

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessaage, setDialogMessage] = useState("");

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleChange = (event) => {
    const name = event.target.getAttribute("name");

    setLoginData({ ...loginData, [name]: event.target.value });
  };

  const handleSubmit = () => {
    ReactGA.event({
      category: "Login",
      action: "Login clicked",
    });
    signin(
      loginData.email,
      loginData.password,
      () => {
        ReactGA.event({
          category: "Login",
          action: "Login success",
        });
        history.push("/validation");
      },
      (error) => {
        ReactGA.event({
          category: "Login",
          action: "Login failed",
        });
        var errorCode = error.code;
        var errorMessage = error.message;
        errorMessage;
        if (errorCode === "auth/user-not-found") {
          setDialogMessage("Felaktig kombination av epost och lösenord");
          setShowDialog(true);
        } else if (errorCode === "auth/weak-password") {
          setDialogMessage("Lösenordet är för enkelt, välj ett svårare");
          setShowDialog(true);
        } else if (errorCode === "auth/too-many-requests") {
          setDialogMessage(
            "Ditt konto har av säkerhetsskäl temporärt blivit blockat. Försök igen senare eller återställ ditt lösenord."
          );
          setShowDialog(true);
        } else if (errorCode === "auth/email-already-in-use") {
          setShowDialog(true);
          setDialogMessage(
            "Eposten finns redan registrerad hos oss, vänligen välj en annan eller återställ ditt lösenord"
          );
        } else if (errorCode === "auth/invalid-email") {
          setDialogMessage("Eposten har ett ogiltigt format");
          setShowDialog(true);
        } else {
          setDialogMessage(
            "Hoppla, nu har det hänt något oväntat. Vi ska ta reda på vad som hänt och fixa det!"
          );
          setShowDialog(true);
        }
      }
    );
  };

  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();
  //const { ...rest } = props;
  return (
    <div>
      {/* 
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      */}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                    {/*
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                      </div>
                      */}
                  </CardHeader>
                  {/*
                  <p className={classes.divider}>Or Be Classical</p>
                  */}
                  <CardBody>
                    {/* 
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    */}
                    <CustomInput
                      labelText="Epost"
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        name: "email",
                        onChange: handleChange,
                        value: loginData.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        name: "password",
                        onChange: handleChange,
                        value: loginData.password,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="primary" size="lg" onClick={handleSubmit}>
                      <FavoriteIcon className={classes.icons} />
                      Låt det roliga börja
                    </Button>
                  </CardFooter>
                </form>
                <Dialog
                  open={showDialog}
                  onClose={handleCloseDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Felaktig login"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {dialogMessaage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
