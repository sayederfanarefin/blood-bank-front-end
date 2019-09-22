import React from "react";
import moment from "moment";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { updateDocTitle } from "helpers/htmlHelper";
import { vehicleRegistrationValidation } from "helpers/validation";
import { fetchDashboard } from 'actions/dashboard';
import { registerVehicle } from "actions/vehicles";
import "./index.scss";

import ErrorCatcher from "components/ErrorCatcher";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import LoadingWrapper from "components/LoadingWrapper";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import BasicInfo from "./BasicInfo";
import ConfigInfo from "./ConfigInfo";
import BatteryInfo from './BatteryInfo';
import MonthlyStats from './MonthlyStats';
// import DrivingCharging from './DrivingCharging';
// import Histogram from './Histogram';
import AddVehicle from '../AddVehicle';
import Vehicle from '../AddVehicle/Vehicle';


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
export default class DashboarComponent extends React.Component<Props> {
  activeVin: string = ''

  componentWillMount() {
    const { match: { params: { vin } }, fetchDashboard, user } = this.props;
    const activeVehicle = localStorage.getItem("activeVehicle");
    const localVin = vin ? vin : activeVehicle ? JSON.parse(activeVehicle).vin : "";
    const dashboardData = localStorage.getItem(`dashboardData-${localVin}`);
    const data = dashboardData ? JSON.parse(dashboardData) : {};

    if (!data || !data._localSaveMoment || moment().diff(moment(data._localSaveMoment), 'hours') > 0) {
      fetchDashboard.request({
        uid: user.userId,
        vin: localVin
      });
    }

    this.activeVin = localVin;

    // Update page title
    updateDocTitle('Dashboard');
  }

  componentWillReceiveProps(nextProps: Object) {
    const { fetchDashboard, dashboardData, match, user } = nextProps;
    const activeVehicle = localStorage.getItem('activeVehicle') ? JSON.parse(localStorage.getItem('activeVehicle')) : {};

    if (dashboardData && dashboardData !== this.props.dashboardData) {
      const data = Object.assign({}, dashboardData, {
        _localSaveMoment: moment()
      })
      
      activeVehicle.vin = dashboardData.vin;

      localStorage.setItem("activeVehicle", JSON.stringify(activeVehicle));
      if (dashboardData.vin !== "") {
        localStorage.setItem(`dashboardData-${dashboardData.vin}`, JSON.stringify(data));
      }
    }

    if (match.params.vin && match.params.vin !== this.activeVin) {
      this.activeVin = match.params.vin;
      const dashboardData = localStorage.getItem(`dashboardData-${match.params.vin}`);
      const data = dashboardData ? JSON.parse(dashboardData) : {};

      localStorage.setItem("activeVehicle", match.params.vin);

      if (!data || moment().diff(moment(data._localSaveMoment), 'hours') > 0) {
        fetchDashboard.request({
          uid: user.userId,
          vin: match.params.vin
        });
      }
    }

    if (nextProps.vehicle && nextProps.vehicle !== this.props.vehicle) {
      this.props.history.push(`/dashboard/${nextProps.vehicle.vin}`);
    }
  }

