import React from "react";
import classNames from "classnames";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchVehicles } from 'actions/vehicles';
import { logout } from 'actions/auth';
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-pro-react/components/headerLinksStyle";

type Props = {
  classes: Object,
  rtlActive: boolean,
  history: Function,
  logout: Object,
  isFetching: boolean,
  vehicles: Array<Object>,
  serverError: string,
  user: Object,
  fetchVehicles: Object
};

const activeVehicle = localStorage.getItem("activeVehicle");

@connect(
  state => ({
      isFetching: state.vehicles.vehiclesRequest,
      vehicles: state.vehicles.data,
      serverError: state.vehicles.vehiclesError,
      user: state.user.data,
      vin: activeVehicle ? JSON.parse(activeVehicle).vin : state.dashboard.data ? state.dashboard.data.vin : ""
  }),
  dispatch => ({
      fetchVehicles: bindActionCreators(fetchVehicles, dispatch),
      logout: bindActionCreators(logout, dispatch)
  })
)
@withStyles(headerLinksStyle)
@withRouter
export default class HeaderLinks extends React.Component<Props> {
  activePathname: string = "";

  state = {
    open: false
  };

  componentWillMount() {
      const { fetchVehicles, user, history, location: { pathname } } = this.props;

      if (user) {
        fetchVehicles.request({
            email: user.email,
            id: user.userId
        })
      }

      history.listen((location, action) => {
        this.activePathname = location.pathname;
      })

      this.activePathname = pathname;
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChangeVehicle = (vehicle: Object) => {
    const lsVehicle = localStorage.getItem('activeVehicle');

    if (lsVehicle) {
      const vehicleVin = JSON.parse(lsVehicle).vin;

      if (vehicleVin !== vehicle.vin) {
        localStorage.setItem('activeVehicle', JSON.stringify(vehicle));

        const newVehicleUrl = this.activePathname.split(vehicleVin)
        const newPathname = newVehicleUrl.join(vehicle.vin);

        if (newPathname === '/' || newPathname === '/dashboard') {
          return window.location.href = '/dashboard/'+vehicle.vin;
        }

        
        window.location.href = newPathname;

        this.handleClose();
      }
    }
    else {
      localStorage.setItem('activeVehicle', JSON.stringify(vehicle));
      window.location.href = '/dashboard/'+vehicle.vin;

      this.handleClose();
    }
  }

  handleLogout = () => {
    this.setState({ open: false });
    this.props.logout.request();
  }

  isActive = (vehicle: Object) => {    
    return this.activePathname.split(vehicle.vin)[1] === "" ? 'menu-item-active' : '';
  }
  
  render() {
    const { classes, rtlActive, vehicles, user } = this.props;
    const { open } = this.state;
    const wrapper = classNames({
      [classes.wrapperRTL]: rtlActive
    });
    const managerClasses = classNames({
      [classes.managerClasses]: true
    });
    const dropdownItem = classNames(
      classes.dropdownItem,
      classes.primaryHover,
      { [classes.dropdownItemRTL]: rtlActive }
    );
    return (
      <div className={wrapper}>
        <div className={managerClasses}>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            placement="bottom"
            className={classNames({
              [classes.popperClose]: !open,
              [classes.pooperResponsive]: true,
              [classes.pooperNav]: true
            })}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list"
                style={{ transformOrigin: "0 0 0" }}
              >
                <Paper className={classes.dropdown}>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList role="menu">
                      {vehicles && vehicles.map((vehicle, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => this.handleChangeVehicle(vehicle)}
                          className={dropdownItem + " vehicle-list-item " + this.isActive(vehicle)}
                        >
                          {vehicle.plateName}
                        </MenuItem>
                      ))}
                      <MenuItem
                        onClick={this.handleLogout}
                        className={dropdownItem}
                      >
                        {rtlActive
                          ? "شعار إعلان الأرضية قد ذلك"
                          : "Logout"}
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        <Button
          color="transparent"
          aria-label="Person"
          className={`${rtlActive ? classes.buttonLinkRTL : classes.buttonLink} profile-link`}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
          aria-owns={open ? "menu-list" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          buttonRef={node => {
            this.anchorEl = node;
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <span style={{ fontSize: 12 }}>{user ? user.email : "User"}</span>
        </Button>
      </div>
    );
  }
}
// <MenuItem
//   onClick={this.handleChangeVehicle}
//   className={dropdownItem}
// >
//   {rtlActive
//     ? "شعار إعلان الأرضية قد ذلك"
//     : "Profile"}
// </MenuItem>