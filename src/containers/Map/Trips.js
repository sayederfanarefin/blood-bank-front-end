import React from "react";
import axios from "axios";
import moment from 'moment';
import polyline from '@mapbox/polyline';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { geolocated } from 'react-geolocated';
import PerfectScrollbar from "react-perfect-scrollbar";
import ReactMapboxGl, { Layer, Feature, ZoomControl, Marker } from "react-mapbox-gl";
import { fetchMap } from 'actions/map';

import LoadingWrapper from 'components/LoadingWrapper';
import MapPage from './index';

import Datetime from "react-datetime";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Timeline from "components/Timeline/Timeline.jsx";
import Muted from "components/Typography/Muted.jsx";


import FormControl from "@material-ui/core/FormControl";

import 'react-perfect-scrollbar/dist/css/styles.css';

import battery from 'assets/img/battery.svg';
import gpsMarker from 'assets/img/gps_marker.svg';
import ErrorCatcher from "components/ErrorCatcher";


const accessToken = "pk.eyJ1IjoiZGFzaHJvYWQiLCJhIjoiY2lqaW52bmFxMDJ4enRmbTV2bmM0dDRicyJ9.Atci4c4WTxv5Jc2UW1_0-g";
const Map = ReactMapboxGl({
    accessToken
});

const linePaint = {
    'line-color': '#01BCD4',
    'line-width': 8
};

const circlePaint = {
    'circle-radius': 5,
    'circle-color': '#E54E52',
    'circle-opacity': 1
};

type Props = {
    mapData: Object,
    isFetching: boolean,
    serverError: string,
    fetchMap: Object,
    match: Object
}

type State = {
    date: string,
    paths: Object,
    chargingPaths: Array<Object>
}

@connect(
    state => ({
        mapData: state.map.data,
        isFetching: state.map.mapRequest,
        serverError: state.map.mapError
    }),
    dispatch => ({
        fetchMap: bindActionCreators(fetchMap, dispatch)
    })
)
@geolocated()
@withRouter
export default class Trips extends React.Component<Props, State> {
    API_KEY = 'AIzaSyDB5lQ_aWX5qAtqQIxdMOyMZzTPZJtAYPw';
    scrollBar = null;

    state = {
        date: "",
        activePath: {
            startTime: "",
            endTime: "",
            paths: []
        },
        chargingPaths: [],
        dataLimit: 5,
        locations: []
    }

    componentWillMount() {
        const { match: { params: { vin } }, fetchMap } = this.props;

        fetchMap.request({
            vin,
            // date: "2019-01-30T11:00:35",
            date: moment().format("YYYY-MM-DD[T]hh:mm:ss")
        })
    }
    
