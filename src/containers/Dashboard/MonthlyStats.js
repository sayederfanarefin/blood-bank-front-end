// @flow
import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import Chartist from "chartist";
import ChartistGraph from "react-chartist";
import { fetchVehicleMonthly } from 'actions/vehicles';
import { fetch24hoursSOC } from 'actions/dashboard';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CardText from "components/Card/CardText.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import LoadingWrapper from "components/LoadingWrapper";

import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

import { colouredLinesChart } from "variables/charts.jsx";


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
  }
};

type Props = {
  date: string,
  speedUnit: string,
  isFetching: boolean,
  errorMessage: string,
  monthlyData: Array<Object>,
  hourlyData: Array<Object>,
  user: Object,
  classes: Object,
  match: Object,
  rtlActive: boolean,
  fetchVehicleMonthlyData: Object,
  fetch24hoursSOC: Object
};

type State = {
  monthlyData: Object,
  hourlyData: Object
};


var delays2 = 80,
  durations2 = 500;


@connect(
    state => ({
        isFetching: (state.vehicles.monthlyRequest || state.dashboard.lastDaySOCRequest),
        errorMessage: (state.vehicles.monthlyError || state.dashboard.lastDaySOCError),
        monthlyData: state.vehicles.monthlyVehicleData,
        hourlyData: state.dashboard.lastDaySOCData,
        user: state.user.data
    }),
    dispatch => ({
        fetchVehicleMonthlyData: bindActionCreators(fetchVehicleMonthly, dispatch),
        fetch24hoursSOC: bindActionCreators(fetch24hoursSOC, dispatch)
    })
)
@withStyles(styles)
@withRouter
export default class MonthlyStats extends React.Component<Props, State> {
    state = {
        monthlyData: {},
        hourlyData: {}
    }

    componentWillMount() {
        const { match: { params: { vin } }, fetchVehicleMonthlyData, fetch24hoursSOC } = this.props;

        fetchVehicleMonthlyData.request({
            vin: vin || this.props.vin
        })
        fetch24hoursSOC.request({
            vin: vin || this.props.vin
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { monthlyData, hourlyData } = nextProps;

        if (monthlyData && monthlyData !== this.props.monthlyData){
            this.handleMonthlyData(monthlyData);
        }
        if (hourlyData && hourlyData !== this.props.hourlyData){
            this.handleHourlyData(hourlyData);
        }
    }

    handleMonthlyData = (monthlyData: Array<Object>) => {
        const { speedUnit } = this.props;
        const localMonthlyData = {
            labels: []
        };
        const series = [];

        monthlyData.forEach((d) => {
            const endDate = new Date(d.endDate);
            const serie = parseFloat(d.vehicleOdometer) / (speedUnit === 'Miles' ? 1.6 : 1);

            localMonthlyData.labels.push(endDate.toLocaleString('en-us', { month: 'long' }))
            series.push(serie);
        });

        localMonthlyData.series = [series];

        this.setState({
            monthlyData: localMonthlyData
        })
    }

    handleHourlyData = (hourlyData: Array<Object>) => {
        const localHourlyData = {
            labels: [],
            series: [
                [],
                [],
                []
            ]
        };

        hourlyData.forEach((d) => {
            localHourlyData.labels.push(d.time || "")

            localHourlyData.series[2].push(d.socMin);
            localHourlyData.series[1].push(d.socMax);
            localHourlyData.series[0].push(d.level);
        });

        this.setState({
            hourlyData: localHourlyData
        })
    }

    render() {
        const { isFetching, classes, speedUnit } = this.props;
        const { monthlyData, hourlyData } = this.state;

        return (
            <ErrorCatcher>
                <Card>
                    <CardHeader>
                        <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                            Monthly stats
                        </h3>
                    </CardHeader>
                    <CardBody className="custom-card-body">
                        <LoadingWrapper show={isFetching}>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                {!_.isEmpty(monthlyData) ? <Card>
                                        <CardHeader color="primary" text>
                                            <CardText color="primary" className="card-title-box">
                                                <h5>Odometer - Since start of Keemut</h5>
                                            </CardText>
                                        </CardHeader>
                                        <CardBody className="chart-wrapper">
                                            <span className="chart-wrapper__axis-x">Month</span>
                                            <span className="chart-wrapper__axis-y">{speedUnit}</span>
                                            <ChartistGraph
                                                data={monthlyData}
                                                type="Bar"
                                                options={{
                                                    seriesBarDistance: 10,
                                                    axisX: {
                                                        showGrid: false
                                                    },
                                                    height: "300px",
                                                    showGridBackground: true,
                                                    referenceValue: Math.min.apply(null, monthlyData.series)
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
                                    </Card> : <p>No Odometer was found!</p>}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                {!_.isEmpty(hourlyData) ? <Card>
                                        <CardHeader color="primary" text>
                                            <CardText color="primary" className="card-title-box">
                                                <h5>SoC - Last Day</h5>
                                            </CardText>
                                        </CardHeader>
                                        <CardBody className="chart-wrapper">
                                            <span className="chart-wrapper__axis-x">Hour of the Day</span>
                                            <span className="chart-wrapper__axis-y">%</span>
                                            <ChartistGraph
                                                data={hourlyData}
                                                type="Line"
                                                options={{
                                                    lineSmooth: Chartist.Interpolation.cardinal({
                                                        tension: 10
                                                    }),
                                                    axisX: {
                                                        showGrid: true,
                                                    },
                                                    axisY: {
                                                        showGrid: false,
                                                        type: Chartist.FixedScaleAxis,
                                                        ticks: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                                                        low: 0
                                                    },
                                                    low: 0,
                                                    high: 100,
                                                    showPoint: false,
                                                    showArea: true,
                                                    height: "400px",
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
                                    </Card> : <p>No data was found!</p>}
                                </GridItem>
                            </GridContainer>
                        </LoadingWrapper>
                    </CardBody>
                </Card>
            </ErrorCatcher>
        );
    }
};
