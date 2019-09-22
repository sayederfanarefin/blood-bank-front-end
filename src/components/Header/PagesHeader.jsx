import React from "react";
import cx from "classnames";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink, withRouter } from "react-router-dom";
import { logout } from 'actions/auth';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui/icons
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import Menu from "@material-ui/icons/Menu";

// core components
import Button from "components/CustomButtons/Button";

import pagesHeaderStyle from "assets/jss/material-dashboard-pro-react/components/pagesHeaderStyle.jsx";

type Props = {
  classes: Object,
  color: string,
  logout: Object,
  history: Object
}

type State = {
  open: boolean
}

@connect(
  null,
  dispatch => ({
    logout: bindActionCreators(logout, dispatch)
  })
)
@withStyles(pagesHeaderStyle)
@withRouter
export default class PagesHeader extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };
  // verifies if routeName is the one active (in browser input)
  activeRouteClassName = (routeName) => {
    const { classes } = this.props;
    const activeRoute = this.props.location.pathname.indexOf(routeName) > -1 ? true : false;
    const navLink =
      classes.navLink +
      cx({
        [" " + classes.navLinkActive]: activeRoute
      });
    return navLink;
  }

  handleLogout = () => {
    this.setState({ open: false });
    this.props.logout.request();
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.setState({ open: false });
    }
  }
  render() {
    const { classes, color, withoutLinks, history } = this.props;
    const appBarClasses = cx({
      [" " + classes[color]]: color
    });
    var list = !withoutLinks ? (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <NavLink to={"/register"} className={this.activeRouteClassName("/register")}>
            <ListItemIcon className={classes.listItemIcon}>
              <PersonAdd />
            </ListItemIcon>
            <ListItemText
              primary={"Register"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
        <ListItem className={classes.listItem}>
          <NavLink to={"/login"} className={this.activeRouteClassName("/login")}>
            <ListItemIcon className={classes.listItemIcon}>
              <Fingerprint />
            </ListItemIcon>
            <ListItemText
              primary={"Login"}
              disableTypography={true}
              className={classes.listItemText}
            />
          </NavLink>
        </ListItem>
      </List>
    ) : <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to='' className={this.activeRouteClassName("/")} onClick={this.handleLogout}>
          <ListItemIcon className={classes.listItemIcon}>
            <Fingerprint />
          </ListItemIcon>
          <ListItemText
            primary={"Logout"}
            disableTypography={true}
            className={classes.listItemText}
          />
        </NavLink>
      </ListItem>
    </List>;
    return (
      <AppBar position="static" className={classes.appBar + appBarClasses}>
        <Toolbar className={classes.container}>
          <Hidden smDown>
            <div className={classes.flex}>
              <Button className={classes.title} color="transparent" onClick={() => history.push('/dashboard')}>
                Keemut Alpha
              </Button>
            </div>
          </Hidden>
          <Hidden mdUp>
            <div className={classes.flex}>
              <Button className={classes.title} color="transparent" onClick={() => history.push('/dashboard')}>
                Keemut Alpha
              </Button>
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className={classes.sidebarButton}
              color="transparent"
              justIcon
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={this.state.open}
                classes={{
                  paper: classes.drawerPaper
                }}
                onClose={this.handleDrawerToggle}
                ModalProps={{
                  keepMounted: true // Better open performance on mobile.
                }}
              >
                {list}
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    );
  }
}