import React, { useState } from "react";
import { Link } from "react";
import { useHistory } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Message from "@material-ui/icons/Message";
import Lock from "@material-ui/icons/Lock";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import {
  setUser,
  userSignedIn,
  setDisplayName,
} from "services/firebase/auth.js";

import ReactGA from "react-ga";

const BecomeAMemberForm = (props) => {
  const { classes } = props;
  const history = useHistory();

  const [validateOnChange, setValidateOnChange] = useState(false);
  const [password2, setPassword2] = useState("");

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    message: "",
    password: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessaage, setDialogMessage] = useState("");
  const [dataSent] = useState(false);
  const [nameErrorState, setNameErrorState] = useState({
    error: false,
    helperText: "",
  });
  const [emailErrorState, setEmailErrorState] = useState({
    error: false,
    helperText: "",
  });
  const [passwordErrorState, setPasswordErrorState] = useState({
    error: false,
    helperText: "",
  });
  const [pass2ErrorState, setPass2ErrorState] = useState({
    error: false,
    helperText: "",
  });

  const [submitEnabled, setSubmitEnabled] = useState(true);

  const handleChange = (event) => {
    const name = event.target.getAttribute("name");
    const newSignupData = { ...signupData, [name]: event.target.value };
    setSignupData(newSignupData);
    if (validateOnChange) {
      let validated = validateUsername(newSignupData.username);
      validated &= validateEmail(newSignupData.email);
      validated &= validatePassword(newSignupData.password);
      setSubmitEnabled(validated);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const secondPasswordChange = (event) => {
    const pass2 = event.target.value;
    setPassword2(pass2);
    validatePassword2(pass2);
  };

  function signupUser(signupData) {
    const firebase_auth = getAuth();
    createUserWithEmailAndPassword(
      firebase_auth,
      signupData.email,
      signupData.password
    )
      .then((result) => {
        // signInSuccessUrl: '/app/profile',
        userSignedIn(firebase_auth);
        setDisplayName(result.user, signupData.username);
        setUser(result.user);
        writesignupDataToFirebase(result.user.uid, signupData);
        ReactGA.event({
          category: "Signup",
          action: "Signup Ok",
        });
        sendVerificationEmail();

        history.push("/validation");
      })
      .catch(function (error) {
        // Handle Errors here.
        ReactGA.event({
          category: "Signup",
          action: "Signup failed",
        });
        var errorCode = error.code;
        var errorMessage = error.message;
        errorMessage;
        if (errorCode === "auth/weak-password") {
          setDialogMessage("Lösenordet är för enkelt, välj ett svårare");
          setShowDialog(true);
        } else if (errorCode === "auth/email-already-in-use") {
          setShowDialog(true);
          setDialogMessage(
            "Eposten finns redan registrerad hos oss, vänligen välj en annan eller återställ ditt lösenord"
          );
        } else if (errorCode === "auth/invalid-email") {
          setDialogMessage("Eposten har ett ogiltigt format");
          setShowDialog(true);
        } else if (errorCode === "auth/operation-not-allowed") {
          setDialogMessage(
            "Hoppla, nu har det hänt något oväntat. Vi ska ta reda på vad som hänt och fixa det!"
          );
          setShowDialog(true);
        }
        console.error(error);
      });
  }

  const sendVerificationEmail = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    sendEmailVerification(user)
      .then(function () {})
      .catch(function (error) {
        console.error("// An error happened: ", error);
      });
  };

  const writesignupDataToFirebase = (userid, signupData) => {
    delete signupData["password"];
    const db = getDatabase();

    set(ref(db, `validation/${userid}/current`), {
      ...signupData,
      created: new Date().toISOString(),
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      ReactGA.event({
        category: "Signup",
        action: "Signup clicked",
      });
    }
    setValidateOnChange(true);
    let validated = validateUsername(signupData.username);
    validated &= validateEmail(signupData.email);
    validated &= validatePassword(signupData.password);
    validated &= validatePassword2(password2);
    validated &= !pass2ErrorState.error || validatePassword2("");
    if (!validated) {
      //setShowDialog(true)

      return;
    }
    //setDataSent(true)
    signupUser(signupData);
  };

  const validateUsername = (name) => {
    let validated = true;
    if (!name || name.length === 0) {
      validated = false;
      setNameErrorState({
        error: true,
        helperText: "Ni måste ange ett önskat användarnamn",
      });
    } else {
      setNameErrorState({
        error: false,
        helperText: "",
      });
    }

    return validated;
  };

  const validateEmail = (email) => {
    let validated = true;
    var re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || email.length === 0 || !re.test(String(email).toLowerCase())) {
      validated = false;
      setEmailErrorState({
        error: true,
        helperText: "Ni måste ange er epost",
      });
    } else {
      setEmailErrorState({
        error: false,
        helperText: "",
      });
    }

    return validated;
  };

  const validatePassword = (password) => {
    let validated = true;

    if (!password || password.length < 6) {
      validated = false;
      setPasswordErrorState({
        error: true,
        helperText: "Lösenordet måste vara minst 6 tecken",
      });
    } else {
      setPasswordErrorState({
        error: false,
        helperText: "",
      });
    }

    return validated;
  };

  const validatePassword2 = (password2) => {
    if (password2 !== signupData.password) {
      setPass2ErrorState({
        error: true,
        helperText: "Lösenorden stämmer inte",
      });
      return false;
    } else {
      setPass2ErrorState({ error: false, helperText: "" });
      return true;
    }
  };

  const dataSentView = () => {
    return (
      <div>
        <hr></hr>
        <p className={classes.highlight}>
          Tack så mycket, vi kommer strax att skicka ett mail till er. (Får ni
          inget mail så kolla en extra gång i spam-foldern)
        </p>
        <Link to={"/"} className={classes.link}>
          <Button color="primary">OK</Button>
        </Link>
      </div>
    );
  };

  const formView = () => {
    return (
      <div>
        <form id="signup-form">
          <CustomInput
            labelText="Önskat användarnamn"
            id="username"
            helperText={nameErrorState.helperText}
            formControlProps={{
              fullWidth: true,
              error: nameErrorState.error,
            }}
            inputProps={{
              name: "username",
              onChange: handleChange,
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Epost address"
            id="email"
            helperText={emailErrorState.helperText}
            formControlProps={{
              fullWidth: true,
              error: emailErrorState.error,
            }}
            inputProps={{
              onChange: handleChange,
              name: "email",
              type: "email",
              autoComplete: "email",
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Önskat lösenord"
            id="password"
            helperText={passwordErrorState.helperText}
            formControlProps={{
              fullWidth: true,
              error: passwordErrorState.error,
            }}
            inputProps={{
              onChange: handleChange,
              name: "password",
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Upprepa lösenord"
            id="password2"
            helperText={pass2ErrorState.helperText}
            formControlProps={{
              fullWidth: true,
              error: pass2ErrorState.error,
            }}
            inputProps={{
              onChange: secondPasswordChange,
              name: "password2",
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <Lock className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Ev meddelande till oss, VIP-kod etc"
            id="message"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: handleChange,
              name: "message",
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <Message className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="button"
            color="primary"
            size="lg"
            disabled={!submitEnabled}
            onClick={handleSubmit}
          >
            Bli medlem!
          </Button>
        </form>
        <Dialog
          open={showDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Fel i forumläret"}
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
      </div>
    );
  };

  return dataSent ? dataSentView() : formView();
};

export default withStyles(productStyle)(BecomeAMemberForm);
