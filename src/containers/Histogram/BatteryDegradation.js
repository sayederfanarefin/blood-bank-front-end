// @flow
import React from "react";
import Chartist from "chartist";
import ChartistGraph from "react-chartist";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import chartsStyle from "assets/jss/material-dashboard-pro-react/views/chartsStyle.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import ErrorCatcher from "components/ErrorCatcher";

const responseData = [
	{
		"odometer [mi]": "0",
		"Max Range": "100.00%",
		"Range 2": "100.00%",
		"Range3": "100.00%"
	},
	{
		"odometer [mi]": "5000",
		"Max Range": "99.18%",
		"Range 2": "99.15%",
		"Range3": "99.10%"
	},
	{
		"odometer [mi]": "10000",
		"Max Range": "98.49%",
		"Range 2": "98.43%",
		"Range3": "98.33%"
	},
	{
		"odometer [mi]": "15000",
		"Max Range": "97.91%",
		"Range 2": "97.81%",
		"Range3": "97.66%"
	},
	{
		"odometer [mi]": "20000",
		"Max Range": "97.41%",
		"Range 2": "97.28%",
		"Range3": "97.08%"
	},
	{
		"odometer [mi]": "25000",
		"Max Range": "96.99%",
		"Range 2": "96.83%",
		"Range3": "96.58%"
	},
	{
		"odometer [mi]": "30000",
		"Max Range": "96.64%",
		"Range 2": "96.44%",
		"Range3": "96.14%"
	},
	{
		"odometer [mi]": "35000",
		"Max Range": "96.33%",
		"Range 2": "96.10%",
		"Range3": "95.75%"
	},
	{
		"odometer [mi]": "40000",
		"Max Range": "96.07%",
		"Range 2": "95.80%",
		"Range3": "95.40%"
	},
	{
		"odometer [mi]": "45000",
		"Max Range": "95.85%",
		"Range 2": "95.55%",
		"Range3": "95.10%"
	},
	{
		"odometer [mi]": "50000",
		"Max Range": "95.66%",
		"Range 2": "95.33%",
		"Range3": "94.83%"
	},
	{
		"odometer [mi]": "55000",
		"Max Range": "95.50%",
		"Range 2": "95.13%",
		"Range3": "94.58%"
	},
	{
		"odometer [mi]": "60000",
		"Max Range": "95.36%",
		"Range 2": "94.96%",
		"Range3": "94.36%"
	},
	{
		"odometer [mi]": "65000",
		"Max Range": "95.23%",
		"Range 2": "94.80%",
		"Range3": "94.15%"
	},
	{
		"odometer [mi]": "70000",
		"Max Range": "95.13%",
		"Range 2": "94.66%",
		"Range3": "93.96%"
	},
	{
		"odometer [mi]": "75000",
		"Max Range": "95.04%",
		"Range 2": "94.54%",
		"Range3": "93.79%"
	},
	{
		"odometer [mi]": "80000",
		"Max Range": "94.96%",
		"Range 2": "94.42%",
		"Range3": "93.62%"
	},
	{
		"odometer [mi]": "85000",
		"Max Range": "94.89%",
		"Range 2": "94.32%",
		"Range3": "93.47%"
	},
	{
		"odometer [mi]": "90000",
		"Max Range": "94.82%",
		"Range 2": "94.22%",
		"Range3": "93.32%"
	},
	{
		"odometer [mi]": "95000",
		"Max Range": "94.77%",
		"Range 2": "94.13%",
		"Range3": "93.18%"
	},
	{
		"odometer [mi]": "100000",
		"Max Range": "94.72%",
		"Range 2": "94.05%",
		"Range3": "93.05%"
	},
	{
		"odometer [mi]": "105000",
		"Max Range": "94.67%",
		"Range 2": "93.97%",
		"Range3": "92.92%"
	},
	{
		"odometer [mi]": "110000",
		"Max Range": "94.63%",
		"Range 2": "93.90%",
		"Range3": "92.80%"
	},
	{
		"odometer [mi]": "115000",
		"Max Range": "94.59%",
		"Range 2": "93.83%",
		"Range3": "92.68%"
	},
	{
		"odometer [mi]": "120000",
		"Max Range": "94.56%",
		"Range 2": "93.76%",
		"Range3": "92.56%"
	},
	{
		"odometer [mi]": "125000",
		"Max Range": "94.53%",
		"Range 2": "93.69%",
		"Range3": "92.44%"
	},
	{
		"odometer [mi]": "130000",
		"Max Range": "94.50%",
		"Range 2": "93.63%",
		"Range3": "92.33%"
	},
	{
		"odometer [mi]": "135000",
		"Max Range": "94.47%",
		"Range 2": "93.57%",
		"Range3": "92.22%"
	},
	{
		"odometer [mi]": "140000",
		"Max Range": "94.45%",
		"Range 2": "93.51%",
		"Range3": "92.11%"
	},
	{
		"odometer [mi]": "145000",
		"Max Range": "94.42%",
		"Range 2": "93.45%",
		"Range3": "92.00%"
	},
	{
		"odometer [mi]": "150000",
		"Max Range": "94.40%",
		"Range 2": "93.40%",
		"Range3": "91.90%"
	},
	{
		"odometer [mi]": "155000",
		"Max Range": "94.38%",
		"Range 2": "93.34%",
		"Range3": "91.79%"
	},
	{
		"odometer [mi]": "160000",
		"Max Range": "94.35%",
		"Range 2": "93.29%",
		"Range3": "91.69%"
	},
	{
		"odometer [mi]": "165000",
		"Max Range": "94.33%",
		"Range 2": "93.23%",
		"Range3": "91.58%"
	},
	{
		"odometer [mi]": "170000",
		"Max Range": "94.31%",
		"Range 2": "93.18%",
		"Range3": "91.48%"
	},
	{
		"odometer [mi]": "175000",
		"Max Range": "94.30%",
		"Range 2": "93.13%",
		"Range3": "91.38%"
	},
	{
		"odometer [mi]": "180000",
		"Max Range": "94.28%",
		"Range 2": "93.08%",
		"Range3": "91.28%"
	},
	{
		"odometer [mi]": "185000",
		"Max Range": "94.26%",
		"Range 2": "93.03%",
		"Range3": "91.18%"
	},
	{
		"odometer [mi]": "190000",
		"Max Range": "94.24%",
		"Range 2": "92.98%",
		"Range3": "91.08%"
	},
	{
		"odometer [mi]": "195000",
		"Max Range": "94.22%",
		"Range 2": "92.92%",
		"Range3": "90.97%"
	},
	{
		"odometer [mi]": "200000",
		"Max Range": "94.21%",
		"Range 2": "92.87%",
		"Range3": "90.87%"
	},
	{
		"odometer [mi]": "205000",
		"Max Range": "94.19%",
		"Range 2": "92.83%",
		"Range3": "90.78%"
	},
	{
		"odometer [mi]": "210000",
		"Max Range": "94.18%",
		"Range 2": "92.78%",
		"Range3": "90.68%"
	},
	{
		"odometer [mi]": "215000",
		"Max Range": "94.16%",
		"Range 2": "92.73%",
		"Range3": "90.58%"
	},
	{
		"odometer [mi]": "220000",
		"Max Range": "94.15%",
		"Range 2": "92.68%",
		"Range3": "90.48%"
	},
	{
		"odometer [mi]": "225000",
		"Max Range": "94.13%",
		"Range 2": "92.63%",
		"Range3": "90.38%"
	},
	{
		"odometer [mi]": "230000",
		"Max Range": "94.12%",
		"Range 2": "92.58%",
		"Range3": "90.28%"
	},
	{
		"odometer [mi]": "235000",
		"Max Range": "94.10%",
		"Range 2": "92.54%",
		"Range3": "90.19%"
	},
	{
		"odometer [mi]": "240000",
		"Max Range": "94.09%",
		"Range 2": "92.49%",
		"Range3": "90.09%"
	},
	{
		"odometer [mi]": "245000",
		"Max Range": "94.07%",
		"Range 2": "92.44%",
		"Range3": "89.99%"
	},
	{
		"odometer [mi]": "250000",
		"Max Range": "94.06%",
		"Range 2": "92.39%",
		"Range3": "89.89%"
	},
	{
		"odometer [mi]": "255000",
		"Max Range": "94.05%",
		"Range 2": "92.35%",
		"Range3": "89.80%"
	},
	{
		"odometer [mi]": "260000",
		"Max Range": "94.03%",
		"Range 2": "92.30%",
		"Range3": "89.70%"
	},
	{
		"odometer [mi]": "265000",
		"Max Range": "94.02%",
		"Range 2": "92.26%",
		"Range3": "89.61%"
	},
	{
		"odometer [mi]": "270000",
		"Max Range": "94.01%",
		"Range 2": "92.21%",
		"Range3": "89.51%"
	},
	{
		"odometer [mi]": "275000",
		"Max Range": "94.00%",
		"Range 2": "92.16%",
		"Range3": "89.41%"
	},
	{
		"odometer [mi]": "280000",
		"Max Range": "93.99%",
		"Range 2": "92.12%",
		"Range3": "89.32%"
	},
	{
		"odometer [mi]": "285000",
		"Max Range": "93.97%",
		"Range 2": "92.07%",
		"Range3": "89.22%"
	},
	{
		"odometer [mi]": "290000",
		"Max Range": "93.96%",
		"Range 2": "92.03%",
		"Range3": "89.13%"
	},
	{
		"odometer [mi]": "295000",
		"Max Range": "93.95%",
		"Range 2": "91.98%",
		"Range3": "89.03%"
	},
	{
		"odometer [mi]": "300000",
		"Max Range": "93.94%",
		"Range 2": "91.94%",
		"Range3": "88.94%"
	},
	{
		"odometer [mi]": "305000",
		"Max Range": "93.93%",
		"Range 2": "91.90%",
		"Range3": "88.85%"
	},
	{
		"odometer [mi]": "310000",
		"Max Range": "93.92%",
		"Range 2": "91.85%",
		"Range3": "88.75%"
	},
	{
		"odometer [mi]": "315000",
		"Max Range": "93.91%",
		"Range 2": "91.81%",
		"Range3": "88.66%"
	},
	{
		"odometer [mi]": "320000",
		"Max Range": "93.90%",
		"Range 2": "91.76%",
		"Range3": "88.56%"
	},
	{
		"odometer [mi]": "325000",
		"Max Range": "93.89%",
		"Range 2": "91.72%",
		"Range3": "88.47%"
	},
	{
		"odometer [mi]": "330000",
		"Max Range": "93.88%",
		"Range 2": "91.68%",
		"Range3": "88.38%"
	}
]

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
};

