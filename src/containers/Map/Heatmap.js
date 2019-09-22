import React from "react";
import axios from "axios";
import polyline from '@mapbox/polyline';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { geolocated } from 'react-geolocated';
import ReactMapboxGl, { ZoomControl, Layer, Source } from "react-mapbox-gl";
import { fetchMap } from 'actions/map';

import LoadingWrapper from 'components/LoadingWrapper';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

// import battery from 'assets/img/battery.svg';
import ErrorCatcher from "components/ErrorCatcher";


const accessToken = "pk.eyJ1IjoiZGFzaHJvYWQiLCJhIjoiY2lqaW52bmFxMDJ4enRmbTV2bmM0dDRicyJ9.Atci4c4WTxv5Jc2UW1_0-g";
const Map = ReactMapboxGl({
    accessToken
});

const heatmapPaint = {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": [
        "interpolate",
        ["linear"],
        ["get", "mag"],
        0, 0,
        6, 1
    ],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, 1,
        9, 3
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(33,102,172,0)",
        0.2, "rgb(103,169,207)",
        0.4, "rgb(209,229,240)",
        0.6, "rgb(253,219,199)",
        0.8, "rgb(239,138,98)",
        1, "rgb(178,24,43)"
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0, 2,
        9, 20
    ],
    // Transition from heatmap to circle layer by zoom level
    "heatmap-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, 1,
        9, 0
    ],
}

const circlePaint = {
    "circle-radius": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1, 1,
            6, 4
        ],
        16, [
            "interpolate",
            ["linear"],
            ["get", "mag"],
            1, 5,
            6, 50
        ]
    ],
    'circle-color': [
        "interpolate",
        ["linear"],
        ["get", "mag"],
        1, "rgba(33,102,172,0)",
        2, "rgb(103,169,207)",
        3, "rgb(209,229,240)",
        4, "rgb(253,219,199)",
        5, "rgb(239,138,98)",
        6, "rgb(178,24,43)"
    ],
    "circle-stroke-color": "white",
    "circle-stroke-width": 1,
    // Transition from heatmap to circle layer by zoom level
    "circle-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        7, 0,
        8, 1
    ]
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
export default class Heatmap extends React.Component<Props, State> {
    API_KEY = 'AIzaSyDB5lQ_aWX5qAtqQIxdMOyMZzTPZJtAYPw';

    state = {
        activePath: {
            startTime: "",
            endTime: "",
            paths: []
        },
        chargingPaths: [
            ['-122.35772361100337', '37.94531959478408'],
            ['-122.383307690792', '37.92524693225619'],
            ['-122.33843509012218', '37.9096050086452'],
            ['-122.31968236148246', '37.92513869422068'],
            ['-122.33388085602368', '37.94309872947524'],
            ['-122.35732176682451', '37.94542264864491'],
        ],
        dataLimit: 5,
        locations: []
    }

    componentWillMount() {
        // const { match: { params: { vin } }, fetchMap } = this.props;

        // fetchMap.request({
        //     vin,
        //     // date: "2019-01-30T11:00:35",
        //     date: moment().format("YYYY-MM-DD[T]hh:mm:ss")
        // })
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

    render() {
        const { isFetching, coords } = this.props;
        // const { chargingPaths, locations } = this.state;
        const style = {
            height: "400px",
            width: "100%"
        };
        // const middleIndexOfArray = parseInt((chargingPaths.length-1)/2, 0);
        const centerCoords = coords ? [coords.longitude, coords.latitude] : [-120, 50];

        const EARTH_SOURCE_OPTIONS = {
            "type": "geojson",
            "data": "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
        }

        return (
            <ErrorCatcher>
                <LoadingWrapper show={isFetching}>
                    <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={12}>
                            <Card className="wrapped-card-class">
                                <CardHeader>
                                    <div style={{display: "flex", justifyContent: "space-between"}}>
                                        <h5>Real Time Map</h5>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Map
                                        // eslint-disable-next-line
                                        style="mapbox://styles/mapbox/streets-v9"
                                        containerStyle={style}
                                        center={centerCoords}
                                        // zoom={[2]}
                                    >
                                        <ZoomControl />

                                        <Source id="earthquakes" geoJsonSource={EARTH_SOURCE_OPTIONS} />
                                        <Layer type="circle" paint={circlePaint} sourceId="earthquakes" />
                                        <Layer type="heatmap" paint={heatmapPaint} sourceId="earthquakes" />
                                    </Map>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
                </LoadingWrapper>
            </ErrorCatcher>
        );
    }
}


                                        // {chargingPaths.map((path, index) => (
                                        //     <Layer type="circle" paint={circlePaint} key={index} sourceId="earthquakes">
                                        //         <Feature coordinates={path} />
                                        //     </Layer>
                                        // ))}