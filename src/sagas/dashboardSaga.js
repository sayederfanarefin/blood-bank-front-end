/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_DASHBOARD, FETCH_HISTOGRAM, FETCH_TIMEZONE_LIST, FETCH_SOC_24_HOURS } from 'constants/actionTypes';
import { fetchDashboard, fetchHistogram, fetchTimeZoneList, fetch24hoursSOC } from 'actions/dashboard';
import api from '../services/index';

import { toast } from "react-toastify";
import Toastr from "../components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to Dashboard
function* watchDashboard() {
  while (true) {
    const { uid, vin } = yield take(FETCH_DASHBOARD.REQUEST);

    try {
      const { data } = yield call(api.fetchDashboard, { uid, vin });
      
      localStorage.setItem("activeVehicle", JSON.stringify({ vin }));
      if (data) {
        if (vin !== "") {
          localStorage.setItem(`dashboardData-${vin}`, JSON.stringify(data));
        }
      }
      

      yield put(fetchDashboard.success(data));
      console.log('SAGA FETCH DASHBOARD SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.fetchDashboard.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH DASHBOARD ERR: ', err.message);
      yield put(fetchDashboard.failure(
        err.message
      ));
    }
  }
}

// Listen to Fetching Histogram
function* watchFetchHistogram() {
  while (true) {
    const { carType, modelYear, make } = yield take(FETCH_HISTOGRAM.REQUEST);

    try {
      const { data } = yield call(api.fetchHistogram, { params: {carType, modelYear, make} });

      yield put(fetchHistogram.success(data));
      console.log('SAGA FETCH HISTOGRAM SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.fetchHistogram.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH HISTOGRAM ERR: ', err.message);
      yield put(fetchHistogram.failure(
        err.message
      ));
    }
  }
}

// Listen to Fetching Timezone
function* watchFetchTimezoneList() {
  while (true) {
    yield take(FETCH_TIMEZONE_LIST.REQUEST);

    try {
      const { data } = yield call(api.fetchTimeZoneList);

      yield put(fetchTimeZoneList.success(data));
      console.log('SAGA FETCH TIMEZONE LIST SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.fetchTimeZoneList.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH TIMEZONE LIST ERR: ', err.message);
      yield put(fetchTimeZoneList.failure(
        err.message
      ));
    }
  }
}

// Listen to Fetching Timezone
function* watchFetchLast24Hours() {
  while (true) {
    const { vin } = yield take(FETCH_SOC_24_HOURS.REQUEST);

    try {
      const { data } = yield call(api.fetch24HoursSOC, { vin });

      yield put(fetch24hoursSOC.success(data));
      console.log('SAGA FETCH 24 HOURS SOC SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.fetch24hoursSOC.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH 24 HOURS SOC ERR: ', err.message);
      yield put(fetch24hoursSOC.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchDashboard),
  fork(watchFetchHistogram),
  fork(watchFetchTimezoneList),
  fork(watchFetchLast24Hours),
];
