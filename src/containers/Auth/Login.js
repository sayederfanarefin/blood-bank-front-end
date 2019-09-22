// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { loginValidation } from 'helpers/validation';
import { updateDocTitle } from "helpers/htmlHelper";
import { login } from 'actions/auth';

import AuthWrapper from './index';
import LoadingWrapper from 'components/LoadingWrapper';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

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

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

type Props = {
  classes: Object,
  history: Object,
  isFetching: boolean,
  invalid: boolean,
  user: Object,
  serverErrorMessage: string,
  login: Object,
  t: Function,
  handleSubmit: Function
}

type State = {
  cardAnimaton: string
}

@connect(
  (state) => ({
    isFetching: state.auth.loginRequest,
    user: state.user.data,
    serverErrorMessage: state.auth.loginError
  }),
  dispatch => ({
    login: bindActionCreators(login, dispatch)
  })
)
@reduxForm({
  form: 'login',
  validate: loginValidation
})
@withStyles(registerPageStyle)
@withRouter
export default class Login extends Component<Props, State> {
  state = {
    cardAnimaton: "cardHidden"
  }

  componentWillMount() {
    const { user, history } = this.props;

    // Update page title
    updateDocTitle('Login');

    // if (localStorage.getItem('registerInfo')) {
    //   return history.push("/createUser");
    // }
    if (user && localStorage.getItem('auth_token')) {
      history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.user !== nextProps.user && nextProps.user && localStorage.getItem('auth_token')) {
      this.props.history.push("/dashboard");
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

  onSubmit = (values: Object) => {
    this.props.login.request({
      email: values.email,
      password: values.password
    });
  }

  /**
   * Handle login with socials
   */
  loginWithService = (service: string) => {
    this.props.login.request({ service });
  }

  render() {
    const { isFetching, handleSubmit, classes, invalid, serverErrorMessage } = this.props;

    return (
      <AuthWrapper pageTitle="Login">
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[this.state.cardAnimaton]}>
                <h2 className={classes.cardTitle}>Login</h2>
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

                        <h5 className={classes.socialTitle}>Sign in with your Social Media account</h5>

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
                            Sign in with Google
                          </Button>
                        </div>

                        <p className={classes.socialTitle}>Or sign in with your email addresss</p>

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
                          <GridContainer justify="center" alignItems="center" style={{ justifyContent: "space-between" }}>
                            <GridItem>
                              <Link to="/forgotPassword">Forgot password?</Link>
                            </GridItem>
                            <GridItem>
                              <Button color="rose" type="submit" disabled={invalid}>
                                Submit
                              </Button>
                            </GridItem>
                          </GridContainer>
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

// <Button justIcon size="lg" color="twitter" onClick={() => this.loginWithService('twitter')}>
//   <i className="fab fa-twitter" />
// </Button>