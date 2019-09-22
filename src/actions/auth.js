import { action } from './index';
import {
  AUTH_LOGIN,
  AUTH_FORGOT_PASSWORD,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  AUTH_UPDATE_PASSWORD,
} from '../constants/actionTypes';


export const login = {
  request: (params) => action(AUTH_LOGIN.REQUEST, params),
  success: (response) => action(AUTH_LOGIN.SUCCESS, { response }),
  failure: (error) => action(AUTH_LOGIN.FAILURE, { error })
};

export const forgotPassword = {
  request: (params) => action(AUTH_FORGOT_PASSWORD.REQUEST, params),
  success: (response) => action(AUTH_FORGOT_PASSWORD.SUCCESS, { response }),
  failure: (error) => action(AUTH_FORGOT_PASSWORD.FAILURE, { error })
};

export const updatePassword = {
  request: (params) => action(AUTH_UPDATE_PASSWORD.REQUEST, params),
  success: (response) => action(AUTH_UPDATE_PASSWORD.SUCCESS, { response }),
  failure: (error) => action(AUTH_UPDATE_PASSWORD.FAILURE, { error })
};

export const register = {
  request: (params) => action(AUTH_REGISTER.REQUEST, params),
  success: (response) => action(AUTH_REGISTER.SUCCESS, { response }),
  failure: (error) => action(AUTH_REGISTER.FAILURE, { error })
};

export const logout = {
  request: () => action(AUTH_LOGOUT.REQUEST, {}),
  success: () => action(AUTH_LOGOUT.SUCCESS, {}),
  failure: (error) => action(AUTH_LOGOUT.FAILURE, { error })
};