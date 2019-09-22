import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import user from './user';
import dashboard from './dashboard';
import vehicles from './vehicles';
import geofences from './geofences';
import records from './records';
import map from './map';

export default combineReducers({
  form,
  auth,
  dashboard,
  vehicles,
  user,
  geofences,
  records,
  map
});
