/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_GEOFENCES, REGISTER_GEOFENCE, DELETE_GEOFENCE, UPDATE_GEOFENCE } from 'constants/actionTypes';
import { fetchGeofences, registerGeofence, deleteGeofence, updateGeofence } from 'actions/geofences';
import api from 'services/index';

import { toast } from "react-toastify";
import ToastrComponent from "components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to Geofences
function* watchGeofences() {
  while (true) {
    const { email, id } = yield take(FETCH_GEOFENCES.REQUEST);

    try {
      const { data } = yield call(api.fetchGeofences, { email, id });

      yield put(fetchGeofences.success(data));
      console.log('SAGA FETCH GEOFENCES SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.fetchGeofences.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH GEOFENCES ERR: ', err.message);
      yield put(fetchGeofences.failure(
        err.message
      ));
    }
  }
}

// Listen to Geofence delete
function* watchGeofenceDelete() {
  while (true) {
    const { id } = yield take(DELETE_GEOFENCE.REQUEST);

    try {
      const { data } = yield call(api.deleteGeofence, { id });

      yield put(deleteGeofence.success(id));
      console.log('SAGA DELETE GEOFENCE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.deleteGeofence.errorMessage'
        status='danger'
      />);
      console.log('SAGA DELETE GEOFENCE ERR: ', err.message);
      yield put(fetchGeofences.failure(
        err.message
      ));
    }
  }
}

// Listen to Register Geofence data
function* watchRegisterGeofenceData() {
  while (true) {
    const { userEmail, uid, vin, geofenceEmail, geofencePassword, zoneId } = yield take(REGISTER_GEOFENCE.REQUEST);

    try {
      const { data } = yield call(api.registerGeofence, { userEmail, uid, vin, geofenceEmail, geofencePassword, zoneId });

      yield put(registerGeofence.success(data));
      console.log('SAGA REGISTER GEOFENCE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.registerGeofence.errorMessage'
        status='danger'
      />);
      console.log('SAGA REGISTER Geofence ERR: ', err.message);
      yield put(registerGeofence.failure(
        err.message
      ));
    }
  }
}

// Listen to Update Geofence data
function* watchUpdateGeofenceData() {
  while (true) {
    const { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, geofenceEmail, geofencePassword, vin, zoneId } = yield take(UPDATE_GEOFENCE.REQUEST);

    try {
      const { data } = yield call(api.updateGeofence, { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, geofenceEmail, geofencePassword, vin, zoneId });

      yield put(updateGeofence.success({ id, make, model, modelYear, plateName, startOdometer, uid, userEmail, geofenceEmail, geofencePassword, vin, zoneId }));
      console.log('SAGA UPDATE GEOFENCE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.updateGeofence.errorMessage'
        status='danger'
      />);
      console.log('SAGA UPDATE GEOFENCE ERR: ', err.message);
      yield put(updateGeofence.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchGeofences),
  fork(watchGeofenceDelete),
  fork(watchRegisterGeofenceData),
  fork(watchUpdateGeofenceData),
];
