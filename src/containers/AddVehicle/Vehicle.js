import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field } from 'redux-form';
// import { vehicleRegistrationValidation } from 'helpers/validation';
// import { registerVehicle } from 'actions/vehicles';
import { fetchTimeZoneList } from 'actions/dashboard';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import ReduxInput from "components/Form/Field";
import ReduxSelect from "components/Form/SelectField";
// import ReduxCheckbox from "components/Form/CheckboxField";
// import TermsConditions from "components/Modal/term-conditions";
import LoadingWrapper from 'components/LoadingWrapper';
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import Button from "components/CustomButtons/Button";
import ErrorCatcher from "components/ErrorCatcher";


type Props = {
  classes: Object,
  history: Object,
  isFetching: boolean,
  vehicle: Object,
  timezoneList: Array<Object>,
  serverErrorMessage: string,
  registerVehicle: Object,
  invalid?: boolean,
  fetchTimeZoneList: Object
}

type State = {
  open: boolean
}

const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

@connect(
  state => ({
    isFetching: (state.vehicles.registerVehicleRequest || state.dashboard.timezoneListRequest),
    vehicle: state.vehicles.registerVehicleData,
    serverErrorMessage: state.vehicles.registerVehicleError || state.dashboard.timezoneListError,
    timezoneList: state.dashboard.timezoneListData
  }),
  dispatch => ({
    fetchTimeZoneList: bindActionCreators(fetchTimeZoneList, dispatch)
  })
)
@withStyles(style)
@withRouter
export default class Vehicle extends React.Component<Props, State> {
  state = {
    open: false
  }

  componentWillMount() {

    // Update page title
    // updateDocTitle('Add Vehicle');

    this.props.fetchTimeZoneList.request();
  }

  handleClickOpen = () => this.setState({ open: true });

  handleClose = value => this.setState({ open: false });

  // componentWillReceiveProps(nextProps: Object) {
  //   if (nextProps.vehicle && nextProps.vehicle !== this.props.vehicle) {
  //     this.props.history.push(`/dashboard/${nextProps.vehicle.vin}`);
  //   }
  // }

  render() {
    const { isFetching, serverErrorMessage, timezoneList, invalid } = this.props;

    return (
      <ErrorCatcher>
        <LoadingWrapper show={isFetching}>

          {serverErrorMessage && <SnackbarContent
            message={serverErrorMessage}
            color="danger"
          />}

          <Field
            labelText="Please enter the 17-digit VIN number"
            id="vin"
            formControlProps={{
              fullWidth: true
            }}
            name="vin"
            component={ReduxInput}
          />
          <Field
            labelText="Please enter the Tesla Username"
            id="vehicleEmail"
            formControlProps={{
              fullWidth: true
            }}
            name="vehicleEmail"
            component={ReduxInput}
          />
          <Field
            labelText="Please enter the Tesla Password"
            id="vehiclePassword"
            formControlProps={{
              fullWidth: true
            }}
            name="vehiclePassword"
            component={ReduxInput}
          />

          <Field
            inputProps={{
              label: "Select Timezone",
              options: timezoneList || []
            }}
            name="zoneId"
            component={ReduxSelect}
          />

          {invalid !== null && <React.Fragment>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button round color="primary" size="lg" type="submit" disabled={invalid}>
                Submit
              </Button>
            </div>
          </React.Fragment>}
        </LoadingWrapper>
      </ErrorCatcher>
    );
  }
}
// <div style={{ textAlign: "center" }}>
//   <Field
//     inputProps={{
//       label: (
//         <span>
//           I agree to the{" "}
//           <a href="" onClick={(e) => {
//             e.preventDefault();
//             this.handleClickOpen()
//           }}>terms and conditions</a>.
//         </span>
//       )
//     }}
//     name="termsConditions"
//     component={ReduxCheckbox}
//   />
//   <TermsConditions
//     open={this.state.open}
//     onClose={this.handleClose}
//   />
// </div>