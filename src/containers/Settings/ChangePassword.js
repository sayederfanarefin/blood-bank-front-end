import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { changePasswordValidation } from 'helpers/validation';
import { updatePassword } from 'actions/auth';

import SweetAlert from "react-bootstrap-sweetalert";

import { withStyles, InputAdornment, Icon } from '@material-ui/core';
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
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
    isFetching: boolean,
    isUpdated: boolean,
    serverError: string,
    updatePassword: Object
}

type State = {
    alert: Object,
    cardAnimaton: string,
}

@connect(
    state => ({
        isFetching: state.auth.updatePasswordRequest,
        isUpdated: state.auth.updatePasswordSuccess,
        serverError: state.auth.updatePasswordError
    }),
    dispatch => ({
        updatePassword: bindActionCreators(updatePassword, dispatch)
    })
)
@reduxForm({
    form: 'changePassword',
    validate: changePasswordValidation
})
@withStyles({...regularFormsStyle, ...sweetAlertStyle})
export default class ChangePasswordSettings extends React.Component<Props, State> {

    state = {
        alert: null,
    }

    componentWillReceiveProps(nextProps: Object) {
      if (nextProps.isUpdated && nextProps.isUpdated !== this.props.isUpdated) {
        this.props.reset();
        this.successAlert();
      }
    }

    onSubmit = (values: Object) => {
        this.props.updatePassword.request({
            newPassword: values.newPassword,
            oldPassword: values.currentPassword
        })
    }

    successAlert = () => {
      const { classes } = this.props;
  
      this.setState({
        alert: (
          <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px", color: "#3C4858" }}
            title="Thanks!"
            onConfirm={this.hideAlert}
            onCancel={this.hideAlert}
            confirmBtnCssClass={
              classes.button + " " + classes.success
            }
            confirmBtnText="Okay!"
            closeOnClickOutside={false}
          >
            Your password has been changed successfully!
          </SweetAlert>
        )
      });
    }
    hideAlert = () => {
      return this.setState({
        alert: null
      });
    }

    render() {
        const { isFetching, serverError, classes, handleSubmit, invalid } = this.props;
        const { alert } = this.state;

        return (
            <ErrorCatcher>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={8}>
                        <Card>
                            <CardHeader color="primary" icon>
                                <CardIcon color="primary">
                                    <Settings />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>Change Password</h4>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching}>

                                    {serverError && <SnackbarContent
                                        message={serverError}
                                        color="danger"
                                        close
                                    />}

                                    <form onSubmit={handleSubmit(this.onSubmit)}>
                                        <Field
                                            labelText="Current password"
                                            id="currentPassword"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                type: "password",
                                                position: "start",
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className={classes.inputAdornmentIcon}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                )
                                            }}
                                            name="currentPassword"
                                            component={ReduxInput}
                                        />
                                        <GridContainer justify="center">
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="New password"
                                                    id="newPassword"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "password",
                                                        position: "start",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Icon className={classes.inputAdornmentIcon}>
                                                                    lock_outline
                                                                </Icon>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    name="newPassword"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>
                                            <GridItem xs={12} sm={6} md={6}>
                                                <Field
                                                    labelText="Re-enter new password"
                                                    id="newPasswordConfirmation"
                                                    formControlProps={{
                                                        fullWidth: true
                                                    }}
                                                    inputProps={{
                                                        type: "password",
                                                        position: "start",
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <Icon className={classes.inputAdornmentIcon}>
                                                                    lock_outline
                                                                </Icon>
                                                            </InputAdornment>
                                                        )
                                                    }}
                                                    name="newPasswordConfirmation"
                                                    component={ReduxInput}
                                                />
                                            </GridItem>
                                        </GridContainer>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <Button color="success" type="submit" disabled={invalid}>
                                                Reset
                                            </Button>
                                        </div>
                                    </form>
                                </LoadingWrapper>
                                {alert}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </ErrorCatcher>
        );
    }
}
