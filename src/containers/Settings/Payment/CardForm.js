import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CardNumberElement, CardCVCElement, CardExpiryElement, injectStripe } from 'react-stripe-elements';
import { payment } from "actions/user";

import LoadingWrapper from 'components/LoadingWrapper';

import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import CardText from 'components/Card/CardText';
import CardBody from 'components/Card/CardBody';
import CardFooter from 'components/Card/CardFooter';
import SnackbarContent from 'components/Snackbar/SnackbarContent';
import Button from 'components/CustomButtons/Button';

import StripeLogo from 'assets/img/powered_by_stripe.svg';


type Props = {
    isFetching: boolean,
    paymentSuccess: boolean,
    serverError: string,
    payment: Object,
    stripe: Object,
}

type State = {
    cardName: string,
    isPaying: boolean
}


@connect(
    state => ({
        isFetching: state.user.paymentRequest,
        paymentSuccess: state.user.paymentSuccess,
        serverError: state.user.paymentError,
    }),
    dispatch => ({
        payment: bindActionCreators(payment, dispatch)
    })
)
@injectStripe
export default class CardForm extends React.Component<Props, State> {
    state = {
        cardName: "",
        isPaying: false
    }

    onSubmit = async (e: Object) => {
        e.preventDefault();
        const { stripe, payment } = this.props;
        const { cardName } = this.state;

        this.setState({ isPaying: true });

        const { token } = await stripe.createToken({ type: 'card', name: cardName })

        console.log('token: ', token);

        payment.request({
            currency: "$",
            amount: 4.95,
            description: "keemut tracking",
            token: token.id
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { isPaying } = this.state;

        if (isPaying) {
            this.setState({ isPaying: false })
        }
    }

    render() {
        const { isFetching, serverError } = this.props;
        const { isPaying } = this.state;

        return (
            <LoadingWrapper show={isFetching || isPaying}>
                <Card className="wrapped-card-class">
                    <CardHeader color="primary" text>
                        <CardText color="primary" className="card-title-box">
                            <h5>Credit Card information</h5>
                        </CardText>
                    </CardHeader>
                    <CardBody>

                        {serverError && <SnackbarContent
                            message={serverError}
                            color="danger"
                            close
                        />}

                        <GridContainer justify="center" className="cardForm">
                            <GridItem xs={12} sm={6} md={6} className="payment-box">
                                <label className="payment-box__label">Credit Card Name</label>
                                <input
                                    type="text"
                                    name="cardName"
                                    onChange={(e) => this.setState({ cardName: e.target.value })}
                                    placeholder="CARD NAME"
                                    className="StripeElement"
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className="payment-box">
                                <label className="payment-box__label">Credit Card Number</label>
                                <CardNumberElement
                                    style={{
                                        base: {
                                            '::placeholder': {
                                                color: '#9F9F9F',
                                            },
                                        }
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className="payment-box">
                                <label className="payment-box__label">CVC Number</label>
                                <CardCVCElement
                                    style={{
                                        base: {
                                            '::placeholder': {
                                                color: '#9F9F9F',
                                            },
                                        }
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={12} sm={6} md={6} className="payment-box">
                                <label className="payment-box__label">Expiration Date</label>
                                <CardExpiryElement
                                    style={{
                                        base: {
                                            '::placeholder': {
                                                color: '#9F9F9F',
                                            },
                                        }
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter className="stripe-box">
                        <img src={StripeLogo} alt="Powered by Stripe" className="stripe-box__image" />
                    </CardFooter>
                </Card>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
                    <Button color="success" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </div>
            </LoadingWrapper>
        )
    }
}