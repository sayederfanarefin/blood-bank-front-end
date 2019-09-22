import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { updateGeofenceValidation } from 'helpers/validation';
import { fetchMap } from 'actions/map';

import LoadingWrapper from 'components/LoadingWrapper';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";
import ReduxInput from 'components/Form/Field';
import ReduxSelect from 'components/Form/SelectField';

import ErrorCatcher from "components/ErrorCatcher";


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
@withRouter
export default class Record extends React.Component<Props, State> {
    state = {
        vehiclesList: []
    }

    componentWillReceiveProps(nextProps: Object) {
        if (nextProps.vehicles && nextProps.vehicles !== this.props.vehicles) {
            this.updateVehiclesList(nextProps.vehicles);
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
                        <GridItem md={12}>
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
                        <GridItem md={12}>
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
                        <GridItem md={12}>
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
                        <GridItem md={12}>
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
                </LoadingWrapper>
            </ErrorCatcher>
        );
    }
}