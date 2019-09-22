// @flow
import React from "react";
import _ from 'lodash';
import ChartistGraph from "react-chartist";
import Chartist from "chartist";

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

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import { multipleBarsChart, colouredLinesChart } from "variables/charts.jsx";
import ErrorCatcher from "components/ErrorCatcher";

const styles = {
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
  min: {
      color: '#6385A5'
  },
  max: {
      color: '#44D2DD'
  },
  idealRange: {
      color: 'rgb(99, 133, 165, .8)'
  },
  estimateRange: {
      color: '#6385A5'
  }
};

type Props = {
  classes: Object,
  rtlActive: boolean,
  batteryInformation: Object,
  speedUnit: string
};

type State = {
    monthlyData: Object,
    dailyData: Object,
    dailyChargingData: Object
};


var delays2 = 80,
  durations2 = 500;

@withStyles(styles)
export default class BatteryInfo extends React.Component<Props, State> {

    state = {
        monthlyData: {},
        dailyData: {},
        dailyChargingData: {}
    }

    componentWillMount() {
        const { batteryInformation } = this.props;
        if (!_.isEmpty(batteryInformation)) {
            this.getProperMonthlyData('Battery Range Miles - Last 30 days', 'dateString', 'actualRange', 'monthlyData');
            this.getProperData('Battery Range kWh - Last 24 hours', 'dateString', 'actualRange', 'dailyData');
            this.getProperData('Charge Enable Request - Last 24 hours', 'dateString', 'isCharging', 'dailyChargingData');
        }
    }

    dateDiffInDays(currentDate: Object, settedDate: Object) {
        const timeDiff = Math.abs(currentDate.getTime() - settedDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

    getProperMonthlyData = async (dataKey: string, labelKey: string, seriesKey: string, stateKey: string) => {
        const { batteryInformation } = this.props;
        const labels = [];
        const serie1 = [],
            serie2 = [];
        
        batteryInformation[dataKey].forEach((info, index) => {
            const localDate = new Date(info.dateString);

            if (index % 2 === 0) {
                return serie2.push(info[seriesKey]);
            }

            labels.push(localDate.getDate().toString() + " " + localDate.toLocaleString('en-us', { month: 'short' }));
            serie1.push(info[seriesKey]);
        });



        this.setState({
            [stateKey]: {
                labels,
                series: [serie2, serie1]
            }
        });
    }

    getProperData = (dataKey: string, labelKey: string, seriesKey: string, stateKey: string) => {
        const { batteryInformation } = this.props;
        const labels = [];
        const series = [];

        batteryInformation[dataKey].forEach((info) => {
            labels.push(''+parseFloat(info[labelKey]) + info[labelKey].slice(-2));
            series.push(info[seriesKey]);
        });

        this.setState({
            [stateKey]: {
                labels,
                series: [series]
            }
        });
    }

    render() {
        const { classes, batteryInformation, speedUnit } = this.props;
        const { monthlyData, dailyData, dailyChargingData } = this.state;
        
        return (
            <ErrorCatcher>
                <Card>
                    <CardHeader>
                        <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                            Battery Information
                        </h3>
                    </CardHeader>
                    <CardBody className="custom-card-body">
                        {!_.isEmpty(batteryInformation) ? <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Battery Range - Last 30 days</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Days</span>
                                        <span className="chart-wrapper__axis-y">{speedUnit}</span>
                                        <ChartistGraph
                                            data={monthlyData}
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
                                        <GridItem xs={12} sm={12} md={6}>
                                            <i className={"fas fa-circle " + classes.min} /> Min{` `}
                                            <i className={"fas fa-circle " + classes.max} /> Max{` `}
                                        </GridItem>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Est Battery Range vs Ideal Battery Range</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Days</span>
                                        <span className="chart-wrapper__axis-y">{speedUnit}</span>
                                        <ChartistGraph
                                            data={monthlyData}
                                            type="Line"
                                            options={{
                                                lineSmooth: Chartist.Interpolation.cardinal({
                                                    tension: 10
                                                }),
                                                axisY: {
                                                    showGrid: true,
                                                    offset: 40
                                                },
                                                axisX: {
                                                    showGrid: false
                                                },
                                                showPoint: true,
                                                showArea: true,
                                                height: "300px",
                                                classNames: {
                                                    line: 'ct-line histogram-line',
                                                    point: 'ct-point histogram-point',
                                                    labelGroup: 'ct-labels histogram-labels',
                                                    chart: 'battery-range-chart',
                                                    label: "ct-label ct-label-rotated"
                                                }
                                            }}
                                            listener={colouredLinesChart.animation}
                                        />
                                    </CardBody>
                                    <CardFooter stats className={classes.cardFooter}>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <i className={"fas fa-circle " + classes.idealRange} /> Ideal Range (area){` `}
                                            <i className={"fas fa-circle " + classes.estimateRange} /> Estimate Range{` `}
                                        </GridItem>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Battery Range - Last 24 hours</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Hours</span>
                                        <span className="chart-wrapper__axis-y">{speedUnit}</span>
                                        <ChartistGraph
                                            data={dailyData}
                                            type="Bar"
                                            options={{
                                                seriesBarDistance: 10,
                                                axisX: {
                                                    showGrid: false
                                                },
                                                height: "300px",
                                                classNames: {
                                                    label: "ct-label ct-label-rotated"
                                                }
                                            }}
                                            listener={{
                                                draw: function(data) {
                                                    if (data.type === "bar") {
                                                        data.element.animate({
                                                            opacity: {
                                                                begin: (data.index + 1) * delays2,
                                                                dur: durations2,
                                                                from: 0,
                                                                to: 1,
                                                                easing: "ease"
                                                            }
                                                        });
                                                    }
                                                }
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card>
                                    <CardHeader color="primary" text>
                                        <CardText color="primary" className="card-title-box">
                                            <h5>Charge Enable Request - Last 24 hours</h5>
                                        </CardText>
                                    </CardHeader>
                                    <CardBody className="chart-wrapper">
                                        <span className="chart-wrapper__axis-x">Hour of the Day</span>
                                        <span className="chart-wrapper__axis-y">Is Charging</span>
                                        <ChartistGraph
                                            data={dailyChargingData}
                                            type="Line"
                                            options={{
                                                lineSmooth: Chartist.Interpolation.step({
                                                    tension: 1
                                                }),
                                                axisY: {
                                                    labelInterpolationFnc: (value, index, arr) => {
                                                        return (arr.length - 1) === index ? 1 : index === 0 ? 0 : "";
                                                    },
                                                    labelOffset: {
                                                        x: 0,
                                                        y: 10
                                                    },
                                                    type: Chartist.FixedScaleAxis,
                                                    ticks: [0, 1],
                                                    low: 0
                                                },
                                                height: "150px",
                                                low: 0,
                                                high: 1,
                                                classNames: {
                                                point: "ct-point ct-white",
                                                line: "ct-line ct-white"
                                                },
                                                showPoint: false
                                            }}
                                            listener={{
                                                draw: function(data) {
                                                    if (data.type === "bar") {
                                                        data.element.animate({
                                                            opacity: {
                                                                begin: (data.index + 1) * delays2,
                                                                dur: durations2,
                                                                from: 0,
                                                                to: 1,
                                                                easing: "ease"
                                                            }
                                                        });
                                                    }
                                                }
                                            }}
                                        />
                                    </CardBody>
                                </Card>
                            </GridItem>
                        </GridContainer> : <p>No data was found!</p>}
                    </CardBody>
                </Card>
            </ErrorCatcher>
        );
    }
};
