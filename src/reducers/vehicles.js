import {
  FETCH_VEHICLES, FETCH_VEHICLE, FETCH_VEHICLE_MONTHLY_DATA, FETCH_VEHICLE_HOURLY_DATA,
  REGISTER_VEHICLE, DELETE_VEHICLE, SET_INITIAL_REGISTER_VEHICLE, UPDATE_VEHICLE
} from 'constants/actionTypes';

const initialState = {
  // fetch vehicles status
  vehiclesRequest: false,
  data: null,
  vehiclesError: null,
  // fetch active vehicle status
  vehicleRequest: false,
  activeVehicle: null,
  vehicleError: null,
  // delete vehicle status
  deleteRequest: false,
  deleteSuccess: null,
  deleteError: null,
  // Vehicle datas
  hourlyRequest: false,
  hourlyVehicleData: null,
  hourlyError: null,
  // Vehicle datas
  monthlyRequest: false,
  monthlyVehicleData: null,
  monthlyError: null,
  // add vehicle status
  registerVehicleRequest: false,
  registerVehicleData: null,
  registerVehicleError: null,

  // update vehicle status
  updateVehicleRequest: false,
  updateVehicleData: null,
  updateVehicleError: null,

  // for form
  initialVehicleRegistration: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    // Fetch Vehicles
    case FETCH_VEHICLES.REQUEST:
      return Object.assign({}, state, {
        vehiclesRequest: true,
        data: null,
        vehiclesError: null
      });
    case FETCH_VEHICLES.SUCCESS:
      return Object.assign({}, state, {
        vehiclesRequest: false,
        data: action.response,
        vehiclesError: null
      });
    case FETCH_VEHICLES.FAILURE:
      return Object.assign({}, state, {
        vehiclesRequest: false,
        data: null,
        vehiclesError: action.error
      });

    // Fetch Vehicle
    case FETCH_VEHICLE.REQUEST:
      return Object.assign({}, state, {
        vehicleRequest: true,
        activeVehicle: null,
        vehicleError: null
      });
    case FETCH_VEHICLE.SUCCESS:
      return Object.assign({}, state, {
        vehicleRequest: false,
        activeVehicle: action.response,
        vehicleError: null
      });
    case FETCH_VEHICLE.FAILURE:
      return Object.assign({}, state, {
        vehicleRequest: false,
        activeVehicle: null,
        vehicleError: action.error
      });

    // Delete Vehicle
    case DELETE_VEHICLE.REQUEST:
      return Object.assign({}, state, {
        deleteRequest: true,
        deleteSuccess: null,
        deleteError: null
      });
    case DELETE_VEHICLE.SUCCESS:
      const newVehiclesList = state.data.filter(vehicle => vehicle.id !== action.response);

      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: action.response,
        data: newVehiclesList,
        deleteError: null
      });
    case DELETE_VEHICLE.FAILURE:
      return Object.assign({}, state, {
        deleteRequest: false,
        deleteSuccess: null,
        deleteError: action.error
      });

    // Fetch Vehicle's Hourly data
    case FETCH_VEHICLE_HOURLY_DATA.REQUEST:
      return Object.assign({}, state, {
        hourlyRequest: true,
        hourlyVehicleData: null,
        hourlyError: null
      });
    case FETCH_VEHICLE_HOURLY_DATA.SUCCESS:
      return Object.assign({}, state, {
        hourlyRequest: false,
        hourlyVehicleData: action.response,
        hourlyError: null
      });
    case FETCH_VEHICLE_HOURLY_DATA.FAILURE:
      return Object.assign({}, state, {
        hourlyRequest: false,
        hourlyVehicleData: null,
        hourlyError: action.error
      });

    // Fetch Vehicle's Monthly data
    case FETCH_VEHICLE_MONTHLY_DATA.REQUEST:
      return Object.assign({}, state, {
        monthlyRequest: true,
        monthlyVehicleData: null,
        monthlyError: null
      });
    case FETCH_VEHICLE_MONTHLY_DATA.SUCCESS:
      return Object.assign({}, state, {
        monthlyRequest: false,
        monthlyVehicleData: action.response,
        monthlyError: null
      });
    case FETCH_VEHICLE_MONTHLY_DATA.FAILURE:
      return Object.assign({}, state, {
        monthlyRequest: false,
        monthlyVehicleData: null,
        monthlyError: action.error
      });

    // Register Vehicle data
    case REGISTER_VEHICLE.REQUEST:
      return Object.assign({}, state, {
        registerVehicleRequest: true,
        registerVehicleData: null,
        registerVehicleError: null
      });
    case REGISTER_VEHICLE.SUCCESS:
      const data = state.data.slice();

      data.push(action.response);

      return Object.assign({}, state, {
        registerVehicleRequest: false,
        registerVehicleData: action.response,
        registerVehicleError: null,
        data
      });
    case REGISTER_VEHICLE.FAILURE:
      return Object.assign({}, state, {
        registerVehicleRequest: false,
        registerVehicleData: null,
        registerVehicleError: action.error
      });

    // Update Vehicle data
    case UPDATE_VEHICLE.REQUEST:
      return Object.assign({}, state, {
        updateVehicleRequest: true,
        updateVehicleData: null,
        updateVehicleError: null
      });
    case UPDATE_VEHICLE.SUCCESS:
      const updatedData = state.data.map(vehicle => 
        (vehicle.id === action.response.id) ? action.response : vehicle
      );

      return Object.assign({}, state, {
        updateVehicleRequest: false,
        updateVehicleData: true,
        updateVehicleError: null,
        data: updatedData
      });
    case UPDATE_VEHICLE.FAILURE:
      return Object.assign({}, state, {
        updateVehicleRequest: false,
        updateVehicleData: null,
        updateVehicleError: action.error
      });



    case SET_INITIAL_REGISTER_VEHICLE:
      return Object.assign({}, state, {
        initialVehicleRegistration: action.vin ? action : null
      });

    default:
      return state;
  }
}
