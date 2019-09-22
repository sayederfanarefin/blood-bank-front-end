import { action } from './index';
import {
  USER_CREATE, USER_UPDATE, USER_GET, PAYMENT
} from 'constants/actionTypes';


export const createUser = {
  request: (params) => action(USER_CREATE.REQUEST, params),
  success: (response) => action(USER_CREATE.SUCCESS, { response }),
  failure: (error) => action(USER_CREATE.FAILURE, { error })
};

export const getUser = {
  request: (params) => action(USER_GET.REQUEST, params),
  success: (response) => action(USER_GET.SUCCESS, { response }),
  failure: (error) => action(USER_GET.FAILURE, { error })
};

export const updateUser = {
  request: (params) => action(USER_UPDATE.REQUEST, params),
  success: (response) => action(USER_UPDATE.SUCCESS, { response }),
  failure: (error) => action(USER_UPDATE.FAILURE, { error }),
  reset: () => action(USER_UPDATE.RESET)
};

export const payment = {
  request: (params) => action(PAYMENT.REQUEST, params),
  success: (response) => action(PAYMENT.SUCCESS, { response }),
  failure: (error) => action(PAYMENT.FAILURE, { error })
};