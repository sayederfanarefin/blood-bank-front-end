import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_LOGOUT,
    AUTH_FORGOT_PASSWORD,
    AUTH_UPDATE_PASSWORD
  } from '../constants/actionTypes';
  
  const initialState = {
    // login status
    loginRequest: false,
    loginSuccess: false,
    loginError: null,
    // register status
    registerRequest: false,
    registerSuccess: localStorage.getItem('registerInfo') ? JSON.parse(localStorage.getItem('registerInfo')) : null,
    registerError: null,
    // register status
    forgotRequest: false,
    forgotSuccess: false,
    forgotError: null,
    // register status
    updatePasswordRequest: false,
    updatePasswordSuccess: false,
    updatePasswordError: null,
    // logout status
    logoutRequest: false,
    logoutSuccess: false,
    logoutError: null,
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
  
      // Login
      case AUTH_LOGIN.REQUEST:
        return Object.assign({}, state, {
          loginRequest: true,
          loginSuccess: false,
          loginError: null
        });
      case AUTH_LOGIN.SUCCESS:
        return Object.assign({}, state, {
          loginRequest: false,
          loginSuccess: true,
          loginError: null
        });
      case AUTH_LOGIN.FAILURE:
        return Object.assign({}, state, {
          loginRequest: false,
          loginSuccess: false,
          loginError: action.error
        });
  
      // Register
      case AUTH_REGISTER.REQUEST:
        return Object.assign({}, state, {
          registerRequest: true,
          registerSuccess: null,
          registerError: null
        });
      case AUTH_REGISTER.SUCCESS:
        return Object.assign({}, state, {
          registerRequest: false,
          registerSuccess: action.response,
          registerError: null
        });
      case AUTH_REGISTER.FAILURE:
        return Object.assign({}, state, {
          registerRequest: false,
          registerSuccess: null,
          registerError: action.error
        });
  
      // Forgot Password
      case AUTH_FORGOT_PASSWORD.REQUEST:
        return Object.assign({}, state, {
          forgotRequest: true,
          forgotSuccess: false,
          forgotError: null
        });
      case AUTH_FORGOT_PASSWORD.SUCCESS:
        return Object.assign({}, state, {
          forgotRequest: false,
          forgotSuccess: true,
          forgotError: null
        });
      case AUTH_FORGOT_PASSWORD.FAILURE:
        return Object.assign({}, state, {
          forgotRequest: false,
          forgotSuccess: false,
          forgotError: action.error
        });
  
      // update password status
      case AUTH_UPDATE_PASSWORD.REQUEST:
        return Object.assign({}, state, {
          updatePasswordRequest: true,
          updatePasswordSuccess: false,
          updatePasswordError: null
        });
      case AUTH_UPDATE_PASSWORD.SUCCESS:
        return Object.assign({}, state, {
          updatePasswordRequest: false,
          updatePasswordSuccess: true,
          updatePasswordError: null
        });
      case AUTH_UPDATE_PASSWORD.FAILURE:
        return Object.assign({}, state, {
          updatePasswordRequest: false,
          updatePasswordSuccess: false,
          updatePasswordError: action.error
        });
  
      // Logout status
      case AUTH_LOGOUT.REQUEST:
        return Object.assign({}, state, {
          logoutRequest: true,
          logoutSuccess: false,
          logoutError: null
        });
      case AUTH_LOGOUT.SUCCESS:
        return Object.assign({}, state, {
          logoutRequest: false,
          logoutSuccess: true,
          logoutError: null
        });
      case AUTH_LOGOUT.FAILURE:
        return Object.assign({}, state, {
          logoutRequest: false,
          logoutSuccess: false,
          logoutError: action.error
        });
  
      default:
        return state;
    }
  }
  