import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "components/CustomButtons/Button.js";

import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";

import PropTypes from "prop-types";

const useStyles = makeStyles(typographyStyle);

const ValidationImage = (props) => {
  const classes = useStyles();
  const { src, onDelete } = props;

  const onclick = (event) => {
    event.value;
    onDelete(src);
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
  src: PropTypes.string,
  onDelete: PropTypes.func,
};
export default ValidationImage;
