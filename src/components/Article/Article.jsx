import React from "react";
import { Link } from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";

const Article = (props) => {
  const { classes, title, children, cta } = props;

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

export default withStyles(productStyle)(Article);

Article.propTypes = {
  classes: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  cta: PropTypes.node.isRequired,
};
