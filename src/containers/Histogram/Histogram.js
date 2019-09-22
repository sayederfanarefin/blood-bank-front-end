// @flow
import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChartistGraph from "react-chartist";
import { fetchHistogram } from 'actions/dashboard';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";


import { colouredLineChart } from "variables/charts.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

const styles = theme => ({
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
        color: '#00bcd4'
    },
    charging: {
        color: '#f05b4f'
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
      marginTop: 0,
      marginBottom: 0
    },
    menu: {
      width: 200,
    }
});

type Props = {
  carType: string,
  modelYear: string,
  classes: Object,
  rtlActive: boolean,
  isFetching: boolean,
  errorMessage: string,
  data: Array<Object>,
  fetchHistogramData: Object
};

type State = {
    histogramData: Object
};

@connect(
    state => ({
        isFetching: state.dashboard.histogramRequest,
        errorMessage: state.dashboard.histogramError,
        data: state.dashboard.histogramData
    }),
    dispatch => ({
        fetchHistogramData: bindActionCreators(fetchHistogram, dispatch)
    })
)
@withStyles(styles)
export default class Histogram extends React.Component<Props, State> {
    state = {
        histogramData: {}
    }

    componentWillMount() {
        const { fetchHistogramData, carType, modelYear } = this.props;

        fetchHistogramData.request({
            carType,
            modelYear,
            make: "Tesla"
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        const { data } = nextProps;

        if (data && data !== this.props.data) {
            this.handleHistogramData(data.buckets);
        }
    }

    handleHistogramData = (buckets: Array<Object>) => {
        const histogramData = {
            labels: []
        }
        const series = [];

        buckets.forEach((bucket) => {
            if (bucket.upper <= 100000 && bucket.frequency > 0) {
                histogramData.labels.push(bucket.upper ? parseFloat(bucket.upper.toFixed(0)) / 1000 + "k" : 0);
                series.push(bucket.frequency);
            }
        })

        histogramData.series = [series];

        this.setState({
            histogramData
        })
    }

    render() {
        const { classes } = this.props;
        const { histogramData } = this.state;

        return (
            <ErrorCatcher>
                <form className={classes.root} autoComplete="off">
                    <Card>
                        <CardHeader>
                            <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                                Histogram
                            </h3>
                        </CardHeader>
                        <CardBody className="custom-card-body">
                            {!_.isEmpty(histogramData) ? <div className="chart-container ct-golden-section">
                                <ChartistGraph
                                    data={histogramData}
                                    type="Line"
                                    options={{
                                        ...colouredLineChart.options,
                                        axisX: {
                                            showLabel: false,
                                            showGrid: false,
                                            scaleMinSpace: 0,
                                        },
                                        axisY: {
                                            showLabel: false,
                                            showGrid: false
                                        },
                                        showPoint: false,
                                        showArea: true,
                                        fullWidth: true
                                    }}
                                    listener={colouredLineChart.animation}
                                />
                                <ChartistGraph
                                    data={histogramData}
                                    type="Bar"
                                    options={{
                                        ...colouredLineChart.options,
                                        seriesBarDistance: 5,
                                        stackBars: true,
                                        stackMode: 'overlap',
                                    }}
                                    listener={colouredLineChart.animation}
                                />
                            </div> : <p>No Data was found!</p>}
                        </CardBody>
                    </Card>
                </form>
            </ErrorCatcher>
        );
    }
};
