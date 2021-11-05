import React from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";

const useStyles = makeStyles(productStyle);
const Article = (props) => {
  const classes = useStyles();
  const { title, children, cta } = props;

  const renderCTA = (ctaArray) => {
    return ctaArray ? (
      <Link to={ctaArray[0].link} className={classes.link}>
        <Button color="primary">{ctaArray[0].text}</Button>
      </Link>
    ) : null;
  };

  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={8}>
        <h2 className={classes.title}>{title}</h2>
        <div className={classes.description}>{children}</div>
        {renderCTA(cta)}
      </GridItem>
    </GridContainer>
  );
};

export default Article;

Article.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  cta: PropTypes.array,
};
