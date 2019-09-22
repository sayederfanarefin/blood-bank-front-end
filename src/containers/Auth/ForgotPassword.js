// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { forgotValidation } from 'helpers/validation';
import { updateDocTitle } from "helpers/htmlHelper";
import { forgotPassword } from 'actions/auth';

import SweetAlert from "react-bootstrap-sweetalert";

import AuthWrapper from './index';
import LoadingWrapper from 'components/LoadingWrapper';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import ReduxInput from "components/Form/Field";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import logo from "assets/img/logo.svg";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

type Props = {
  classes: Object,
  history: Object,
  isFetching: boolean,
  invalid: boolean,
  forgotSuccess: Object,
  serverErrorMessage: string,
  forgotPassword: Object,
  t: Function,
  handleSubmit: Function
}

type State = {
  alert: Object,
  cardAnimaton: string,
}

@connect(
  (state) => ({
    isFetching: state.auth.forgotRequest,
    forgotSuccess: state.auth.forgotSuccess,
    serverErrorMessage: state.auth.forgotError
  }),
  dispatch => ({
    forgotPassword: bindActionCreators(forgotPassword, dispatch)
  })
)
@reduxForm({
  form: 'forgotPassword',
  validate: forgotValidation
})
@withStyles({...sweetAlertStyle, ...registerPageStyle})
@withRouter
export default class ForgotPassword extends Component<Props, State> {
  state = {
    alert: null,
    cardAnimaton: "cardHidden"
  }

  componentWillMount() {
    const { history } = this.props;

    // Update page title
    updateDocTitle('Forgot Password');

    if (localStorage.getItem('registerInfo')) {
      return history.push("/createUser");
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      () => {
        this.setState({ cardAnimaton: "cardSignup" })
      },
      0
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.forgotSuccess && nextProps.forgotSuccess !== this.props.forgotSuccess) {
      this.successAlert();
    }
  }

  onSubmit = (values: Object) => {
    this.props.forgotPassword.request({
      email: values.email
    });
  }

  successAlert = () => {
    const { classes } = this.props;

    this.setState({
      alert: (
        <SweetAlert
          success
          style={{ display: "block", marginTop: "-100px", color: "#3C4858" }}
          title="Thanks!"
          onConfirm={this.handleSuccessForgotPassword}
          onCancel={this.hideAlert}
          confirmBtnCssClass={
            classes.button + " " + classes.success
          }
          confirmBtnText="Let's login!"
          closeOnClickOutside={false}
        >
          Please checkout email.
        </SweetAlert>
      )
    });
  }
  handleSuccessForgotPassword = async () => {
    await this.hideAlert();
    this.props.history.push('/login');
  }
  hideAlert = () => {
    return this.setState({
      alert: null
    });
  }

  render() {
    const { isFetching, handleSubmit, classes, invalid, serverErrorMessage, history } = this.props;
    const { alert } = this.state;

    return (
      <AuthWrapper pageTitle="Forgot Password">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[this.state.cardAnimaton]}>
                <h2 className={classes.cardTitle}>Forgot Password</h2>
                <CardBody>
                  <GridContainer justify="center" alignItems="center" className={classes.registerWrapper}>
                    <GridItem xs={12} sm={12} md={6} style={{  margin: "10px 0" }}>
                      <img src={logo} alt="Keemut logo" />

                      <h5 className={classes.socialTitle + " text-left"}>If you do not have an account, please register</h5>
                      <Button
                        color="success"
                        type="button"
                        onClick={() => history.push('/register')}
                      >
                        Register
                      </Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <LoadingWrapper show={isFetching} status="rose">

                        {serverErrorMessage && <SnackbarContent
                          message={serverErrorMessage}
                          color="danger"
                          close
                        />}

                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                          <Field
                            labelText="Email"
                            id="email"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              position: "start",
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputAdornmentIcon} />
                                </InputAdornment>
                              )
                            }}
                            name="email"
                            component={ReduxInput}
                          />
                          <GridContainer justify="center" alignItems="center" style={{ justifyContent: "space-between" }}>
                            <GridItem>
                              <Button type="button" onClick={() => history.push('/login')}>
                                Back
                              </Button>
                            </GridItem>
                            <GridItem>
                              <Button color="rose" type="submit" disabled={invalid}>
                                Submit
                              </Button>
                            </GridItem>
                          </GridContainer>
                        </form>
                      </LoadingWrapper>
                      {alert}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </AuthWrapper>
    );
  }
}