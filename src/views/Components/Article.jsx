import React from "react";
import { Link } from "gatsby";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";

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
