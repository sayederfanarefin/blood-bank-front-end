// @flow
import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
import history from './history';

import PrivateRoute from './private';

import Root from 'containers/Root';

// Public routes
import Login from 'containers/Auth/Login';
import Register from 'containers/Auth/Register';
import ForgotPassword from 'containers/Auth/ForgotPassword';
import CreateUser from 'containers/CreateUser';
import PrivacyPolicy from 'containers/PrivacyPolicy';


// Private routes
import Dashboard from 'containers/Dashboard';
import Histogram from 'containers/Histogram';
import VehiclesList from 'containers/Vehicles';
import AddVehicle from 'containers/AddVehicle';
import Trips from 'containers/Map/Trips';
import Heatmap from 'containers/Map/Heatmap';
import GeofenceList from 'containers/Map/GeofenceList';
import RecordsList from 'containers/RecordsList';
import GeneralSettings from 'containers/Settings/General';
import ChangePasswordSettings from 'containers/Settings/ChangePassword';
import PaymentSettings from 'containers/Settings/Payment';
import NotFound from 'containers/NotFound';

// @TODO: handle routing issue
const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/createUser' component={CreateUser} />
      <Route path='/forgotPassword' component={ForgotPassword} />
      <Route path='/privacy-policy' component={PrivacyPolicy} />

      {/** Private Routes */}
      <Root>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/dashboard/:vin' component={Dashboard} />
          <PrivateRoute path='/map/trips/:vin' component={Trips} />
          <PrivateRoute path='/map/heatmap/:vin' component={Heatmap} />
          <PrivateRoute path='/map/geofenceList' component={GeofenceList} />
          <PrivateRoute path='/addVehicle/:vin' component={AddVehicle} />
          <PrivateRoute path='/records' component={RecordsList} />
          <PrivateRoute path='/vehicles' component={VehiclesList} />
          <PrivateRoute path='/settings/general' component={GeneralSettings} />
          <PrivateRoute path='/settings/changePassword' component={ChangePasswordSettings} />
          <PrivateRoute path='/settings/payment' component={PaymentSettings} />
          <PrivateRoute path='/histogram' component={Histogram} />
    
          <PrivateRoute component={NotFound} />
        </Switch>
      </Root>
    </Switch>
  </Router>
)

export default Routes;

              // <Route path='/trips/:vin' component={Trips} />
              // <Route path='/trips/:vin' component={Trips} />