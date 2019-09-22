import React from "react";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import "./index.scss";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import Place from "@material-ui/icons/Place";
import Assignment from "@material-ui/icons/Assignment";
import Icon from '@material-ui/core/Icon';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";

import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-pro-react/components/sidebarStyle.jsx";

// We've created this component so we can have a ref to the wrapper of the links that appears in our sidebar.
// This was necessary so that we could initialize PerfectScrollbar on the links.
// There might be something with the Hidden component from material-ui, and we didn't have access to
// the links, and couldn't initialize the plugin.
class SidebarWrapper extends React.Component {
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1 && this.ps) {
      this.ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1 && this.ps) {
      this.ps.destroy();
    }
  }
  render() {
    const { className, user, headerLinks, links } = this.props;
    return (
      <div className={className} ref="sidebarWrapper">
        {user}
        {links}
        {headerLinks}
      </div>
    );
  }
}

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openAvatar: false,
      openComponents: this.activeRoute("/components"),
      openForms: this.activeRoute("/forms"),
      openTables: this.activeRoute("/tables"),
      openMaps: this.activeRoute("/maps"),
      openPages: this.activeRoute("-page"),
      miniActive: true,
      map: props.location.pathname.includes('/map/'),
      settings: props.location.pathname.includes('/settings/'),
      reports: props.location.pathname.includes('/reports/')
    };
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    if (typeof routeName === 'object') {
      let value;
      for (let r = 0; r < routeName.length; r++) {
        value = value || (this.props.location.pathname === routeName[r]);
      }
      return value;
    }
    return this.props.location.pathname === routeName ? true : false;
  }
  
  handleClick = (e, vin) => {
    if (!vin) {
      e.preventDefault();
    }
  }
  openCollapse(collapse) {
    var st = {
      map: false,
      settings: false,
      reports: false,
    };
    st[collapse] = !this.state[collapse];
    this.setState(st);
  }
  render() {
    const {
      classes,
      color,
      logo,
      image,
      bgColor,
      rtlActive
    } = this.props;
    const vin = localStorage.getItem("activeVehicle") ? JSON.parse(localStorage.getItem("activeVehicle")).vin : this.props.match.params.vin;
    const itemText =
      classes.itemText +
      " " +
      cx({
        [classes.itemTextMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.itemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.itemTextRTL]: rtlActive
      });
    const navLinkClasses = (locationPath, linkKey) => (
      classes[linkKey] +
      (locationPath.includes('undefined') ? " disabled " : " ") +
      cx({
        [" " + classes[color]]: this.activeRoute(locationPath)
      })
    )
    const itemIcon =
      classes.itemIcon +
      " " +
      cx({
        [classes.itemIconRTL]: rtlActive
      });
    const collapseItemText =
      classes.collapseItemText +
      " " +
      cx({
        [classes.collapseItemTextMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextMiniRTL]:
          rtlActive && this.props.miniActive && this.state.miniActive,
        [classes.collapseItemTextRTL]: rtlActive
      });
    const caret =
      classes.caret +
      " " +
      cx({
        [classes.caretRTL]: rtlActive
      });
    const reportsList = [
      { name: 'Hourly', path: "/reports/hourly" },
      { name: 'Daily', path: "/reports/daily" },
      { name: 'Weekly', path: "/reports/weekly" }
    ]
    const mapsList = [
      { name: 'Trips', path: `/map/trips/${vin}` },
      { name: 'Heatmap', path: `/map/heatmap/${vin}` },
      { name: 'Geofence', path: `/map/geofenceList` }
    ]
    const settingsList = [
      { name: 'General', path: "/settings/general" },
      { name: 'Change Password', path: "/settings/changePassword" },
      { name: 'Payment', path: "/settings/payment" }
    ]

    var links = (
      <List className={classes.list}>
        <ListItem className={classes.item}>
          <NavLink to={`/dashboard/${vin}`} className={navLinkClasses('/dashboard/'+(vin || ''), 'itemLink')}>
            <ListItemIcon className={itemIcon}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText
              primary="Dashboard"
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink
            to="/reports"
            className={navLinkClasses('/reports', 'itemLink')}
            onClick={(e) => {
              e.preventDefault();
              return this.openCollapse('reports')
            }}
          >
            <ListItemIcon className={itemIcon}>
              <ListItemIcon className={itemIcon}>
                <Assignment />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary="Reports"
              secondary={
                <b
                  className={
                    caret +
                    " " +
                    (this.state.reports ? classes.caretActive : "")
                  }
                />
              }
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
          <Collapse in={this.state.reports} unmountOnExit>
            <List className={classes.list + " " + classes.collapseList}>
              {reportsList.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                }
                const collapseItemMini =
                  classes.collapseItemMini +
                  " " +
                  cx({
                    [classes.collapseItemMiniRTL]: rtlActive
                  });
                return (
                  <ListItem key={key} className={classes.collapseItem}>
                    <NavLink
                     to={prop.path}
                     className={navLinkClasses(prop.path, 'collapseItemLink')}
                    >
                      <span className={collapseItemMini}>
                        {prop.mini}
                      </span>
                      <ListItemText
                        primary={prop.name}
                        disableTypography={true}
                        className={collapseItemText}
                      />
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink to={`/vehicles`} className={navLinkClasses(`/vehicles`, 'itemLink')} onClick={(e) => this.handleClick(e, vin)}>
            <ListItemIcon className={itemIcon}>
              <Icon className={classes.icon} style={{color: '#ffffff'}}>
                list
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary="Vehicles"
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink
            to="/map"
            className={navLinkClasses('/map', 'itemLink')}
            onClick={(e) => {
              e.preventDefault();
              return this.openCollapse('map')
            }}
          >
            <ListItemIcon className={itemIcon}>
              <ListItemIcon className={itemIcon}>
                <Place />
              </ListItemIcon>
            </ListItemIcon>
            <ListItemText
              primary="Maps"
              secondary={
                <b
                  className={
                    caret +
                    " " +
                    (this.state.map ? classes.caretActive : "")
                  }
                />
              }
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
          <Collapse in={this.state.map} unmountOnExit>
            <List className={classes.list + " " + classes.collapseList}>
              {mapsList.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                }
                const collapseItemMini =
                  classes.collapseItemMini +
                  " " +
                  cx({
                    [classes.collapseItemMiniRTL]: rtlActive
                  });
                return (
                  <ListItem key={key} className={classes.collapseItem}>
                    <NavLink
                     to={prop.path}
                     className={navLinkClasses(prop.path, 'collapseItemLink')}
                    >
                      <span className={collapseItemMini}>
                        {prop.mini}
                      </span>
                      <ListItemText
                        primary={prop.name}
                        disableTypography={true}
                        className={collapseItemText}
                      />
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink to={`/histogram/${vin}`} className={navLinkClasses('/histogram/'+vin+'', 'itemLink')} onClick={(e) => this.handleClick(e, vin)}>
            <ListItemIcon className={itemIcon}>
              <Icon className={classes.icon} style={{color: '#ffffff'}}>
                bar_chart
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary="Histogram"
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink to={`/records`} className={navLinkClasses(`/records`, 'itemLink')} onClick={(e) => this.handleClick(e, vin)}>
            <ListItemIcon className={itemIcon}>
              <Icon className={classes.icon} style={{color: '#ffffff'}}>
              receipt
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary="Records"
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.item}>
          <NavLink
            to="/settings"
            className={navLinkClasses('/settings', 'itemLink')}
            onClick={(e) => {
              e.preventDefault();
              return this.openCollapse('settings')
            }}
          >
            <ListItemIcon className={itemIcon}>
              <Icon className={classes.icon} style={{color: '#ffffff'}}>
                settings
              </Icon>
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              secondary={
                <b
                  className={
                    caret +
                    " " +
                    (this.state.settings ? classes.caretActive : "")
                  }
                />
              }
              disableTypography={true}
              className={itemText}
            />
          </NavLink>
          <Collapse in={this.state.settings} unmountOnExit>
            <List className={classes.list + " " + classes.collapseList}>
              {settingsList.map((prop, key) => {
                if (prop.redirect) {
                  return null;
                }
                const collapseItemMini =
                  classes.collapseItemMini +
                  " " +
                  cx({
                    [classes.collapseItemMiniRTL]: rtlActive
                  });
                return (
                  <ListItem key={key} className={classes.collapseItem}>
                    <NavLink
                     to={prop.path}
                     className={navLinkClasses(prop.path, 'collapseItemLink')}
                    >
                      <span className={collapseItemMini}>
                        {prop.mini}
                      </span>
                      <ListItemText
                        primary={prop.name}
                        disableTypography={true}
                        className={collapseItemText}
                      />
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </ListItem>
      </List>
    );

    // const logoNormal =
    //   classes.logoNormal +
    //   " " +
    //   cx({
    //     [classes.logoNormalSidebarMini]:
    //       this.props.miniActive && this.state.miniActive,
    //     [classes.logoNormalSidebarMiniRTL]:
    //       rtlActive && this.props.miniActive && this.state.miniActive,
    //     [classes.logoNormalRTL]: rtlActive
    //   });
    const logoMini =
      classes.logoMini +
      " " +
      cx({
        [classes.logoMiniRTL]: rtlActive
      });
    const logoClasses =
      classes.logo +
      " " +
      cx({
        [classes.whiteAfter]: bgColor === "white"
      });
    var brand = (
      <div className={logoClasses} style={{ textAlign: "center" }}>
        <a href="" className={logoMini} style={{ maxHeight: "100%", marginTop: 0, float: "none" }}>
          <img src={logo} alt="logo" className={classes.img} style={{maxWidth: "100%"}} />
        </a>
        {/* <a href="" className={logoNormal}>
          {logoText}
        </a> */}
      </div>
    );
    const drawerPaper =
      classes.drawerPaper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.drawerPaperRTL]: rtlActive
      });
    const sidebarWrapper =
      classes.sidebarWrapper +
      " " +
      cx({
        [classes.drawerPaperMini]:
          this.props.miniActive && this.state.miniActive,
        [classes.sidebarWrapperWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div ref="mainPanel">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={rtlActive ? "left" : "right"}
            open={this.props.open}
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              headerLinks={<HeaderLinks rtlActive={rtlActive} />}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            onMouseOver={() => this.setState({ miniActive: false })}
            onMouseOut={() => this.setState({ miniActive: true })}
            anchor={rtlActive ? "right" : "left"}
            variant="permanent"
            open
            classes={{
              paper: drawerPaper + " " + classes[bgColor + "Background"]
            }}
          >
            {brand}
            <SidebarWrapper
              className={sidebarWrapper}
              links={links}
            />
            {image !== undefined ? (
              <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
              />
            ) : null}
          </Drawer>
        </Hidden>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  bgColor: "blue"
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  bgColor: PropTypes.oneOf(["white", "black", "blue"]),
  rtlActive: PropTypes.bool,
  color: PropTypes.oneOf([
    "white",
    "red",
    "orange",
    "green",
    "blue",
    "purple",
    "rose"
  ]),
  logo: PropTypes.string,
  logoText: PropTypes.string,
  image: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(sidebarStyle)(Sidebar);
