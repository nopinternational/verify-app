import React, { createRef, useEffect, useState } from "react";
import { Link } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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
import DateRangeIcon from "@material-ui/icons/DateRange";

import AddAPhoto from "@material-ui/icons/AddAPhoto";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

// core components
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

import { getUser } from "services/firebase/auth";
//import { getImageUrl } from "services/firebase/image";
import {
  setValidationPending,
  persistSignupData,
  onValidationDataChange,
  persistImage,
} from "services/firebase/validationService.js";

//import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import ReactGA from "react-ga";
import ValidationImage from "./ValidationImage.jsx";

const useStyles = makeStyles(productStyle);

const ValidationForm = () => {
  const classes = useStyles();
  //const { setValidationStatus } = props;

  const fileInputRef = createRef();
  const [signupData, setSignupData] = useState({
    username: "",
    name1: "",
    name2: "",
    birthyear1: "",
    birthyear2: "",
    email: "",
    description: "",
    message: "",
    images: {},
  });

  const [isValidated, setValidated] = useState(false);
  const [images, setImages] = useState([{ ref: "" }]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const offValidationDataChange = onValidationDataChange((data) => {
      setSignupData({ ...data });
      setValidated(data.validation);
      let imgs = [];
      if (data.images) {
        imgs = data.images;
      }
      setImages(imgs || []);
    });

    //componentWillUnmount
    return () => {
      offValidationDataChange();
    };
  }, []);

  const handleChange = (event) => {
    const name = event.target.getAttribute("name");
    setSignupData({ ...signupData, [name]: event.target.value });
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const writesignupDataToFirebase = (userid, signupData) => {
    delete signupData["password"];
    delete signupData["username"];
    persistSignupData(userid, signupData);
  };

  const uploadPhoto = (event) => {
    fileInputRef.current.click();
    event.stopPropagation();
    event.preventDefault();
  };

  const fileSelectorChange = (event) => {
    const file = event.target.files[0];
    //storeInMemory(file);
    uploadToFirebase(file);
  };

  // const storeInMemory = (file) => {
  //   var reader = new FileReader();
  //   reader.onload = function (event) {
  //     const url = event.target.result;
  //     const newImages = images.concat(url);
  //     setImages(newImages);
  //   };
  //   reader.readAsDataURL(file);
  // };

  const uploadToFirebase = (file) => {
    persistImage(file, (metadata) => {
      //firebaseImages.push(metadata.fullPath);
      //setFirebaseImages(firebaseImages);
      images.push({ ref: metadata.fullPath });
      setImages(images);
      setSignupData({ ...signupData, images: images });
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      ReactGA.event({
        category: "Profile",
        action: "Validate clicked",
      });
      setValidationPending();
      writesignupDataToFirebase(getUser().uid, signupData);
    }
  };

  const handleOnDeleteImage = (ref) => {
    const newImages = images.filter((img) => img.ref !== ref);
    setImages(newImages);
  };

  const validatedView = () => {
    return (
      <div>
        <hr></hr>
        <InfoArea
          title="Verified"
          description="You have been verified"
          icon={VerifiedUser}
          iconColor="success"
          vertical
        />
        <Link to={"/"} className={classes.link}>
          <Button color="primary">OK</Button>
        </Link>
      </div>
    );
  };

  const imageView = () => {
    if (!images || images.length === 0) return null;
    return (
      <div>
        <GridContainer>
          {images.map((image, index) => {
            return (
              <GridItem xs={12} sm={6} md={4} key={index}>
                <ValidationImage
                  imageref={image.ref}
                  onDelete={handleOnDeleteImage}
                />
              </GridItem>
            );
          })}
        </GridContainer>
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
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "username",
              onChange: handleChange,
              type: "text",
              disabled: true,
              value: signupData.username,
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            labelText="Epost adress"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "email",
              onChange: handleChange,
              type: "email",
              disabled: true,
              autoComplete: "email",
              value: signupData.email,
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            labelText="Namn på kvinnan"
            id="name1"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "name1",
              onChange: handleChange,
              type: "text",
              value: signupData.name1,
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            labelText="Födelseår på kvinnan"
            id="birthyear1"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "birthyear1",
              onChange: handleChange,
              type: "number",
              value: signupData.birthyear1,
              endAdornment: (
                <InputAdornment position="end">
                  <DateRangeIcon className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            labelText="Namn på mannen"
            id="name2"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "name2",
              onChange: handleChange,
              type: "text",
              value: signupData.name2,
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            labelText="Födelseår på mannnen"
            id="birthyear2"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "birthyear2",
              onChange: handleChange,
              type: "number",
              value: signupData.birthyear2,
              endAdornment: (
                <InputAdornment position="end">
                  <DateRangeIcon className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            labelText="Skriv någon rad om er själva..."
            helperText="Ex var ni bor, ålder, hur länge ni
            varit tillsammans, ev erfarenheter och förväntningar etc. Här kan ni även ange kontaktuppgifter såsom mobilnummer,
            facebook, kik, BC etc. "
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: true,
              rows: 4,
              onChange: handleChange,
              name: "description",
              type: "text",
              value: signupData.description,

              endAdornment: (
                <InputAdornment position="end">
                  <Message className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <CustomInput
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            labelText="Ev meddelande till oss, kod etc"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: true,
              rows: 4,
              onChange: handleChange,
              name: "message",
              type: "text",
              value: signupData.message,
              endAdornment: (
                <InputAdornment position="end">
                  <Message className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />
          <Button color="primary" round onClick={uploadPhoto}>
            <AddAPhoto className={classes.icons} />
          </Button>
          <br />
          <input
            style={{ display: "none" }}
            type="file"
            id="fileupload"
            ref={fileInputRef}
            onChange={fileSelectorChange}
          />
          {imageView()}
          <Button
            type="button"
            color="primary"
            size="lg"
            onClick={handleSubmit}
          >
            Verifiera
          </Button>
        </form>
        <Dialog
          open={showDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Felaktig epost"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Eposten är på ett ogiltigt format.
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

  return isValidated ? validatedView() : formView();
};

export default ValidationForm;
