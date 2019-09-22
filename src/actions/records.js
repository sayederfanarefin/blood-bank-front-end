import { action } from './index';
import {
  FETCH_RECORDS, FETCH_RECORD, REGISTER_RECORD, DELETE_RECORD,
  UPDATE_RECORD, SET_INITIAL_REGISTER_RECORD
} from '../constants/actionTypes';


export const fetchRecords = {
  request: (params) => action(FETCH_RECORDS.REQUEST, params),
  success: (response) => action(FETCH_RECORDS.SUCCESS, { response }),
  failure: (error) => action(FETCH_RECORDS.FAILURE, { error })
};

export const fetchRecord = {
  request: (params) => action(FETCH_RECORD.REQUEST, params),
  success: (response) => action(FETCH_RECORD.SUCCESS, { response }),
  failure: (error) => action(FETCH_RECORD.FAILURE, { error })
};

export const deleteRecord = {
  request: (params) => action(DELETE_RECORD.REQUEST, params),
  success: (response) => action(DELETE_RECORD.SUCCESS, { response }),
  failure: (error) => action(DELETE_RECORD.FAILURE, { error })
};

export const registerRecord = {
  request: (params) => action(REGISTER_RECORD.REQUEST, params),
  success: (response) => action(REGISTER_RECORD.SUCCESS, { response }),
  failure: (error) => action(REGISTER_RECORD.FAILURE, { error })
};

export const updateRecord = {
  request: (params) => action(UPDATE_RECORD.REQUEST, params),
  success: (response) => action(UPDATE_RECORD.SUCCESS, { response }),
  failure: (error) => action(UPDATE_RECORD.FAILURE, { error })
};

export const setRegisterRecordInitialValue = (params) => action(SET_INITIAL_REGISTER_RECORD, params);
