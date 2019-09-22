// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createUserValidation } from 'helpers/validation';
import { updateDocTitle } from "helpers/htmlHelper";
import { createUser } from 'actions/user';

import AuthWrapper from '../Auth';
import Avatar from './Avatar';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import ReduxInput from "components/Form/Field";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import LoadingWrapper from 'components/LoadingWrapper';
import ReduxSelect from 'components/Form/SelectField';

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
  classes: Object,
  history: Object,
  isFetching: boolean,
  invalid: boolean,
  user: Object,
  serverErrorMessage: string,
  createUser: Object,
  t: Function,
  handleSubmit: Function
}

type State = {
  cardAnimaton: string,
  open: boolean
}

@connect(
  state => ({
    isFetching: state.user.userInfoRequest,
    user: state.user.data,
    serverErrorMessage: state.user.userInfoError
  }),
  dispatch => ({
    createUser: bindActionCreators(createUser, dispatch)
  })
)
@reduxForm({
  form: 'createUser',
  validate: createUserValidation
})
@withStyles(registerPageStyle)
@withRouter
export default class CreateUser extends Component<Props, State> {
  state = {
    cardAnimaton: "cardHidden",
    open: false
  }

  componentWillMount() {
    const { history } = this.props;
    const registerInfo = localStorage.getItem("registerInfo");

    // Update page title
    updateDocTitle('Create User');

    if (!registerInfo) {
      history.push("/register");
    }
  }

  componentWillReceiveProps(nextProps: Object) {
    if (nextProps.user && this.props.user !== nextProps.user) {
      localStorage.removeItem('registerInfo');
      this.props.history.push("/dashboard");
    }
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      () => {
        this.setState({ cardAnimaton: "" })
      },
      0
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  onSubmit = (values: Object) => {
    const { age, sex, useOfCar, numberOfCars, avatar } = values;
    const registerInfo = localStorage.getItem("registerInfo") ? JSON.parse(localStorage.getItem("registerInfo")) : {};
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};

    // console.log(JSON.stringify({
    //   age,
    //   sex,
    //   avatar,
    //   numberOfCars: parseFloat(numberOfCars),
    //   email: registerInfo.email,
    //   firstName: registerInfo.firstName,
    //   useOfCar,
    //   companyName: companyName || "",
    //   userId: user.userId,
    //   token
    // }))

    this.props.createUser.request({
      age: parseFloat(age),
      gender: sex,
      profilePictureUrl: avatar,
      lastName: "Arefin",
      numberOfCars: parseFloat(numberOfCars),
      firstName: registerInfo.firstName,
      useOfCar,
      // companyName: companyName || "",
      userId: user.userId
    });
  }

  render() {
    const { isFetching, handleSubmit, classes, invalid, serverErrorMessage, history } = this.props;

    return (
      <ErrorCatcher>
        <AuthWrapper pageTitle="Register">
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
                <Card className={classes.cardSignup}>
                  <h2 className={classes.cardTitle}>User Profile</h2>
                  <CardBody>
                    <form className={classes.form} onSubmit={handleSubmit(this.onSubmit)}>

                      {serverErrorMessage && <SnackbarContent
                        message={serverErrorMessage}
                        color="danger"
                      />}
                      
                      <GridContainer justify="center" alignItems="center">
                        <GridItem xs={12} sm={12} md={4} className={classes.center}>
                          <Avatar />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={8}>
                          <LoadingWrapper show={isFetching}>
                            <Field
                              labelText="Age"
                              id="age"
                              formControlProps={{
                                fullWidth: true
                              }}
                              name="age"
                              inputProps={{
                                type: "number"
                              }}
                              component={ReduxInput}
                            />

                            <Field
                              inputProps={{
                                label: "Use of car",
                                options: [
                                  "Work", "Personal", "Carsharing", "Uber / Lyft", "P2P Rental (ex Turo)"
                                ]
                              }}
                              name="useOfCar"
                              component={ReduxSelect}
                            />

                            <Field
                              labelText="Number of Teslas"
                              id="numberOfCars"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: "number"
                              }}
                              name="numberOfCars"
                              component={ReduxInput}
                            />
                            <div className={classes.center} style={{display: "flex",justifyContent: "space-between"}}>
                              <Button type="button" size="lg" onClick={() => history.push('/register')} style={{backgroundColor: "#F5F7FC", color: "rgba(0, 0, 0, .8)"}}>
                                <u>Back</u>
                              </Button>
                              {`  `}
                              <Button color="rose" size="lg" type="submit" disabled={invalid}>
                                Submit
                              </Button>
                            </div>
                          </LoadingWrapper>
                        </GridItem>
                      </GridContainer>
                    </form>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </AuthWrapper>
      </ErrorCatcher>
    );
  }
}


// <div className={classes.inlineChecks}>
//   <Field
//     inputProps={{
//       label: "Male",
//       value: "male",
//       form: "createUser"
//     }}
//     name="sex"
//     component={ReduxRadioInput}
//   />
//   <Field
//     inputProps={{
//       label: "Female",
//       value: "female",
//       form: "createUser"
//     }}
//     name="sex"
//     component={ReduxRadioInput}
//   />
//   <Field
//     inputProps={{
//       label: "Other",
//       value: "other",
//       form: "createUser"
//     }}
//     name="sex"
//     component={ReduxRadioInput}
//   />
// </div>