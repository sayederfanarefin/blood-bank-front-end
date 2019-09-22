import { action } from './index';
import {
  FETCH_DASHBOARD, FETCH_HISTOGRAM, FETCH_TIMEZONE_LIST, FETCH_SOC_24_HOURS
} from '../constants/actionTypes';


export const fetchDashboard = {
  request: (params) => action(FETCH_DASHBOARD.REQUEST, params),
  success: (response) => action(FETCH_DASHBOARD.SUCCESS, { response }),
  failure: (error) => action(FETCH_DASHBOARD.FAILURE, { error })
};

export const fetchHistogram = {
  request: (params) => action(FETCH_HISTOGRAM.REQUEST, params),
  success: (response) => action(FETCH_HISTOGRAM.SUCCESS, { response }),
  failure: (error) => action(FETCH_HISTOGRAM.FAILURE, { error })
};

export const fetchTimeZoneList = {
  request: (params) => action(FETCH_TIMEZONE_LIST.REQUEST, params),
  success: (response) => action(FETCH_TIMEZONE_LIST.SUCCESS, { response }),
  failure: (error) => action(FETCH_TIMEZONE_LIST.FAILURE, { error })
};

export const fetch24hoursSOC = {
  request: (params) => action(FETCH_SOC_24_HOURS.REQUEST, params),
  success: (response) => action(FETCH_SOC_24_HOURS.SUCCESS, { response }),
  failure: (error) => action(FETCH_SOC_24_HOURS.FAILURE, { error })
};