    handleChangeOfDate = (newMoment: Object) => {
        const { match: { params: { vin } }, fetchMap } = this.props;

        fetchMap.request({
            vin,
            date: newMoment.format("YYYY-MM-DD[T]hh:mm:ss")
        })
    }

    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.mapData && nextProps.mapData !== this.props.mapData) {
            if (nextProps.mapData.trips && nextProps.mapData.trips.length) {
                this.updatePathValues(nextProps.mapData.trips, 0, nextProps.mapData.chargingLocations);
            }
        }
    }

    /**
     * Create path values from coords data, that fetched from server
     */
    updatePathValues = (coords: Object, index: number, chargingLocations?: Array<Object>) => {
        const activePath = {
            startTime: coords[index].startTime,
            endTime: coords[index].endTime,
            // startTime: coords[index].startTime.slice(0, -5),
            // endTime: coords[index].endTime.slice(0, -5),
            paths: coords[index].vehicleCoordinates
        };

        const chargingPaths = chargingLocations || this.state.chargingPaths;
        const paths = [activePath.paths[0], activePath.paths[activePath.paths.length-1]]

        axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/${paths.join(';')}.json`, {
            params: {
                access_token: accessToken,
                alternatives: false,
                overview: 'full',
                annotations: 'duration,distance,speed,congestion'
            }
        })
            .then(({ data }) => {

                console.log('data: ', data)
                console.log('polyline.decode(data.routes[0].geometry): ', polyline.decode(data.routes[0].geometry))
                activePath.paths = polyline.decode(data.routes[0].geometry).map((geo => [geo[1], geo[0]]));
                this.setState({
                    activePath,
                    chargingPaths,
                    trips: coords.slice(0, 5),
                    locations: [
                        data.waypoints[0].location,
                        data.waypoints[1].location
                    ]
                });
            })
    }

    validateDate(current) {
        const today = Datetime.moment().format();
        return current.isBefore(today);
    }
    
    isEqualTrips = (trip: Object, activePath: Object) => {
        const isEqual = (activePath && trip) ? (
            activePath.startTime === trip.startTime && activePath.endTime === trip.endTime
        ) : false;

        return isEqual;
    }

    fetchNewData = () => {
        // console.log('fetchNewData')
    }

    render() {
        const { isFetching, mapData, coords } = this.props;
        const { activePath, chargingPaths, locations } = this.state;
        const style = {
            height: "400px",
            width: "100%"
        };
        const middleIndexOfArray = parseInt((activePath.paths.length-1)/2, 0);
        // const middleIndexOfArray = activePath.paths.length > 0 ? [activePath.paths[0][0], activePath.paths[activePath.paths.length-1][1]] : activePath.paths[0];
        const storiesBox = ((mapData ? mapData.trips : []).length === 0) ? [{
            inverted: true,
            badgeColor: "darkBlue",
            badgeIcon: () => <i className="fa fa-location-arrow"></i>,
            title: "No trips found!",
            titleColor: "darkBlue"
        }] : mapData.trips.map((trip, index) => {
            const momentFormat = {
                startTime : trip.startTime,
                endTime : trip.endTime,
                // startTime : trip.startTime.slice(0, -5),
                // endTime : trip.endTime.slice(0, -5),
            };

            return {
                inverted: true,
                badgeColor: this.isEqualTrips(momentFormat, activePath) ? "success" : "darkBlue",
                badgeIcon: () => <i className="fa fa-location-arrow"></i>,
                title: "Trip " + (index+1),
                titleColor: this.isEqualTrips(momentFormat, activePath) ? "success" : "darkBlue",
                body: (
                    <div className="item-box">
                        <p className="item-box__address start"> {trip.startPlace} </p>
                        <div className="item-box__inner">
                            <Muted className="item-box__clocks">
                                Start: {momentFormat.startTime || ""}
                            </Muted>
                            <ul className="item-box__inner-list">
                                <li>
                                    <i className="far fa-clock" />{` `} {trip.totalMinutes.toFixed(0) + ' min'}
                                </li>
                                <li>
                                    <i className="fas fa-road" />{` `} {trip.distance.toFixed(1) + ' ' + (mapData.distanceUnit === 'miles' ? 'mi' : 'km')}
                                </li>
                                <li>
                                    <i className="fas fa-bolt" />{` `} {(trip.bStrtLvl - trip.bEndLvl) + ' kWh'}
                                </li>
                            </ul>
                            <Muted className="item-box__clocks">
                                End: {momentFormat.endTime || ""}
                            </Muted>
                        </div>
                        <p className="item-box__address end"> {trip.endPlace || "California"} </p>
                    </div>
                )
            }
        })
        const centerCoords = (mapData && mapData.trips.length > 0) ? activePath.paths[middleIndexOfArray] : coords ? [coords.longitude, coords.latitude] : [-120, 50];
        // const fitBounds = (activePath.paths.length > 0) ? [activePath.paths[0], activePath.paths[activePath.paths.length-1]] : [[-79, 43], [-73, 45]];

        // console.log('activePath: ', activePath)
        // console.log('fitBounds: ', fitBounds)

        return (
            <MapPage>
                <ErrorCatcher>
                    <LoadingWrapper show={isFetching}>
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={8} md={8}>
                                <Card className="wrapped-card-class">
                                    <CardHeader>
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <h5>Real Time Map</h5>

                                            <FormControl style={{margin: 0, width: "150px"}}>
                                                <Datetime
                                                    className="date-interval-box"
                                                    inputProps={{ placeholder: "Select Date" }}
                                                    onChange={this.handleChangeOfDate}
                                                    defaultValue={new Date()}
                                                    isValidDate={ this.validateDate }
                                                    dateFormat="MMMM Do YYYY"
                                                    timeFormat={false}
                                                />
                                            </FormControl>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Map
                                            // eslint-disable-next-line
                                            style="mapbox://styles/mapbox/streets-v9"
                                            containerStyle={style}
                                            center={centerCoords}
                                            fitBoundsOptions={{
                                                bounds: locations,
                                                options: {
                                                    padding: {
                                                        top: 10,
                                                        bottom: 10,
                                                        left: 10,
                                                        right: 10
                                                    }
                                                }
                                            }}
                                            // zoom={[12]}
                                        >
                                            <ZoomControl />
                                            <Layer
                                                type="line"
                                                paint={linePaint}
                                            >
                                                <Feature coordinates={activePath.paths}/>
                                            </Layer>

                                            {/* Start Point */}
                                            {activePath.paths[0] && <Layer type="circle" paint={circlePaint}>
                                                <Feature coordinates={activePath.paths[0]} />
                                            </Layer>}

                                            {/* End Point */}
                                            {activePath.paths[activePath.paths.length-1] && <Marker
                                                coordinates={activePath.paths[activePath.paths.length-1]}
                                                anchor="bottom"
                                            >
                                                <img src={gpsMarker} alt="End Point" width={25} />
                                            </Marker>}

                                            {/* Charging points */}
                                            {chargingPaths.map((chargingPoint, i) => (
                                                <Marker
                                                    key={i}
                                                    coordinates={chargingPoint.coordinates}
                                                    anchor="bottom"
                                                >
                                                    <img src={battery} alt="Charge Point" width={40} />
                                                </Marker>
                                            ))}
                                        </Map>
                                    </CardBody>
                                </Card>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4}>
                                <PerfectScrollbar
                                    className="timelineWrapper"
                                    onYReachEnd={this.fetchNewData}
                                >
                                    {!isFetching && <Timeline
                                        simple
                                        stories={storiesBox}
                                        onChange={(index) => this.updatePathValues(mapData.trips, index)}
                                    />}
                                </PerfectScrollbar>
                            </GridItem>
                        </GridContainer>
                    </LoadingWrapper>
                </ErrorCatcher>
            </MapPage>
        );
    }
}


// <Marker
// coordinates={activePath.paths[0]}
// anchor="bottom">
// <img src={logo}/>
// </Marker>



                        // {(mapData.trips.length > 0) ? <List component="nav">
                        //     {mapData.trips.map((trip, index) => {
                        //         const momentFormat = {
                        //             startTime : trip.startTime.slice(0, -5),
                        //             endTime : trip.endTime.slice(0, -5)
                        //         };

                        //         return (
                        //             <ListItem
                        //                 button
                        //                 onClick={() => this.updatePathValues(mapData.trips, index)}
                        //                 selected={this.isEqualTrips(momentFormat, activePath)}
                        //             >
                        //                 <ListItemText
                        //                     primary={"Trip" + (index+1)}
                        //                     secondary={
                        //                         <React.Fragment>
                        //                             <Typography component="span" className={classes.inline} color="textPrimary">
                        //                                 {trip.startPlace}
                        //                             </Typography>
                        //                             <Typography component="span" className={classes.inline} color="textPrimary">
                        //                                 Start date: {moment(momentFormat.startTime || "").format('DD.MM.YYYY hh:mm:ss')}
                        //                             </Typography>
                        //                             <Typography component="span" className={classes.inline} color="textPrimary">
                        //                                 {trip.totalMinutes.toFixed(0) + ' minutes'} | {trip.distance.toFixed(1) + ' km'}
                        //                             </Typography>
                        //                             <Typography component="span" className={classes.inline} color="textPrimary">
                        //                                 End date: {moment(momentFormat.endTime || "").format('DD.MM.YYYY hh:mm:ss')}
                        //                             </Typography>

                        //                             <Typography component="span" className={classes.inline} color="textPrimary">
                        //                                 {trip.endPlace}
                        //                             </Typography>
                        //                         </React.Fragment>
                        //                     }
                        //                     key={index}
                        //                 />
                        //             </ListItem>
                        //         )
                        //     })}
                        // </List> : <p>No trips found!</p>