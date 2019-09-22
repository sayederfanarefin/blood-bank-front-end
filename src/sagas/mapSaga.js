/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_MAP_DATA } from 'constants/actionTypes';
import { fetchMap } from 'actions/map';
import api from 'services/index';

import { toast } from "react-toastify";
import Toastr from "components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to Map
function* watchMap() {
  while (true) {
    const { vin, date } = yield take(FETCH_MAP_DATA.REQUEST);

    console.log('{ vin, date } : ', { vin, date } )

    try {
      const { data } = yield call(api.fetchMap, { vin, date });

      yield put(fetchMap.success(data));
      console.log('SAGA FETCH MAP SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.fetchMap.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH MAP ERR: ', err.message);
      yield put(fetchMap.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchMap)
]