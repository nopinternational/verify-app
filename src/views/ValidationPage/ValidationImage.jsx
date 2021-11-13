import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";

import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import { getImageUrl } from "services/firebase/image";
import PropTypes from "prop-types";

const useStyles = makeStyles(typographyStyle);

const ValidationImage = (props) => {
  const classes = useStyles();
  const { imageref, onDelete } = props;
  const [src, setSrc] = useState();
  const [imgref] = useState();

  useEffect(() => {
    console.log(`${imageref} => ???`);
    getImageUrl(imageref).then((url) => {
      console.log(`${imageref} => ${url}`);
      setSrc(url);
    });
  }, [imgref]);

  const onclick = (event) => {
    event.value;
    onDelete(imageref);
  };
  return (
    <div>
      <img
        className={classes.imgRounded + " " + classes.imgFluid}
        src={src}
        alt=""
      />
      <Button type="button" color="primary" size="sm" onClick={onclick}>
        Ta bort
      </Button>
    </div>
  );
};

ValidationImage.propTypes = {
  imageref: PropTypes.string,
  onDelete: PropTypes.func,
};
export default ValidationImage;
