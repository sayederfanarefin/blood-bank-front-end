import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { updateDocTitle } from "helpers/htmlHelper";
import { vehicleRegistrationValidation } from "helpers/validation";
import { fetchDashboard } from 'actions/dashboard';
import { registerVehicle } from "actions/vehicles";
import "./index.scss";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import LoadingWrapper from "components/LoadingWrapper";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import Histogram from './Histogram';
import BatteryDegradation from './BatteryDegradation';
import ErrorCatcher from "components/ErrorCatcher";


const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  }
};

type Props = {
  isFetching: boolean,
  errorMessage: string,
  dashboardData: Array<Object>,
  classes: Object,
  user: Object,
  rtlActive: boolean,
  vehicle: Object,
  registerVehicle: Object,
  fetchDashboard: Object
};

@connect(
  state => ({
    vehicle: state.vehicles.registerVehicleData,
    isFetching: state.dashboard.dashboardRequest,
    errorMessage: state.dashboard.dashboardError,
    dashboardData: state.dashboard.data,
    user: state.user.data
  }),
  dispatch => ({
    registerVehicle: bindActionCreators(registerVehicle, dispatch),
    fetchDashboard: bindActionCreators(fetchDashboard, dispatch)
  })
)
@withStyles(styles)
@reduxForm({
  form: 'vehicleRegistration',
  validate: vehicleRegistrationValidation
})
@withRouter
export default class HistogramComponent extends React.Component<Props> {
  activeVin: string = ''

  componentWillMount() {
    // const { match: { params: { vin } }, fetchDashboard, user } = this.props;

    // if (vin) {
    //   localStorage.setItem("vin", vin)
    // }
    // fetchDashboard.request({
    //   uid: user.userId,
    //   vin
    // });

    // this.activeVin = vin;

    // Update page title
    updateDocTitle('Histogram');
  }

  componentWillReceiveProps(nextProps: Object) {
    // const { dashboardData } = nextProps;

    // if (dashboardData && dashboardData !== this.props.dashboardData) {
    //   localStorage.setItem("vin", dashboardData.vin);
    // }

    // if (match.params.vin && match.params.vin !== this.activeVin) {
    //   this.activeVin = match.params.vin;
    //   fetchDashboard.request({
    //     uid: user.userId,
    //     vin: match.params.vin
    //   });
    // }

    if (nextProps.vehicle && nextProps.vehicle !== this.props.vehicle) {
      this.props.history.push(`/dashboard/${nextProps.vehicle.vin}`);
    }
  }

  /**
   * Returns Driving vs Charging info
   * for the component
   */
  getDrivingChargingInfo = () => {
    const { dashboardData } = this.props;

    if (!dashboardData) {
      return {};
    }

    return {
      'Drivings vs Charging - Last 24 hours': dashboardData.last24HoursStats,
      'Drivings vs Charging - Last 7 days': dashboardData.last7DaysStats
    }
  }

  render() {
    const { isFetching, dashboardData } = this.props;

    // @TODO: Config Histogram fetching
    return (
      <ErrorCatcher>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
              <LoadingWrapper show={isFetching}>
                  {dashboardData && <Histogram
                      carType={dashboardData.carModel}
                      modelYear={dashboardData.modelYear}
                      drivingChargingInformation={this.getDrivingChargingInfo()}
                  />}
                  <BatteryDegradation />
              </LoadingWrapper>
          </GridItem>
        </GridContainer>
      </ErrorCatcher>
    );
  }
};