import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, white, isDashboard } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  return (
    <footer className={isDashboard ? classes.dashboardFooter : classes.footer}>
      <div className={container}>
        <p className={classes.copyright}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a href="https://www.dashroad.com" className={anchor}>
            Keemut
          </a>
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool,
  isDashboard: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
