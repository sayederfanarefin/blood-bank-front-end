import { action } from './index';
import {
  FETCH_GEOFENCES, FETCH_GEOFENCE, REGISTER_GEOFENCE, DELETE_GEOFENCE,
  UPDATE_GEOFENCE, SET_INITIAL_REGISTER_GEOFENCE
} from '../constants/actionTypes';


export const fetchGeofences = {
  request: (params) => action(FETCH_GEOFENCES.REQUEST, params),
  success: (response) => action(FETCH_GEOFENCES.SUCCESS, { response }),
  failure: (error) => action(FETCH_GEOFENCES.FAILURE, { error })
};

export const fetchGeofence = {
  request: (params) => action(FETCH_GEOFENCE.REQUEST, params),
  success: (response) => action(FETCH_GEOFENCE.SUCCESS, { response }),
  failure: (error) => action(FETCH_GEOFENCE.FAILURE, { error })
};

export const deleteGeofence = {
  request: (params) => action(DELETE_GEOFENCE.REQUEST, params),
  success: (response) => action(DELETE_GEOFENCE.SUCCESS, { response }),
  failure: (error) => action(DELETE_GEOFENCE.FAILURE, { error })
};

export const registerGeofence = {
  request: (params) => action(REGISTER_GEOFENCE.REQUEST, params),
  success: (response) => action(REGISTER_GEOFENCE.SUCCESS, { response }),
  failure: (error) => action(REGISTER_GEOFENCE.FAILURE, { error })
};

export const updateGeofence = {
  request: (params) => action(UPDATE_GEOFENCE.REQUEST, params),
  success: (response) => action(UPDATE_GEOFENCE.SUCCESS, { response }),
  failure: (error) => action(UPDATE_GEOFENCE.FAILURE, { error })
};

export const setRegisterGeofenceInitialValue = (params) => action(SET_INITIAL_REGISTER_GEOFENCE, params);
