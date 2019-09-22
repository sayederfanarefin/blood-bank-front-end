import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { updateUserValidation } from 'helpers/validation';
import { fetchTimeZoneList } from 'actions/dashboard';
import { getUser, updateUser } from 'actions/user';

import SweetAlert from "react-bootstrap-sweetalert";

import { withStyles } from '@material-ui/core';
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import CardBody from 'components/Card/CardBody';

import ReduxInput from 'components/Form/Field';
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Settings from "@material-ui/icons/Settings";
import LoadingWrapper from 'components/LoadingWrapper';

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import ReduxSelect from 'components/Form/SelectField';
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
    isFetching: boolean,
    isUpdated: boolean,
    userDataUpdated: boolean,
    serverError: string,
    userData: Object,
    fetchTimeZoneList: Object,
    fetchUserData: Object,
    updateUserData: Object,
}

type State = {
    alert: Object,
    isUpdating: boolean,
}

@connect(
    state => ({
        isFetching: (
            state.dashboard.timezoneListRequest || state.user.fetchingRequest || state.user.updateRequest
        ),
        serverErrorMessage: (
            state.dashboard.timezoneListError || state.user.fetchingError || state.user.updateError
        ),
        userDataUpdated: state.user.updateSuccess,
        userData: state.user.data,
        timezoneList: state.dashboard.timezoneListData,
        initialValues: state.user.data
    }),
    dispatch => ({
        fetchTimeZoneList: bindActionCreators(fetchTimeZoneList, dispatch),
        fetchUserData: bindActionCreators(getUser, dispatch),
        updateUserData: bindActionCreators(updateUser, dispatch)
    })
)
@reduxForm({
    form: 'generalInfo',
    validate: updateUserValidation,
    enableReinitialize: true
})
@withStyles({...regularFormsStyle, ...sweetAlertStyle})
export default class GeneralSettings extends Component<Props, State> {
    state = {
        alert: null,
        isUpdating: false
    }

    componentWillMount() {
        const { fetchUserData, fetchTimeZoneList, userData } = this.props;

        fetchTimeZoneList.request();

        fetchUserData.request({
            userId: userData.userId || JSON.parse(localStorage.getItem('user')).userId
        });
    }

    componentWillReceiveProps(nextProps: Object) {
      if (nextProps.isUpdated && nextProps.isUpdated !== this.props.isUpdated) {
        this.props.reset();
        this.successAlert();
      }

      if (this.state.isUpdating && nextProps.userDataUpdated) {
          this.successAlert();
          this.setState({
              isUpdating: false
          })
      }
    }

    onSubmit = (values: Object) => {
        const { updateUserData, userData } = this.props;

        this.setState({
            isUpdating: true
        })
        updateUserData.request({
            ...values,
            userId: userData.userId
        })
    }

    successAlert = () => {
      const { classes } = this.props;
  
      this.setState({
        alert: (
          <SweetAlert
            success
            style={{ marginTop: "-100px", color: "#3C4858", "top": "40%" }}
            title="Thanks!"
            onConfirm={this.hideAlert}
            onCancel={this.hideAlert}
            confirmBtnCssClass={
              classes.button + " " + classes.success
            }
            confirmBtnText="Okay!"
            closeOnClickOutside={false}
          >
            Your info has been updated successfully!
          </SweetAlert>
        )
      });
    }
    hideAlert = () => {
      return this.setState({
        alert: null
      });
    }

    componentWillUnmount() {
        this.hideAlert();
        this.props.updateUserData.reset();
    }

    render() {
        const { isFetching, serverError, classes, timezoneList, handleSubmit, invalid } = this.props;
        const { alert } = this.state;

        return (
            <ErrorCatcher>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary" icon>
                                <CardIcon color="primary">
                                    <Settings />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>Profile info</h4>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching}>

                                    {serverError && <SnackbarContent
                                        message={serverError}
                                        color="danger"
                                        close
                                    />}

                                    <form onSubmit={handleSubmit(this.onSubmit)}>
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="* First name"
                                                    id="firstName"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "text"
                                                    }}
                                                    name="firstName"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="* Employee ID"
                                                    id="employeeId"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "text"
                                                    }}
                                                    name="employeeId"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="* Email"
                                                    id="email"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "email"
                                                    }}
                                                    name="email"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="Phone Number"
                                                    id="phoneNumber"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "text",
                                                        notValidate: true
                                                    }}
                                                    name="phoneNumber"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>

                                            <hr />

                                            <GridItem xs={12} sm={6} md={4}>
                                                <Field
                                                    inputProps={{
                                                        label: "* Distance unit",
                                                        options: [
                                                            "km", "miles", "My Tesla picks it"
                                                        ]
                                                    }}
                                                    name="distanceUnit"
                                                    component={ReduxSelect}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <Field
                                                    inputProps={{
                                                        label: "* Select Timezone",
                                                        options: timezoneList || []
                                                    }}
                                                    name="zoneId"
                                                    component={ReduxSelect}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={4}>
                                                <Field
                                                    inputProps={{
                                                        label: "* Currency",
                                                        options: [
                                                            "AED UAE Dirham",
                                                            "ALL Lek",
                                                            "AMD Armenian Dram",
                                                            "AOA Kwanza",
                                                            "AUD Australian Dollar",
                                                            "AZM Manat",
                                                            "BGN Bulgarian Lev",
                                                            "BHD Bahraini Dinar",
                                                            "BMD Bermudian Dollar",
                                                            "BRL Brazilian Real",
                                                            "BSD Bahamian Dollar",
                                                            "BTN Ngultrum",
                                                            "BWP Pula",
                                                            "BYN Belarusian Ruble",
                                                            "BZD Belize Dollar",
                                                            "CAD Canadian Dollar",
                                                            "CHF Swiss Franc",
                                                            "CLP Chilean Peso",
                                                            "COP Colombian Peso",
                                                            "CUP Cuban Peso",
                                                            "CZK Czech Koruna",
                                                            "EGP Egyptian Pound",
                                                            "EUR Euro",
                                                            "GBP Pound Sterling",
                                                            "HKD Hong Kong Dollar",
                                                            "INR Indian Rupee",
                                                            "IQD Iraqi Dinar",
                                                            "ISK Iceland Krona",
                                                            "JOD Jordanian Dinar",
                                                            "JPY Yen",
                                                            "KES Kenyan Shilling",
                                                            "KRW Won",
                                                            "KWD Kuwaiti Dinar",
                                                            "KYD Cayman Islands Dollar",
                                                            "LKR Sri Lankan Rupee",
                                                            "MOP Pataca",
                                                            "MXN Mexican Peso",
                                                            "NAD Namibian Dollar",
                                                            "NGN Naira",
                                                            "NOK Norwegian Krone",
                                                            "NPR Nepalese Rupee",
                                                            "NZD New Zealand Dollar",
                                                            "OMR Omani Rial",
                                                            "PHP Philippine Peso",
                                                            "PKR Pakistan Rupee",
                                                            "RUB Russian Ruble",
                                                            "SAR Saudi Riyal",
                                                            "THB Baht",
                                                            "TMT Turkmenistan New Manat",
                                                            "TRY Turkish Lira",
                                                            "UAH Hryvnia",
                                                            "USD US Dollar",
                                                        ]
                                                    }}
                                                    name="currency"
                                                    component={ReduxSelect}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <br />
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button color="success" type="submit" disabled={invalid}>
                                                Submit
                                            </Button>
                                        </div>
                                    </form>
                                </LoadingWrapper>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                {alert}
            </ErrorCatcher>
        );
    }
}
