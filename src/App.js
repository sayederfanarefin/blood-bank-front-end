// @flow
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import "assets/scss/material-dashboard-pro-react.scss";

import Routes from './routes';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
