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
    name: "",
    email: "",
    message: "",
    images: {},
  });

  const [isValidated, setValidated] = useState(false);
  const [images, setImages] = useState([{ url: "", ref: "" }]);
  //const [firebaseImages, setFirebaseImages] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  // useEffect(() => {
  //   if ("foo" == fileInputRef) {
  //     console.log("update firebase images");
  //     const promiseUrls = firebaseImages.map((ref) => {
  //       console.log("ref: ", ref);
  //       const u = getImageUrl(ref);
  //       return u;
  //     });
  //     console.log("promiseUrls: ", promiseUrls);
  //     Promise.all(promiseUrls).then((resolvedUrls) => {
  //       console.log("resolved? ", resolvedUrls);
  //       setImages(resolvedUrls);
  //     });
  //     console.log("promiseUrls: ", promiseUrls);
  //   }
  // }, [firebaseImages]);

  useEffect(() => {
    const offValidationDataChange = onValidationDataChange((data) => {
      setSignupData({ ...data });
      setValidated(data.validation);
      console.log("DATA LOADED: ", data);

      //setFirebaseImages(data.firebaseImages);
      let imgs = [];
      if (data.images) {
        imgs = data.images;
        console.log("imgs before mapping: ", imgs);
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

    persistSignupData(userid, signupData, images);
  };

  const uploadPhoto = (event) => {
    fileInputRef.current.click();
    event.stopPropagation();
    event.preventDefault();
  };

  const fileSelectorChange = (event) => {
    const file = event.target.files[0];
    storeInMemory(file);
    uploadToFirebase(file);
  };

  const storeInMemory = (file) => {
    var reader = new FileReader();
    reader.onload = function (event) {
      const url = event.target.result;
      const newImages = images.concat(url);
      setImages(newImages);
    };
    reader.readAsDataURL(file);
  };

  const uploadToFirebase = (file) => {
    persistImage(file, (metadata) => {
      //firebaseImages.push(metadata.fullPath);
      //setFirebaseImages(firebaseImages);
      images.push({ ref: metadata.fullPath });
      setImages(images);
      console.log("images: ", images);
      setSignupData({ ...signupData, images: images });
    });
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      ReactGA.event({
        category: "Profile",
        action: "Validate Clicked",
      });
      setValidationPending;
      writesignupDataToFirebase(getUser().uid, signupData);
      ReactGA.event({
        category: "Signup",
        action: "Validate Ok",
      });
    }
  };

  const handleOnDeleteImage = (src) => {
    const newImages = images.filter((img) => img.url !== src);
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
    console.log("imageView.images: ", images);
    return (
      <div>
        <GridContainer>
          {images.map((image, index) => {
            console.log("imageView.images.image: ", image);
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
            labelText="Namn"
            id="name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              name: "name",
              onChange: handleChange,
              type: "text",
              value: signupData.name,
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
              onChange: handleChange,
              name: "email",
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
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            labelText="Ev meddelande till oss, kod, kik etc"
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
