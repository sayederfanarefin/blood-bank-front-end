import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Chartist from "chartist";
import { updateDocTitle } from "helpers/htmlHelper";
import './index.scss';

// import Vehicles from '../Vehicles';

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";

import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardText from "components/Card/CardText.jsx";
import ChartistGraph from "react-chartist";


import { straightLinesChart } from "variables/charts.jsx";
import LoadingWrapper from "components/LoadingWrapper";
import moment from "moment";
import ErrorCatcher from "components/ErrorCatcher";

type Props = {
    mapData: Object,
    isFetching: boolean,
    fetchMap: Object,
    match: Object
}

type State = {
    last7Days: Object
}

@connect(
    state => ({
        mapData: state.map.data,
        isFetching: state.map.mapRequest
    })
)
@withStyles({...extendedTablesStyle, ...sweetAlertStyle})
@withRouter
export default class MapPage extends React.Component<Props, State> {
    state = {
        mapInfo: null,
        last7Days: null
    }

    componentDidMount() {
        // Update page title
        updateDocTitle('Map Report');
    }

    componentWillReceiveProps(nextProps: Object) {
        const { last7Days } = this.state;
        const { mapData } = nextProps;

        if (mapData && JSON.stringify(mapData) !== JSON.stringify(this.props.mapData) && !last7Days) {
            const labels = [];
            const series = [];
            
            mapData.last7Dys.forEach((element) => {
                const date = moment(element.date).format('DD');
                labels.push(date);
                series.push(parseInt(element.dis, 0));
            });

            this.setState({
                last7Days: {
                    labels,
                    series: [series]
                },
                mapInfo: {
                    name: mapData.name,
                    odo: mapData.odo,
                    distanceUnit: mapData.distanceUnit,
                    totalHours: mapData.totalHours,
                }
            });
        }
    }
    
    render() {
        const { isFetching, children } = this.props;
        const { last7Days, mapInfo } = this.state;

        return (
            <ErrorCatcher>
                <GridContainer>
                    <GridItem xs={12} sm={6} md={4} style={{margin: "30px 0 30px 0"}}>
                        <Card className="wrapped-card-class">
                            <CardHeader color="primary" text>
                                <CardText color="primary" className="card-title-box">
                                    <h5>General Information</h5>
                                </CardText>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching && !last7Days}>
                                    {mapInfo && <GridContainer>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="bold-theme-text">Vehicle name:</p>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="thin-theme-text text-right">{mapInfo.name}</p>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="bold-theme-text">Total Distance:</p>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="thin-theme-text text-right">{mapInfo.odo.toFixed(0)} {mapInfo.distanceUnit}</p>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="bold-theme-text">Total Hours driven:</p>
                                        </GridItem>
                                        <GridItem xs={12} sm={6} md={6}>
                                            <p className="thin-theme-text text-right">{mapInfo.totalHours} hrs</p>
                                        </GridItem>
                                    </GridContainer>}
                                </LoadingWrapper>
                            </CardBody>
                        </Card>
                    </GridItem>
    
                    <GridItem xs={12} sm={6} md={8} style={{margin: "30px 0 30px 0"}}>
                        <Card className="wrapped-card-class">
                            <CardHeader color="primary" text>
                                <CardText color="primary" className="card-title-box">
                                    <h5>Odometer - Last 7 Days</h5>
                                </CardText>
                            </CardHeader>
                            <CardBody>
                                <LoadingWrapper show={isFetching && !last7Days}>
                                    <ChartistGraph
                                        data={last7Days || []}
                                        type="Line"
                                        options={{
                                            lineSmooth: Chartist.Interpolation.cardinal({
                                              tension: 0
                                            }),
                                            chartPadding: {
                                              top: 0,
                                              right: 0,
                                              bottom: 0,
                                              left: 0
                                            },
                                            classNames: {
                                              point: "ct-point ct-white",
                                              line: "ct-line ct-white"
                                            }
                                        }}
                                        listener={straightLinesChart.animation}
                                    />
                                </LoadingWrapper>
                            </CardBody>
                        </Card>
                    </GridItem>

                    <GridItem xs={12} sm={12} md={12} style={{margin: "30px 0 30px 0"}}>
                        {children}
                    </GridItem>
                </GridContainer>
            </ErrorCatcher>
        );
    }
}


// <GridItem xs={12} sm={12} md={12}>
// <Vehicles />
// </GridItem>

// <GridItem xs={12} sm={6} md={4} style={{margin: "30px 0 30px 0"}}>
//                     <Card className="wrapped-card-class">
//                         <CardHeader color="primary" text>
//                             <CardText color="primary" className="card-title-box">
//                                 <h5>Distance - Last 7 Days</h5>
//                             </CardText>
//                         </CardHeader>
//                         <CardBody>
//                             <ChartistGraph
//                                 data={straightLinesChart.data}
//                                 type="Line"
//                                 options={straightLinesChart.options}
//                                 listener={straightLinesChart.animation}
//                             />
//                         </CardBody>
//                     </Card>
//                 </GridItem>