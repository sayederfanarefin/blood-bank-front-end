/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import {
  // USER_CREATE,
  USER_GET, USER_UPDATE, PAYMENT } from '../constants/actionTypes';
import {
  // createUser,
  getUser, updateUser, payment } from 'actions/user';
import api from 'services/index';

import { toast } from "react-toastify";
import Toastr from "../components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to create user
// function* watchCreateUser() {
//   while (true) {
//     const { firstName, age, gender, profilePictureUrl, numberOfCars, useOfCar, userId } = yield take(USER_CREATE.REQUEST);
//     const userData = { firstName, age, gender, profilePictureUrl, numberOfCars, useOfCar, userId };
//     console.log('non auth watchCreateUser userData: ', userData);

//     try {
//       const { data } = yield call(api.createUser, userData);

//       localStorage.setItem('user', JSON.stringify(userData));

//       yield put(createUser.success(userData));
//       console.log('SAGA CREATE USER SUCCESS: ', data);
//     } catch (err) {
//       toast.error(<Toastr
//         message='auth.createUser.errorMessage'
//         status='danger'
//       />);
//       console.log('SAGA CREATE USER ERR: ', err.message);
//       yield put(createUser.failure(
//         err.message
//       ));
//     }
//   }
// }

// Listen to get user
function* watchGetUser() {
  while (true) {
    const { userId } = yield take(USER_GET.REQUEST);

    try {
      const { data } = yield call(api.getUser, { id: userId });

      localStorage.setItem('user', JSON.stringify(data));

      yield put(getUser.success(data));
      console.log('SAGA GET USER SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.getUser.errorMessage'
        status='danger'
      />);
      console.log('SAGA GET USER ERR: ', err.message);
      yield put(getUser.failure(
        err.message
      ));
    }
  }
}

// Listen to update user
function* watchUpdateUser() {
  while (true) {
    const { userId, firstName, employeeId, email, phoneNumber, distanceUnit, zoneId, currency } = yield take(USER_UPDATE.REQUEST);
    const updatedData = { userId, firstName, employeeId, email, phoneNumber, distanceUnit, zoneId, currency };

    try {
      const { data } = yield call(api.updateUser, updatedData);

      localStorage.setItem('user', JSON.stringify(updatedData));

      yield put(updateUser.success(updatedData));
      console.log('SAGA UPDATE USER SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.updateUser.errorMessage'
        status='danger'
      />);
      console.log('SAGA UPDATE USER ERR: ', err.message);
      yield put(updateUser.failure(
        err.message
      ));
    }
  }
}

// Listen to payment
function* watchPayment() {
  while (true) {
    const { token, amount, currency, description } = yield take(PAYMENT.REQUEST);

    try {
      const { data } = yield call(api.payment, { token, amount, currency, description });

      if (!data) {
        yield put(payment.failure("Card info is not correct."));
      }
      else {
        yield put(payment.success(data));
      }

      console.log('SAGA PAYMENT SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.payment.errorMessage'
        status='danger'
      />);
      console.log('SAGA PAYMENT ERR: ', err.message);
      yield put(payment.failure(
        err.message
      ));
    }
  }
}

export default [
  // fork(watchCreateUser),
  fork(watchGetUser),
  fork(watchUpdateUser),
  fork(watchPayment)
];
