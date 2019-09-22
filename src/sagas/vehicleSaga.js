/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_VEHICLES, FETCH_VEHICLE_MONTHLY_DATA, FETCH_VEHICLE_HOURLY_DATA, REGISTER_VEHICLE, DELETE_VEHICLE, UPDATE_VEHICLE } from 'constants/actionTypes';
import { fetchVehicles, fetchVehicleMonthly, fetchVehicleHourly, registerVehicle, deleteVehicle, updateVehicle } from 'actions/vehicles';
import api from 'services/index';

import { toast } from "react-toastify";
import ToastrComponent from "components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to Vehicles
function* watchVehicles() {
  while (true) {
    const { email, id } = yield take(FETCH_VEHICLES.REQUEST);

    try {
      const { data } = yield call(api.fetchVehicles, { email, id });

      yield put(fetchVehicles.success(data));
      console.log('SAGA FETCH VEHICLES SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.fetchVehicles.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH VEHICLES ERR: ', err.message);
      yield put(fetchVehicles.failure(
        err.message
      ));
    }
  }
}

// Listen to Vehicle delete
function* watchVehicleDelete() {
  while (true) {
    const { id } = yield take(DELETE_VEHICLE.REQUEST);

    try {
      const { data } = yield call(api.deleteVehicle, { id });

      yield put(deleteVehicle.success(id));
      console.log('SAGA DELETE VEHICLE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.deleteVehicle.errorMessage'
        status='danger'
      />);
      console.log('SAGA DELETE VEHICLE ERR: ', err.message);
      yield put(fetchVehicles.failure(
        err.message
      ));
    }
  }
}

// Listen to Vehicle hourly data
function* watchVehicleHourlyData() {
  while (true) {
    const { vin, date, hours } = yield take(FETCH_VEHICLE_HOURLY_DATA.REQUEST);

    try {
      const { data } = yield call(api.fetchVehicleHourly, { vin, date, hours });

      yield put(fetchVehicleHourly.success(data));
      console.log('SAGA FETCH VEHICLE HOURLY DATA SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.fetchVehicleHourly.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH VEHICLE HOURLY DATA ERR: ', err.message);
      yield put(fetchVehicleHourly.failure(
        err.message
      ));
    }
  }
}

// Listen to Vehicle monthly data
function* watchVehicleMonthlyData() {
  while (true) {
    const { uid, vin } = yield take(FETCH_VEHICLE_MONTHLY_DATA.REQUEST);

    try {
      const { data } = yield call(api.fetchVehicleMonthly, { uid, vin });

      yield put(fetchVehicleMonthly.success(data));
      console.log('SAGA FETCH VEHICLE MONTHLY DATA SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.fetchVehicleMonthly.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH VEHICLE MONTHLY DATA ERR: ', err.message);
      yield put(fetchVehicleMonthly.failure(
        err.message
      ));
    }
  }
}

// Listen to Register Vehicle data
function* watchRegisterVehicleData() {
  while (true) {
    const { userEmail, uid, vin, vehicleEmail, vehiclePassword, zoneId } = yield take(REGISTER_VEHICLE.REQUEST);

    try {
      const { data } = yield call(api.registerVehicle, { userEmail, uid, vin, vehicleEmail, vehiclePassword, zoneId });

      yield put(registerVehicle.success(data));
      console.log('SAGA REGISTER VEHICLE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.registerVehicle.errorMessage'
        status='danger'
      />);
      console.log('SAGA REGISTER VEHICLE ERR: ', err.message);
      yield put(registerVehicle.failure(
        err.message
      ));
    }
  }
}

// Listen to Update Vehicle data
function* watchUpdateVehicleData() {
  while (true) {
    const { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, vehicleEmail, vehiclePassword, vin, zoneId } = yield take(UPDATE_VEHICLE.REQUEST);

    try {
      const { data } = yield call(api.updateVehicle, { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, vehicleEmail, vehiclePassword, vin, zoneId });

      yield put(updateVehicle.success({ id, make, model, modelYear, plateName, startOdometer, uid, userEmail, vehicleEmail, vehiclePassword, vin, zoneId }));
      console.log('SAGA UPDATE VEHICLE SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.updateVehicle.errorMessage'
        status='danger'
      />);
      console.log('SAGA UPDATE VEHICLE ERR: ', err.message);
      yield put(updateVehicle.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchVehicles),
  fork(watchVehicleDelete),
  fork(watchVehicleHourlyData),
  fork(watchVehicleMonthlyData),
  fork(watchRegisterVehicleData),
  fork(watchUpdateVehicleData),
];
