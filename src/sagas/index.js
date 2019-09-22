import { all } from 'redux-saga/effects';

// listeners
import watchAuth from './authSaga';
import watchDashboard from './dashboardSaga';
import watchVehicle from './vehicleSaga';
import watchGeofence from './geofenceSaga';
import watchRecord from './recordSaga';
import watchMap from './mapSaga';
import watchUser from './userSaga';

export default function* root() {
  yield all([
    ...watchAuth,
    ...watchDashboard,
    ...watchVehicle,
    ...watchMap,
    ...watchUser,
    ...watchGeofence,
    ...watchRecord,
  ]);
}
