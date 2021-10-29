import React, { useState } from "react"
import { Link, navigate } from "gatsby"
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles"
import InputAdornment from "@material-ui/core/InputAdornment"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import TextField from "@material-ui/core/TextField"

// @material-ui/icons
import Email from "@material-ui/icons/Email"
import People from "@material-ui/icons/People"
import Message from "@material-ui/icons/Message"
import Lock from "@material-ui/icons/Lock"

// core components
import Button from "../../CustomButtons/Button.jsx"
import CustomInput from "../../CustomInput/CustomInput.jsx"

import productStyle from "../../../assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx"

import firebase from "gatsby-plugin-firebase"
import { logout } from "components/Auth/auth"
import { compose } from "recompose"

import { trackCustomEvent } from "gatsby-plugin-google-analytics"

const Logout = props => {
  const handleClick = event => {
    logout(firebase).then(navigate("/"))
  }

  const formView = () => {
    return (
      <div>
        <form id="logout-form">
          <Button type="button" color="primary" size="lg" onClick={handleClick}>
            Logga ut
          </Button>
        </form>
      </div>
    )
  }

  return formView()
}

export default compose(withStyles(productStyle))(Logout)
