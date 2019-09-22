function createRequestTypes(base) {
  const res = {};
  //eslint-disable-next-line
  ['REQUEST', 'SUCCESS', 'FAILURE', 'RESET'].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

// Auth
export const AUTH_LOGIN = createRequestTypes('AUTH_LOGIN');
export const AUTH_FORGOT_PASSWORD = createRequestTypes('AUTH_FORGOT_PASSWORD');
export const AUTH_UPDATE_PASSWORD = createRequestTypes('AUTH_UPDATE_PASSWORD');
export const AUTH_REGISTER = createRequestTypes('AUTH_REGISTER');
export const AUTH_LOGOUT = createRequestTypes('AUTH_LOGOUT');

// Dashboard
export const FETCH_DASHBOARD = createRequestTypes('FETCH_DASHBOARD');
export const FETCH_HISTOGRAM = createRequestTypes('FETCH_HISTOGRAM');
export const FETCH_TIMEZONE_LIST = createRequestTypes('FETCH_TIMEZONE_LIST');
export const FETCH_SOC_24_HOURS = createRequestTypes('FETCH_SOC_24_HOURS');

// Vehicles
export const FETCH_VEHICLES = createRequestTypes('FETCH_VEHICLES');
export const FETCH_VEHICLE = createRequestTypes('FETCH_VEHICLE');
export const REGISTER_VEHICLE = createRequestTypes('REGISTER_VEHICLE');
export const UPDATE_VEHICLE = createRequestTypes('UPDATE_VEHICLE');
export const DELETE_VEHICLE = createRequestTypes('DELETE_VEHICLE');
export const SET_INITIAL_REGISTER_VEHICLE = 'SET_INITIAL_REGISTER_VEHICLE';
export const FETCH_VEHICLE_HOURLY_DATA = createRequestTypes('FETCH_VEHICLE_HOURLY_DATA');
export const FETCH_VEHICLE_DAILY_DATA = createRequestTypes('FETCH_VEHICLE_DAILY_DATA');
export const FETCH_VEHICLE_WEEKLY_DATA = createRequestTypes('FETCH_VEHICLE_WEEKLY_DATA');
export const FETCH_VEHICLE_MONTHLY_DATA = createRequestTypes('FETCH_VEHICLE_MONTHLY_DATA');

// Geofences
export const FETCH_GEOFENCES = createRequestTypes('FETCH_GEOFENCES');
export const FETCH_GEOFENCE = createRequestTypes('FETCH_GEOFENCE');
export const REGISTER_GEOFENCE = createRequestTypes('REGISTER_GEOFENCE');
export const UPDATE_GEOFENCE = createRequestTypes('UPDATE_GEOFENCE');
export const DELETE_GEOFENCE = createRequestTypes('DELETE_GEOFENCE');
export const SET_INITIAL_REGISTER_GEOFENCE = 'SET_INITIAL_REGISTER_GEOFENCE';

// Records
export const FETCH_RECORDS = createRequestTypes('FETCH_RECORDS');
export const FETCH_RECORD = createRequestTypes('FETCH_RECORD');
export const REGISTER_RECORD = createRequestTypes('REGISTER_RECORD');
export const UPDATE_RECORD = createRequestTypes('UPDATE_RECORD');
export const DELETE_RECORD = createRequestTypes('DELETE_RECORD');
export const SET_INITIAL_REGISTER_RECORD = 'SET_INITIAL_REGISTER_RECORD';

// User 
export const USER_CREATE = createRequestTypes('USER_CREATE');
export const USER_GET = createRequestTypes('USER_GET');
export const USER_UPDATE = createRequestTypes('USER_UPDATE');

// Fetch map data
export const FETCH_MAP_DATA = createRequestTypes('FETCH_MAP_DATA');

// PAYMENT
export const PAYMENT = createRequestTypes('PAYMENT');
