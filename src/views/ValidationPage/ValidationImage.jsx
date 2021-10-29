import React from "react"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"

// core components
import Button from "../../CustomButtons/Button.jsx"

import { compose } from "recompose"
import typographyStyle from "../../../assets/jss/material-kit-react/views/componentsSections/typographyStyle.jsx"

const ValidationImage = props => {
  const { classes, src, onDelete } = props

  const onclick = event => {
    onDelete(src)
  }
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
  )
}
export default compose(withStyles(typographyStyle))(ValidationImage)
