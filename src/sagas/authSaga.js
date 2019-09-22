/* eslint-disable no-constant-condition */
import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import history from 'routes/history';
import { AUTH_LOGIN, AUTH_REGISTER, AUTH_LOGOUT, USER_CREATE, AUTH_FORGOT_PASSWORD, AUTH_UPDATE_PASSWORD } from '../constants/actionTypes';
import { login, register, forgotPassword, logout, updatePassword } from 'actions/auth';
import { createUser } from 'actions/user';
import api from 'services/index';

import { toast } from "react-toastify";
import Toastr from "../components/UI/Toastr";


/**
 ***********************************************************
 ************************ Watchers *************************
 ***********************************************************
 **/

// Listen to register
function* watchRegister() {
  while (true) {
    const { email, firstName, password } = yield take(AUTH_REGISTER.REQUEST);

    try {
      const data = yield call(api.register, { email, password });

      api.updateTokenKey(data.token);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem("registerInfo", JSON.stringify({ email, firstName }))

      yield put(register.success(data));
      console.log('SAGA REGISTER SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.register.errorMessage'
        status='danger'
      />);
      console.log('SAGA REGISTER ERR: ', err.message);
      yield put(register.failure(
        err.message
      ));
    }
  }
}

// Listen to login
function* watchLogin() {
  while (true) {
    const { email, password, service } = yield take(AUTH_LOGIN.REQUEST);

    try {
      const data = yield call(api.login, { email, password, service });

      api.updateTokenKey(data.token);
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      yield put(login.success(data.user));
      yield call(history.push, `/dashboard`);

      console.log('SAGA LOGIN SUCCESS TOKEN: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.login.errorMessage'
        status='danger'
      />);
      console.log('SAGA LOGIN ERROR TOKEN: ', err);
      yield put(login.failure(
        err.message
      ));
    }
  }
}

// Listen to create user
function* watchCreateUser() {
  while (true) {
    const { email, firstName, age, sex, avatar, numberOfCars, useOfCar, userId, phoneNumber, carUse, companyName, employeeId, distanceUnit, zoneId, currency, profilePictureUrl } = yield take(USER_CREATE.REQUEST);
    const userData = { email, firstName, age, sex, avatar, numberOfCars, useOfCar, userId, phoneNumber, carUse, companyName, employeeId, distanceUnit, zoneId, currency, profilePictureUrl };

    console.log('watchCreateUser userData: ', userData);

    try {
      const { data } = yield call(api.createUser, userData);

      localStorage.setItem('user', JSON.stringify(userData));

      // yield put(createUser.success(userData));

      console.log('SAGA CREATE USER SUCCESS: ', data);
    } catch (err) {
      toast.error(<Toastr
        message='auth.createUser.errorMessage'
        status='danger'
      />);
      console.log('SAGA CREATE USER ERR: ', err.message);
      yield put(createUser.failure(
        err.message
      ));
    }
  }
}

// Listen to forgot password
function* watchForgotPassword() {
  while (true) {
    const { email } = yield take(AUTH_FORGOT_PASSWORD.REQUEST);

    try {
      const response = yield call(api.forgotPassword, { email });

      yield put(forgotPassword.success());
      console.log('SAGA FORGOT PASSWORD SUCCESS: ', response);
    } catch (err) {
      toast.error(<Toastr
        message='auth.forgotPassword.errorMessage'
        status='danger'
      />);
      console.log('SAGA FORGOT PASSWORD ERR: ', err.message);
      yield put(forgotPassword.failure(
        err.message
      ));
    }
  }
}

// Listen to update password
function* watchUpdatePassword() {
  while (true) {
    const { oldPassword, newPassword } = yield take(AUTH_UPDATE_PASSWORD.REQUEST);

    console.log('watchUpdatePassword SAGA: ', { oldPassword, newPassword })

    try {
      const response = yield call(api.updatePassword, { newPassword, oldPassword });

      yield put(updatePassword.success());
      console.log('SAGA UPDATE PASSWORD SUCCESS: ', response);
    } catch (err) {
      toast.error(<Toastr
        message='auth.updatePassword.errorMessage'
        status='danger'
      />);
      console.log('SAGA UPDATE PASSWORD ERR: ', err.message);
      yield put(updatePassword.failure(
        err.message
      ));
    }
  }
}

// Listen to logout
function* watchLogout() {
  while (true) {
    yield take(AUTH_LOGOUT.REQUEST);

    try {
      yield call(api.logout);

      localStorage.clear();
      api.updateProxy('/api');

      yield put(logout.success());
      yield call(history.push, `/login`);
      console.log('SAGA LOGOUT SUCCESS');
    } catch (err) {
      toast.error(<Toastr
        message='auth.logout.errorMessage'
        status='danger'
      />);
      console.log('SAGA LOGOUT ERR: ', err);
      yield put(logout.failure(
        err.message
      ));
    }
  }
}

export default [
  fork(watchLogout),
  fork(watchLogin),
  fork(watchRegister),
  fork(watchCreateUser),
  fork(watchForgotPassword),
  fork(watchUpdatePassword)
];
