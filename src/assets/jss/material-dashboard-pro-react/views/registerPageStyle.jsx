// ##############################
// // // RegisterPage view styles
// #############################

import {
  container,
  cardTitle
} from "assets/jss/material-dashboard-pro-react.jsx";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx";

const registerPageStyle = {
  ...customCheckboxRadioSwitch,
  cardTitle: {
    ...cardTitle,
    textAlign: "center",
    fontSize: "47px",
    color: "#03314B",
    letterSpacing: "0.98px"
  },
  container: {
    ...container,
    position: "relative",
    zIndex: "3"
    // paddingTop: "23vh"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, 60px, 0)",
    padding: "40px 0px",
  },
  cardSignup: {
    transform: "translate3d(0, 0, 0)",
    transition: "all 300ms linear",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    // marginBottom: "100px",
    padding: "40px 0px",
    // marginTop: "15vh"
  },
  registerWrapper: {
    // width: "100%"
  },
  center: {
    textAlign: "center"
  },
  right: {
    textAlign: "right"
  },
  left: {
    textAlign: "left"
  },
  form: {
    padding: "0 10px",
    position: "relative"
  },
  socialsBox: {
    textAlign: "center",
    margin: "10px"
  },
  socialTitle: {
    textAlign: "center",
    fontSize: "12px",
    color: "#575757",
    letterSpacing: "0.83px"
  },
  inputAdornment: {
    marginRight: "18px",
    position: "relative"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  customFormControlClasses: {
    margin: "0 12px"
  },
  checkboxLabelControl: {
    margin: "0"
  },
  checkboxLabel: {
    marginLeft: "6px",
    color: "rgba(0, 0, 0, 0.26)"
  }
};

export default registerPageStyle;
