import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";

// material-ui icons
import Menu from "@material-ui/icons/Menu";
import MoreVert from "@material-ui/icons/MoreVert";
import ViewList from "@material-ui/icons/ViewList";

// core components
import HeaderLinks from "./HeaderLinks";
import Button from "components/CustomButtons/Button.jsx";

import headerStyle from "assets/jss/material-dashboard-pro-react/components/headerStyle.jsx";

@withStyles(headerStyle)
@withRouter
export default class Header extends React.Component {
  state = {
    pageTitle: "Dashboard"
  }

  componentWillMount() {
    this.getRoute(this.props.location.pathname);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.getRoute(this.props.location.pathname);
    }
  }

  getRoute = (pathname: string) => {
    const routes = [
      {
        route: "/map/trips",
        title: "Map Trips Report"
      },
      {
        route: "/map/heatmap",
        title: "Map Heatmap"
      },
      {
        route: "/map/geofence",
        title: "Map Geofence"
      },
      {
        route: "/histogram",
        title: "Histogram"
      },
      {
        route: "/vehicles",
        title: "Vehicles"
      },
      {
        route: "/settings/general",
        title: "Settings / General"
      },
      {
        route: "/settings/changePassword",
        title: "Settings / Change Password"
      },
      {
        route: "/settings/payment",
        title: "Settings / Payment"
      }
    ];

    let { pageTitle } = this.state;

    if (pathname === '/') {
      pageTitle = "Dashboard";
    }

    if (pathname !== "Dashboard") {
      for (let i = 0; i < routes.length; i++) {
        if (pathname.includes(routes[i].route)) {
          pageTitle = routes[i].title;
        }
      }
    }

    if (pageTitle === this.state.pageTitle) {
      pageTitle = "Dashboard";
    }

    this.setState({ pageTitle });
  }

  render() {
    const { classes, color, rtlActive } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    const sidebarMinimize =
      classes.sidebarMinimize +
      " " +
      cx({
        [classes.sidebarMinimizeRTL]: rtlActive
      });

    return (
      <AppBar className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown implementation="css">
            <div className={sidebarMinimize}>
              {this.props.miniActive ? (
                <Button
                  justIcon
                  round
                  color="white"
                  onClick={this.props.sidebarMinimize}
                >
                  <ViewList className={classes.sidebarMiniIcon} />
                </Button>
              ) : (
                <Button
                  justIcon
                  round
                  color="white"
                  onClick={this.props.sidebarMinimize}
                >
                  <MoreVert className={classes.sidebarMiniIcon} />
                </Button>
              )}
            </div>
          </Hidden>
          <div className={classes.flex}>
            {/* Here we create navbar brand, based on route name */}
            <Button href="#" className={`${classes.title} font-lato`} color="transparent">
              {this.state.pageTitle}
            </Button>
          </div>
          <Hidden smDown implementation="css">
            <HeaderLinks rtlActive={rtlActive} />
          </Hidden>
          <Hidden mdUp implementation="css">
            <Button
              className={classes.appResponsive}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.props.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  location: PropTypes.object.isRequired
};