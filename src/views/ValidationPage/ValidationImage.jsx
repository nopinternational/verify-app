import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";

// core components
import Button from "components/CustomButtons/Button.js";

import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle.js";
import { getImageUrl } from "services/firebase/image";
import PropTypes from "prop-types";

const useStyles = makeStyles(typographyStyle);

const ValidationImage = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isError, setError] = useState(false);
  const classes = useStyles();
  const { imageref, onDelete } = props;
  const [src, setSrc] = useState();

  useEffect(() => {
    setLoaded(false);

    getImageUrl(imageref)
      .then((url) => {
        setSrc(url);
        setError(false);
        setLoaded(true);
      })
      .catch(() => {
        setError(true);
        setLoaded(true);
      });
  }, [imageref]);

  const onclick = (event) => {
    event.value;
    onDelete(imageref);
  };

  const renderSpinner = () => (
    <div>
      <CircularProgress />
    </div>
  );

  const renderLoaded = () => {
    return isError ? renderError : renderImage;
  };

  const renderError = (
    <div>
      <div>
        <ErrorIcon />
      </div>
      <div>Image could not be loaded</div>
      <Button type="button" color="primary" size="sm" onClick={onclick}>
        Ta bort
      </Button>
    </div>
  );

  const renderImage = (
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

  return isLoaded ? renderLoaded() : renderSpinner();
};

ValidationImage.propTypes = {
  imageref: PropTypes.string,
  onDelete: PropTypes.func,
};
export default ValidationImage;
