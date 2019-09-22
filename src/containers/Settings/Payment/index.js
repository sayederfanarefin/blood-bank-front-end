import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { StripeProvider, Elements } from 'react-stripe-elements';
import "./index.scss";

import CardForm from './CardForm';

import { withStyles } from '@material-ui/core';

import Settings from '@material-ui/icons/Settings';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardIcon from 'components/Card/CardIcon';
import CardBody from 'components/Card/CardBody';

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import regularFormsStyle from "assets/jss/material-dashboard-pro-react/views/regularFormsStyle";
import CardText from 'components/Card/CardText';
import ErrorCatcher from 'components/ErrorCatcher';

type Props = {
    vehicles: Array<Object>,
}

@connect(
    state => ({
        vehicles: state.vehicles.data
    })
)
@withStyles({...regularFormsStyle, ...sweetAlertStyle})
export default class PaymentSettings extends Component<Props> {
    render() {
        const { classes, vehicles } = this.props;

        return (
            <ErrorCatcher>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary" icon style={{ minHeight: '60px' }}>
                                <CardIcon color="primary">
                                    <Settings />
                                </CardIcon>
                                <h4 className={classes.cardIconTitle}>Payment</h4>
                            </CardHeader>
                            <CardBody className="custom-card-body">

                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={6} md={4} style={{margin: "30px 0 30px 0"}}>
                                        <Card className="wrapped-card-class">
                                            <CardHeader color="primary" text>
                                                <CardText color="primary" className="card-title-box">
                                                    <h5>Payment Information</h5>
                                                </CardText>
                                            </CardHeader>
                                            <CardBody>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Vehicles:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">{vehicles ? vehicles.length : 1}</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Cost per vehicle:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">$4.95</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Monthly Cost:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">$US {vehicles ? (vehicles.length * 4.95).toFixed(2) : 4.95}</p>
                                                    </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={4} style={{margin: "30px 0 30px 0"}}>
                                        <Card className="wrapped-card-class">
                                            <CardHeader color="primary" text>
                                                <CardText color="primary" className="card-title-box">
                                                    <h5>Subscription Information</h5>
                                                </CardText>
                                            </CardHeader>
                                            <CardBody>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Start Date:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">date when account opened</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Subscription Start Date:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">1st {moment().add(1, 'months').format("MMM")}</p>
                                                    </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                    <GridItem xs={12} sm={6} md={4} style={{margin: "30px 0 30px 0"}}>
                                        <Card className="wrapped-card-class">
                                            <CardHeader color="primary" text>
                                                <CardText color="primary" className="card-title-box">
                                                    <h5>Invoice</h5>
                                                </CardText>
                                            </CardHeader>
                                            <CardBody>
                                                <GridContainer>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="bold-theme-text">Current Invoice:</p>
                                                    </GridItem>
                                                    <GridItem xs={12} sm={6} md={6}>
                                                        <p className="thin-theme-text text-right">link from Stripe API</p>
                                                    </GridItem>
                                                </GridContainer>
                                            </CardBody>
                                        </Card>
                                    </GridItem>
                                </GridContainer>

                                <hr className="payment-box__hr"/>

                                <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                                    <Elements>
                                        <CardForm />
                                    </Elements>
                                </StripeProvider>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
                {alert}
            </ErrorCatcher>
        );
    }
}

// <form onSubmit={handleSubmit(this.onSubmit)}>
//                                         <Card>
//                                             <CardBody>

//                                                 {serverError && <SnackbarContent
//                                                     message={serverError}
//                                                     color="danger"
//                                                     close
//                                                 />}
    
//                                                 <GridContainer justify="center">
//                                                     <GridItem xs={12} sm={6} md={6}>
//                                                         <Field
//                                                             labelText="* Credit Card Name"
//                                                             id="creditCardName"
//                                                             formControlProps={{
//                                                                 fullWidth: true
//                                                             }}
//                                                             inputProps={{
//                                                                 type: "text"
//                                                             }}
//                                                             name="creditCardName"
//                                                             component={ReduxInput}
//                                                         />
//                                                     </GridItem>
//                                                     <GridItem xs={12} sm={6} md={6}>
//                                                         <Field
//                                                             labelText="* Credit Card Number"
//                                                             id="creditCardNumber"
//                                                             formControlProps={{
//                                                                 fullWidth: true
//                                                             }}
//                                                             inputProps={{
//                                                                 type: "text"
//                                                             }}
//                                                             name="creditCardNumber"
//                                                             component={ReduxInput}
//                                                         />
//                                                     </GridItem>
//                                                     <GridItem xs={12} sm={6} md={6}>
//                                                         <Field
//                                                             labelText="* CVC Number"
//                                                             id="cvcNumber"
//                                                             formControlProps={{
//                                                                 fullWidth: true
//                                                             }}
//                                                             inputProps={{
//                                                                 type: "email"
//                                                             }}
//                                                             name="cvcNumber"
//                                                             component={ReduxInput}
//                                                         />
//                                                     </GridItem>
//                                                     <GridItem xs={12} sm={6} md={6}>
//                                                         <Field
//                                                             labelText="* Expiration Date"
//                                                             id="expirationDate"
//                                                             formControlProps={{
//                                                                 fullWidth: true
//                                                             }}
//                                                             inputProps={{
//                                                                 type: "text"
//                                                             }}
//                                                             name="expirationDate"
//                                                             component={ReduxInput}
//                                                         />
//                                                     </GridItem>
//                                                 </GridContainer>
//                                             </CardBody>
//                                         </Card>
//                                         <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                                             <Button color="success" type="submit" disabled={invalid}>
//                                                 Submit
//                                             </Button>
//                                         </div>
//                                     </form>