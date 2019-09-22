/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_RECORDS, REGISTER_RECORD, DELETE_RECORD, UPDATE_RECORD } from 'constants/actionTypes';
import { fetchRecords, registerRecord, deleteRecord, updateRecord } from 'actions/records';
import api from 'services/index';

import { toast } from "react-toastify";
import ToastrComponent from "components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to Records
function* watchRecords() {
  while (true) {
    const { email, id } = yield take(FETCH_RECORDS.REQUEST);

    try {
      const { data } = yield call(api.fetchRecords, { email, id });

      yield put(fetchRecords.success(data));
      console.log('SAGA FETCH RECORDS SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.fetchRecords.errorMessage'
        status='danger'
      />);
      console.log('SAGA FETCH RECORDS ERR: ', err.message);
      yield put(fetchRecords.failure(
        err.message
      ));
    }
  }
}

// Listen to Record delete
function* watchRecordDelete() {
  while (true) {
    const { id } = yield take(DELETE_RECORD.REQUEST);

    try {
      const { data } = yield call(api.deleteRecord, { id });

      yield put(deleteRecord.success(id));
      console.log('SAGA DELETE RECORD SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.deleteRecord.errorMessage'
        status='danger'
      />);
      console.log('SAGA DELETE RECORD ERR: ', err.message);
      yield put(fetchRecords.failure(
        err.message
      ));
    }
  }
}

// Listen to Register Record data
function* watchRegisterRecordData() {
  while (true) {
    const { userEmail, uid, vin, recordEmail, recordPassword, zoneId } = yield take(REGISTER_RECORD.REQUEST);

    try {
      const { data } = yield call(api.registerRecord, { userEmail, uid, vin, recordEmail, recordPassword, zoneId });

      yield put(registerRecord.success(data));
      console.log('SAGA REGISTER RECORD SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.registerRecord.errorMessage'
        status='danger'
      />);
      console.log('SAGA REGISTER Record ERR: ', err.message);
      yield put(registerRecord.failure(
        err.message
      ));
    }
  }
}

// Listen to Update Record data
function* watchUpdateRecordData() {
  while (true) {
    const { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, recordEmail, recordPassword, vin, zoneId } = yield take(UPDATE_RECORD.REQUEST);

    try {
      const { data } = yield call(api.updateRecord, { id, make, model, modelYear, plateName, startOdometer, uid, userEmail, recordEmail, recordPassword, vin, zoneId });

      yield put(updateRecord.success({ id, make, model, modelYear, plateName, startOdometer, uid, userEmail, recordEmail, recordPassword, vin, zoneId }));
      console.log('SAGA UPDATE RECORD SUCCESS: ', data);
    } catch (err) {
      toast.error(<ToastrComponent
        message='auth.updateRecord.errorMessage'
        status='danger'
      />);
      console.log('SAGA UPDATE RECORD ERR: ', err.message);
      yield put(updateRecord.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchRecords),
  fork(watchRecordDelete),
  fork(watchRegisterRecordData),
  fork(watchUpdateRecordData),
];
