import { action } from './index';
import {
  FETCH_VEHICLES, FETCH_VEHICLE, FETCH_VEHICLE_MONTHLY_DATA, FETCH_VEHICLE_HOURLY_DATA,
  REGISTER_VEHICLE, DELETE_VEHICLE, UPDATE_VEHICLE, SET_INITIAL_REGISTER_VEHICLE
} from '../constants/actionTypes';


export const fetchVehicles = {
  request: (params) => action(FETCH_VEHICLES.REQUEST, params),
  success: (response) => action(FETCH_VEHICLES.SUCCESS, { response }),
  failure: (error) => action(FETCH_VEHICLES.FAILURE, { error })
};

export const fetchVehicle = {
  request: (params) => action(FETCH_VEHICLE.REQUEST, params),
  success: (response) => action(FETCH_VEHICLE.SUCCESS, { response }),
  failure: (error) => action(FETCH_VEHICLE.FAILURE, { error })
};

export const deleteVehicle = {
  request: (params) => action(DELETE_VEHICLE.REQUEST, params),
  success: (response) => action(DELETE_VEHICLE.SUCCESS, { response }),
  failure: (error) => action(DELETE_VEHICLE.FAILURE, { error })
};

export const registerVehicle = {
  request: (params) => action(REGISTER_VEHICLE.REQUEST, params),
  success: (response) => action(REGISTER_VEHICLE.SUCCESS, { response }),
  failure: (error) => action(REGISTER_VEHICLE.FAILURE, { error })
};

export const updateVehicle = {
  request: (params) => action(UPDATE_VEHICLE.REQUEST, params),
  success: (response) => action(UPDATE_VEHICLE.SUCCESS, { response }),
  failure: (error) => action(UPDATE_VEHICLE.FAILURE, { error })
};

export const setRegisterVehicleInitialValue = (params) => action(SET_INITIAL_REGISTER_VEHICLE, params);


export const fetchVehicleMonthly = {
  request: (params) => action(FETCH_VEHICLE_MONTHLY_DATA.REQUEST, params),
  success: (response) => action(FETCH_VEHICLE_MONTHLY_DATA.SUCCESS, { response }),
  failure: (error) => action(FETCH_VEHICLE_MONTHLY_DATA.FAILURE, { error })
};

export const fetchVehicleHourly = {
  request: (params) => action(FETCH_VEHICLE_HOURLY_DATA.REQUEST, params),
  success: (response) => action(FETCH_VEHICLE_HOURLY_DATA.SUCCESS, { response }),
  failure: (error) => action(FETCH_VEHICLE_HOURLY_DATA.FAILURE, { error })
};
