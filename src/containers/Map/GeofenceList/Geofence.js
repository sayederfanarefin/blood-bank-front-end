import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import mapboxgl from "mapbox-gl";
import MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js';
import { geolocated } from 'react-geolocated';
import { updateGeofenceValidation } from 'helpers/validation';
import { fetchMap } from 'actions/map';

import LoadingWrapper from 'components/LoadingWrapper';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import ReduxInput from 'components/Form/Field';
import ReduxSelect from 'components/Form/SelectField';

import ErrorCatcher from "components/ErrorCatcher";


import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const accessToken = "pk.eyJ1IjoiZGFzaHJvYWQiLCJhIjoiY2lqaW52bmFxMDJ4enRmbTV2bmM0dDRicyJ9.Atci4c4WTxv5Jc2UW1_0-g";
// const Map = ReactMapboxGl({
//     accessToken
// });

type Props = {
    mapData: Object,
    isFetching: boolean,
    serverError: string,
    fetchMap: Object,
    vehicles: Array<Object>,
    match: Object
}

type State = {
    vehiclesList: Array<Object>
}

@connect(
    state => ({
        mapData: state.map.data,
        isFetching: (state.map.mapRequest || state.vehicles.vehiclesRequest),
        serverError: (state.map.mapError || state.vehicles.vehiclesError),
        vehicles: state.vehicles.data,
    }),
    dispatch => ({
        fetchMap: bindActionCreators(fetchMap, dispatch)
    })
)
@reduxForm({
    form: 'geofenceInfo',
    validate: updateGeofenceValidation,
    enableReinitialize: true
})
@geolocated()
@withRouter
export default class Geofence extends React.Component<Props, State> {
    state = {
        vehiclesList: []
    }

    // componentWillMount() {
    //     // const { match: { params: { vin } }, fetchMap } = this.props;

    //     // fetchMap.request({
    //     //     vin,
    //     //     // date: "2019-01-30T11:00:35",
    //     //     date: moment().format("YYYY-MM-DD[T]hh:mm:ss")
    //     // })
    // }

    componentDidMount() {
        mapboxgl.accessToken = accessToken;

        this.map = new mapboxgl.Map({
            container: this.mapBox, // container id
            style: 'mapbox://styles/mapbox/streets-v11', //hosted style id
            center: [-91.874, 42.760], // starting position
            zoom: 12 // starting zoom
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });

        this.map.addControl(draw);
 
        this.map.on('draw.create', () => this.updateArea(draw));
        this.map.on('draw.delete', () => this.updateArea(draw));
        this.map.on('draw.update', () => this.updateArea(draw));

        this.updateVehiclesList(this.props.vehicles);
    }

    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.vehicles && nextProps.vehicles !== this.props.vehicles) {
            this.updateVehiclesList(nextProps.vehicles);
        }

        if (nextProps.coords && nextProps.coords !== this.props.coords) {
            this.map.flyTo({center:[nextProps.coords.longitude, nextProps.coords.latitude]});
        }
    }

    updateVehiclesList = (vehicles: Array<Object>) => {
        const vehiclesList = (vehicles || []).map(vehicle => ({
            id: vehicle.vin,
            displayName: vehicle.plateName
        }))

        this.setState({
            vehiclesList
        })
    }

    updateArea = (draw: Object) => {
        this.props.change("selectedFeature", draw.getAll())
    }

    onSubmit = (values: Object) => {

        console.log('onSubmit: ', values);

    }

    render() {
        const { isFetching, serverError } = this.props;
        const { vehiclesList } = this.state;
        const geofenceType = ["Enter Geofence", "Exit Geofence", "Both Exit + Enter Geofence"]

        // console.log('vehiclesList: ', vehiclesList);

        return (
            <ErrorCatcher>
                <LoadingWrapper show={isFetching}>
                    {serverError && <SnackbarContent
                        message={serverError}
                        color="danger"
                        close
                    />}

                    <GridContainer justify="center" style={{ backgroundColor: "#ffffff" }}>
                        <GridItem xs={12} sm={6} md={3}>
                            <Field
                                labelText="* Geofence Name"
                                id="geofenceName"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    className: "geofenceInput"
                                }}
                                name="geofenceName"
                                component={ReduxInput}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Field
                                labelText="* Email where Geofence will be sent"
                                id="geofenceEmail"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    className: "geofenceInput"
                                }}
                                name="geofenceEmail"
                                component={ReduxInput}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Field
                                inputProps={{
                                    label: "* Geofence Type",
                                    options: geofenceType || [],
                                    className: "geofenceInput"
                                }}
                                name="geofenceType"
                                component={ReduxSelect}
                            />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={3}>
                            <Field
                                inputProps={{
                                    label: "* Select Vehicle",
                                    options: vehiclesList,
                                    className: "geofenceInput"
                                }}
                                name="vehicle"
                                component={ReduxSelect}
                            />
                        </GridItem>
                    </GridContainer>
                    
                    {/* Geofence map */}
                    <Card className="wrapped-card-class">
                        <CardHeader>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h5>Geofence Map</h5>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <div ref={el => this.mapBox = el} style={{ height: "300px" }} />
                            <br />
                        </CardBody>
                    </Card>
                </LoadingWrapper>
            </ErrorCatcher>
        );
    }
}