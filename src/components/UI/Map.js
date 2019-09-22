import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MapComponent = (props) => (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 25.10629, lng: 55.18594 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
        {props.children || <Marker position={{ lat: -34.397, lng: 150.644 }} />}
    </GoogleMap>
);

export default withScriptjs(withGoogleMap(MapComponent));