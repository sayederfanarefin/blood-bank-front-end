import {
  FETCH_GEOFENCES, FETCH_GEOFENCE, REGISTER_GEOFENCE,
  DELETE_GEOFENCE, SET_INITIAL_REGISTER_GEOFENCE, UPDATE_GEOFENCE
} from 'constants/actionTypes';

const initialState = {
  // fetch Geofences status
  geofencesRequest: false,
  data: null,
  geofencesError: null,
  // fetch active Geofence status
  geofenceRequest: false,
  activeGeofence: null,
  geofenceError: null,
  // delete Geofence status
  deleteRequest: false,
  deleteSuccess: null,
  deleteError: null,
  // add Geofence status
  registerGeofenceRequest: false,
  registerGeofenceData: null,
  registerGeofenceError: null,

  // update Geofence status
  updateGeofenceRequest: false,
  updateGeofenceData: null,
  updateGeofenceError: null,

  // for form
  initialGeofenceRegistration: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    // Fetch Geofences
    case FETCH_GEOFENCES.REQUEST:
      return Object.assign({}, state, {
        geofencesRequest: true,
        data: null,
        geofencesError: null
      });
    case FETCH_GEOFENCES.SUCCESS:
      return Object.assign({}, state, {
        geofencesRequest: false,
        data: action.response,
        geofencesError: null
      });
    case FETCH_GEOFENCES.FAILURE:
      return Object.assign({}, state, {
        geofencesRequest: false,
        data: null,
        geofencesError: action.error
      });

    // Fetch Geofence
    case FETCH_GEOFENCE.REQUEST:
      return Object.assign({}, state, {
        geofenceRequest: true,
        activeGeofence: null,
        geofenceError: null
      });
    case FETCH_GEOFENCE.SUCCESS:
      return Object.assign({}, state, {
        geofenceRequest: false,
        activeGeofence: action.response,
        geofenceError: null
      });
    case FETCH_GEOFENCE.FAILURE:
      return Object.assign({}, state, {
        geofenceRequest: false,
        activeGeofence: null,
        geofenceError: action.error
      });

    // Delete Geofence
    case DELETE_GEOFENCE.REQUEST:
      return Object.assign({}, state, {
        deleteRequest: true,
        deleteSuccess: null,
        deleteError: null
      });
    case DELETE_GEOFENCE.SUCCESS:
      const newGeofencesList = state.data.filter(geofence => geofence.id !== action.response);

      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: action.response,
        data: newGeofencesList,
        deleteError: null
      });
    case DELETE_GEOFENCE.FAILURE:
      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: null,
        deleteError: action.error
      });

    // Register Geofence data
    case REGISTER_GEOFENCE.REQUEST:
      return Object.assign({}, state, {
        registerGeofenceRequest: true,
        registerGeofenceData: null,
        registerGeofenceError: null
      });
    case REGISTER_GEOFENCE.SUCCESS:
      const data = state.data.slice();

      data.push(action.response);

      return Object.assign({}, state, {
        registerGeofenceRequest: false,
        registerGeofenceData: action.response,
        registerGeofenceError: null,
        data
      });
    case REGISTER_GEOFENCE.FAILURE:
      return Object.assign({}, state, {
        registerGeofenceRequest: false,
        registerGeofenceData: null,
        registerGeofenceError: action.error
      });

    // Update Geofence data
    case UPDATE_GEOFENCE.REQUEST:
      return Object.assign({}, state, {
        updateGeofenceRequest: true,
        updateGeofenceData: null,
        updateGeofenceError: null
      });
    case UPDATE_GEOFENCE.SUCCESS:
      const updatedData = state.data.map(geofence => 
        (geofence.id === action.response.id) ? action.response : geofence
      );

      return Object.assign({}, state, {
        updateGeofenceRequest: false,
        updateGeofenceData: true,
        updateGeofenceError: null,
        data: updatedData
      });
    case UPDATE_GEOFENCE.FAILURE:
      return Object.assign({}, state, {
        updateGeofenceRequest: false,
        updateGeofenceData: null,
        updateGeofenceError: action.error
      });

    // initial value for redux-form
    case SET_INITIAL_REGISTER_GEOFENCE:
      return Object.assign({}, state, {
        initialGeofenceRegistration: action.name ? action : null
      });

    default:
      return state;
  }
}