type State = {
    isSorting: boolean,
    sortedData: Object<Array>,
}

@withStyles(styles)
export default class BatteryDegradation extends React.Component<Props, State> {
    state = {
        isSorting: false,
        sortedData: {},
    }

    componentWillMount() {
        const sortedData = {
            "labels": [],
            "series": [{
                name: 'Max Range',
                data: []
            }, {
                name: 'Range 2',
                data: []
            }, {
                name: 'Range3',
                data: []
            }]
        };

        for (let i = 0; i < responseData.length; i++) {
            const odometer = parseFloat(responseData[i]["odometer [mi]"]);

            sortedData.labels.push(odometer);
            sortedData.series[0].data.push(parseFloat(responseData[i]["Max Range"]));
            sortedData.series[1].data.push(parseFloat(responseData[i]["Range 2"]));
            sortedData.series[2].data.push(parseFloat(responseData[i]["Range3"]));
        }

        this.setState({ sortedData });
    }

    render() {
        const { classes } = this.props;
        const { sortedData } = this.state;
          
        const options = {
            series: {
              'Max Range': {
                lineSmooth: Chartist.Interpolation.simple(),
              },
              'Range 2': {
                lineSmooth: Chartist.Interpolation.simple(),
              },
              'Range3': {
                lineSmooth: Chartist.Interpolation.simple(),
              }
            },
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 13 === 0 ? '' + value : null;
              }
            }
        };

        // console.log('sortedData: ', sortedData)

        return (
            <ErrorCatcher>
                <form className={classes.root} autoComplete="off">
                    <Card>
                        <CardHeader>
                            <h3 className={classes.cardTitle} style={{margin: 0, fontWeight: 600}}>
                                Battery Degradation
                            </h3>
                        </CardHeader>
                        <CardBody className="custom-card-body">
                            <div className="chart-container ct-golden-section">
                                <ChartistGraph
                                    data={sortedData}
                                    type="Line"
                                    options={options}
                                />
                            </div>
                        </CardBody>
                    </Card>
                </form>
            </ErrorCatcher>
        );
    }
};
