import {
  FETCH_DASHBOARD, FETCH_HISTOGRAM, FETCH_TIMEZONE_LIST, FETCH_SOC_24_HOURS
} from '../constants/actionTypes';

const activeVehicle = localStorage.getItem("activeVehicle") ? JSON.parse(localStorage.getItem("activeVehicle")).vin : null;

const initialState = {
  // fetch dashboard status
  dashboardRequest: false,
  data: activeVehicle && localStorage.getItem(`dashboardData-${activeVehicle}`) ? JSON.parse(localStorage.getItem(`dashboardData-${activeVehicle}`)) : null,
  dashboardError: null,
  // fetch histogram status
  histogramRequest: false,
  histogramData: null,
  histogramError: null,
  // fetch timezone status
  timezoneListRequest: false,
  timezoneListData: null,
  timezoneListError: null,
  // fetch timezone status
  lastDaySOCRequest: false,
  lastDaySOCData: null,
  lastDaySOCError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {

    // Fetch Dashboard
    case FETCH_DASHBOARD.REQUEST:
      return Object.assign({}, state, {
        dashboardRequest: true,
        data: null,
        dashboardError: null
      });
    case FETCH_DASHBOARD.SUCCESS:
      return Object.assign({}, state, {
        dashboardRequest: false,
        data: action.response,
        dashboardError: null
      });
    case FETCH_DASHBOARD.FAILURE:
      return Object.assign({}, state, {
        dashboardRequest: false,
        data: null,
        dashboardError: action.error
      });

    // Fetch Dashboard
    case FETCH_HISTOGRAM.REQUEST:
      return Object.assign({}, state, {
        histogramRequest: true,
        histogramData: false,
        histogramError: null
      });
    case FETCH_HISTOGRAM.SUCCESS:
      return Object.assign({}, state, {
        histogramRequest: false,
        histogramData: action.response,
        histogramError: null
      });
    case FETCH_HISTOGRAM.FAILURE:
      return Object.assign({}, state, {
        histogramRequest: false,
        histogramData: false,
        histogramError: action.error
      });

    // Fetch timezone list
    case FETCH_TIMEZONE_LIST.REQUEST:
      return Object.assign({}, state, {
        timezoneListRequest: true,
        timezoneListData: false,
        timezoneListError: null
      });
    case FETCH_TIMEZONE_LIST.SUCCESS:
      return Object.assign({}, state, {
        timezoneListRequest: false,
        timezoneListData: action.response,
        timezoneListError: null
      });
    case FETCH_TIMEZONE_LIST.FAILURE:
      return Object.assign({}, state, {
        timezoneListRequest: false,
        timezoneListData: false,
        timezoneListError: action.error
      });

    // Fetch timezone list
    case FETCH_SOC_24_HOURS.REQUEST:
      return Object.assign({}, state, {
        lastDaySOCRequest: true,
        lastDaySOCData: false,
        lastDaySOCError: null
      });
    case FETCH_SOC_24_HOURS.SUCCESS:
      return Object.assign({}, state, {
        lastDaySOCRequest: false,
        lastDaySOCData: action.response,
        lastDaySOCError: null
      });
    case FETCH_SOC_24_HOURS.FAILURE:
      return Object.assign({}, state, {
        lastDaySOCRequest: false,
        lastDaySOCData: false,
        lastDaySOCError: action.error
      });

    default:
      return state;
  }
}
