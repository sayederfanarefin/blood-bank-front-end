// @flow
import React, { PureComponent } from 'react';
import cx from "classnames";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { logout } from 'actions/auth';
import './index.scss';

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import logo from "assets/img/logo.svg";

type Props = {
  isFetching: boolean,
  userData: Object,
  errorMessage: string,
  children: Object,
  history: Object,
  classes: Object,
  logout: Function
};

type State = {
  mobileOpen: boolean,
  miniActive: boolean
};

@connect(
  state => ({
    isFetching: state.user.fetchProfileRequest,
    errorMessage: state.user.fetchProfileError,
    userData: state.user.data
  }),
  dispatch => ({
    logout: bindActionCreators(logout, dispatch)
  })
)
@withStyles(appStyle)
@withRouter
export default class Root extends PureComponent<Props, State> {
  state = {
    mobileOpen: false,
    miniActive: false
  }

  componentWillMount() {
    const { history } = this.props;
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    const { history } = this.props;

    if (!nextProps.userData) {
      history.push('/login');
    }

    if (navigator.platform.indexOf("Win") > -1) {
      this.ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1 && this.ps) {
      this.ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }

  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }

  render() {
    const { children, classes, userData, isFetching, logout, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });

    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={[]}
          logoText={"Keemut"}
          logo={logo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={[]}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              {children}
            </div>
          </div>
          {this.getRoute() ? <Footer fluid isDashboard /> : null}
        </div>
      </div>
    );
  }
}
