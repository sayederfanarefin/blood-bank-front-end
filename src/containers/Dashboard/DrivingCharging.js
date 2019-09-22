// @flow
import React from "react";
import _ from 'lodash';
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardText from "components/Card/CardText.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";


import { multipleBarsChart } from "variables/charts.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

const styles = {
  ...chartsStyle,
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center"
  },
  cardCategory: {
    margin: "0",
    color: "#999999"
  },
  driving: {
      color: '#6385A5'
  },
  charging: {
      color: '#44D2DD'
  }
};

type Props = {
  classes: Object,
  rtlActive: boolean,
  drivingChargingInformation: Object
};

@withStyles(styles)
export default class DrivingCharging extends React.Component<Props> {

    getProperData = (dataKey: string, labelKey: string, isTime?: boolean) => {
        const { drivingChargingInformation } = this.props;
        const labels = [];
        const drivingSeries = [];
        const chargingSeries = [];

        drivingChargingInformation[dataKey].forEach((info) => {
            const label = isTime ? ''+parseFloat(info[labelKey]) + info[labelKey].slice(-2) : new Date(info[labelKey]).getDate();
            const driving = !isTime ? info['driving'] / 60 : parseFloat(info['driving']);
            const charging = !isTime ? info['charging'] / 60 : parseFloat(info['charging']);
            labels.push(label);
            drivingSeries.push(driving.toFixed(0));
            chargingSeries.push(charging.toFixed(0));
        });

        return {
            labels,
            series: [drivingSeries, chargingSeries]
        }
    }

    render() {
        const { classes, drivingChargingInformation } = this.props;

        return (
            <ErrorCatcher>
                <Card>
                    <CardHeader>
                        <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                            Driving vs Charging
                        </h3>
                    </CardHeader>
                    <CardBody className="custom-card-body">
                        {!_.isEmpty(drivingChargingInformation) ? <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Drivings vs Charging - Last 24 hours</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Hours</span>
                                        <span className="chart-wrapper__axis-y">Minutes</span>
                                        <ChartistGraph
                                            data={this.getProperData('Drivings vs Charging - Last 24 hours', 'dateString', true)}
                                            type="Bar"
                                            options={{
                                                ...multipleBarsChart.options, 
                                                classNames: {
                                                    label: "ct-label ct-label-rotated"
                                                }
                                            }}
                                            listener={multipleBarsChart.animation}
                                        />
                                    </CardBody>
                                    <CardFooter stats className={classes.cardFooter}>
                                    <i className={"fas fa-circle " + classes.driving} /> Driving{` `}
                                    <i className={"fas fa-circle " + classes.charging} /> Charging{` `}
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Drivings vs Charging - Last 7 days</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Days</span>
                                        <span className="chart-wrapper__axis-y">Minutes</span>
                                        <ChartistGraph
                                            data={this.getProperData('Drivings vs Charging - Last 7 days', 'dateString')}
                                            type="Bar"
                                            options={multipleBarsChart.options}
                                            listener={multipleBarsChart.animation}
                                        />
                                    </CardBody>
                                    <CardFooter stats className={classes.cardFooter}>
                                    <i className={"fas fa-circle " + classes.driving} /> Driving{` `}
                                    <i className={"fas fa-circle " + classes.charging} /> Charging{` `}
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        </GridContainer> : <p>No data was found!</p>}
                    </CardBody>
                </Card>
            </ErrorCatcher>
        );
    }
};
