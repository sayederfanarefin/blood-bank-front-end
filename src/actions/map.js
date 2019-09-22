import { action } from './index';
import {
  FETCH_MAP_DATA
} from '../constants/actionTypes';


export const fetchMap = {
  request: (params) => action(FETCH_MAP_DATA.REQUEST, params),
  success: (response) => action(FETCH_MAP_DATA.SUCCESS, { response }),
  failure: (error) => action(FETCH_MAP_DATA.FAILURE, { error })
};
