// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { registerValidation } from 'helpers/validation';
import { updateDocTitle } from "helpers/htmlHelper";
import { register, login } from 'actions/auth';

import AuthWrapper from './index';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ReduxInput from "components/Form/Field";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import TermsConditions from "components/Modal/term-conditions";
import ReduxCheckbox from "components/Form/CheckboxField";
import LoadingWrapper from 'components/LoadingWrapper';

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import logo from "assets/img/logo.svg";

type Props = {
  classes: Object,
  history: Object,
  isFetching: boolean,
  invalid: boolean,
  registerData: Object,
  serverErrorMessage: string,
  loginSuccess: boolean,
  register: Object,
  login: Object,
  t: Function,
  handleSubmit: Function
}

type State = {
  cardAnimaton: string,
  open: boolean
}

@connect(
  (state) => ({
    isFetching: state.auth.registerRequest,
    registerData: state.auth.registerSuccess,
    loginSuccess: state.auth.loginSuccess,
    serverErrorMessage: state.auth.registerError || state.auth.loginError
  }),
  dispatch => ({
    login: bindActionCreators(login, dispatch),
    register: bindActionCreators(register, dispatch)
  })
)
@reduxForm({
  form: 'register',
  initialValues: JSON.parse(localStorage.getItem("registerInfo") || "{}"),
  validate: registerValidation
})
@withStyles(registerPageStyle)
@withRouter
export default class Register extends Component<Props, State> {
  state = {
    cardAnimaton: "cardHidden",
    open: false
  }

  onSubmit = (values: Object) => {
    const { register, history } = this.props;
    const { email, firstName, password } = values;

    if (localStorage.getItem("registerInfo")) {
      return history.push("/createUser");
    }

    register.request({ email, password, firstName });
  }

  componentWillMount() {
    const { user, history } = this.props;

    // Update page title
    updateDocTitle('Register');

    if (user) {
      history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    const { history, registerData, loginSuccess } = this.props;
    if (registerData !== nextProps.registerData && nextProps.registerData) {
      history.push("/createUser");
    }
    if (loginSuccess !== nextProps.loginSuccess && nextProps.loginSuccess) {
      history.push("/dashboard");
    }
  }

  componentDidMount() {
    // const { classes } = this.props;
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

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };

  handleClose = value => {
    this.setState({ open: false });
  };

  /**
   * Handle login with socials
   */
  loginWithService = (service: string) => {
    this.props.login.request({ service });
  }

  render() {
    const { isFetching, handleSubmit, classes, invalid, serverErrorMessage, history } = this.props;
    const registerInfo = localStorage.getItem("registerInfo");

    return (
      <AuthWrapper pageTitle="Register">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={9}>
              <Card className={classes[this.state.cardAnimaton]}>
                <h2 className={classes.cardTitle}>Register</h2>
                <CardBody>
                  <GridContainer justify="center" alignItems="center" className={classes.registerWrapper}>
                    <GridItem xs={12} sm={12} md={6} style={{  margin: "10px 0", textAlign: "center" }}>
                      <img src={logo} alt="Keemut logo" />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <LoadingWrapper show={isFetching} status="rose">
                        {serverErrorMessage && <SnackbarContent
                          message={serverErrorMessage}
                          color="danger"
                          close
                        />}

                        <h5 className={classes.socialTitle}>Sign up with your Social Media account</h5>

                        <div className={classes.socialsBox}>
                          <Button
                            color="facebook"
                            block
                            onClick={() => this.loginWithService('facebook-square')}>
                            <i
                              className={
                                classes.socialButtonsIcons +
                                " " +
                                classes.marginRight +
                                " fab fa-facebook-square"
                              }
                            />{" "}
                            Continue with Facebook
                          </Button>

                          <Button
                            color="google"
                            block
                            onClick={() => this.loginWithService('google')}>
                            <i
                              className={
                                classes.socialButtonsIcons +
                                " " +
                                classes.marginRight +
                                " fab fa-google-plus-g"
                              }
                            />{" "}
                            Sign up with Google
                          </Button>
                        </div>

                        <p className={classes.socialTitle}>Or sign up with your email addresss</p>

                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>
                          <Field
                            labelText="First name"
                            id="firstName"
                            formControlProps={{
                              fullWidth: true
                            }}
                            inputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputAdornmentIcon}>
                                    person
                                  </Icon>
                                </InputAdornment>
                              )
                            }}
                            name="firstName"
                            component={ReduxInput}
                          />
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
                          <Field
                            labelText="Password"
                            id="password"
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
                            name="password"
                            component={ReduxInput}
                          />
                          <Field
                            labelText="Repeat Password"
                            id="passwordConfirmation"
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
                            name="passwordConfirmation"
                            component={ReduxInput}
                          />

                          <Field
                            inputProps={{
                              label: (
                                <span>
                                  I agree to the{" "}
                                  <a href="" onClick={(e) => {
                                    e.preventDefault();
                                    this.handleClickOpen()
                                  }}>terms and conditions</a>.
                                </span>
                              )
                            }}
                            name="termsConditions"
                            component={ReduxCheckbox}
                          />
                          <TermsConditions
                            open={this.state.open}
                            onClose={this.handleClose}
                          />
                          <div className={classes.right}>
                            <Button
                              color="rose"
                              type="submit"
                              size="lg"
                              disabled={(invalid && !registerInfo)}
                              onClick={() => registerInfo && history.push('/createUser')}
                            >
                              Next
                            </Button>
                          </div>
                        </form>
                      </LoadingWrapper>
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