  capitalizeFirstLetter(str: string) {
      if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }
      return "";
  }

  /**
   * Returns basic info
   * for the component
   */
  getBasicInfo = () => {
    const { dashboardData } = this.props;

    if (!dashboardData) {
      return {};
    }

    return {
      vehicleInfo: {
        'Nickname': dashboardData.name,
        'Keemut Start Date': dashboardData.vehicleStartDate,
      },
      details: {
        'Car Version': dashboardData.carVersion,
        'VIN': dashboardData.vin,
        'Car Type': dashboardData.carModel
      },
      stats: {
        'Hours Driving': dashboardData.hoursDriving,
        'Tracked Distance': (dashboardData.totalDistance || "").toLowerCase(),
        'Odometer': (dashboardData.odometer || 0).toFixed(0) + ' ' + (dashboardData.speedUnit || "").substring(0, 2).toLowerCase(),
      },
      driving: dashboardData.driveMapCal
    }
  }

  /**
   * Returns configuration info
   * for the component
   */
  getConfigInfo = () => {
    const { dashboardData } = this.props;

    if (!dashboardData) {
      return {};
    }

    return {
      generalInfo: {
        'Car Type': dashboardData.carModel,
        'Port Type': `${dashboardData.chargePortType} Charger`,
        'Color': dashboardData.exteriorColour,
        'Trim Badging': this.capitalizeFirstLetter(dashboardData.trimBadging),
        'Wheel Type': dashboardData.wheelType,
        'Air Suspension': dashboardData.airSuspension,
        'Ludicrous Mode': dashboardData.ludicrousMode
      },
      details: {
        'Steering Wheel Heater': dashboardData.steeringWheel,
        'Spoiler Type': dashboardData.spoilerType,
        'Special Type': dashboardData.carSpecialType,
        'Performance Config': dashboardData.perfConfig,
        'Roof Color': dashboardData.roofColor,
        'Third Row Seats': dashboardData.thirdRowSeats
      },
      options: dashboardData.codesT
    }
  }

  /**
   * Returns bettery info
   * for the component
   */
  getBatteryInfo = () => {
    const { dashboardData } = this.props;

    if (!dashboardData) {
      return {};
    }

    return {
      'Battery Range Miles - Last 30 days': dashboardData.last4WeeksBatteryRanges,
      'Battery Range kWh - Last 24 hours': dashboardData.last24HoursBatteryRanges,
      'Charge Enable Request - Last 24 hours': dashboardData.last24HoursBatteryCharging
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

  onSubmit = (values: Object) => {
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
    
    this.props.registerVehicle.request({
      userEmail: user.email,
      uid: user.userId,
      vin: values.vin,
      vehicleEmail: values.vehicleEmail,
      vehiclePassword: values.vehiclePassword,
      zoneId: values.zoneId
    });
  }

  render() {
    const { match: { params: { vin } }, isFetching, dashboardData, errorMessage, handleSubmit, invalid } = this.props;
    const localDashboard = dashboardData || {};

    return (
      <ErrorCatcher>
        <GridContainer justify="center">
          {(!isFetching && !errorMessage && !dashboardData) ? 
            <GridItem xs={12} sm={8} md={6}>
              <Form onSubmit={handleSubmit(this.onSubmit)}>
                <AddVehicle
                  validate
                  steps={[
                    { stepName: "Vehicle", stepComponent: Vehicle, stepId: "vehicle" }
                  ]}
                  // subtitle="Before adding the vehicle, please add the dashboard blackbox information"
                  footer={false}
                  invalid={invalid}
                />
              </Form>
            </GridItem>
            : 
            <GridItem xs={12} sm={12} md={12}>
              <LoadingWrapper show={isFetching}>
                {!isFetching && <React.Fragment>
                    <BasicInfo
                      carType={localDashboard.carType}
                      basicInformation={this.getBasicInfo()}
                      exteriorColour={localDashboard.exteriorColour}
                    />
                    <ConfigInfo
                      configInformation={this.getConfigInfo()}
                      modelYear={localDashboard.modelYear}
                      timeZone={localDashboard.timeZone}
                      vehicleStartDate={new Date(localDashboard.timeZone || "").getFullYear()}
                      totalDistance={parseFloat(localDashboard.totalDistance)}
                      dashboardData={localDashboard}
                    />
                    <BatteryInfo
                      speedUnit={localDashboard.speedUnit}
                      batteryInformation={this.getBatteryInfo()}
                    />
                    <MonthlyStats
                      speedUnit={localDashboard.speedUnit}
                      date={localDashboard.vehicleStartDate}
                      vin={vin || localDashboard.vin}
                    />
                  </React.Fragment>}
              </LoadingWrapper>
          </GridItem>}
        </GridContainer>
      </ErrorCatcher>
    );
  }
};

// <DrivingCharging
// drivingChargingInformation={this.getDrivingChargingInfo()}
// />

// <Histogram
//   carType={dashboardData.carModel}
//   modelYear={dashboardData.modelYear}
//   drivingChargingInformation={this.getDrivingChargingInfo()}
// />