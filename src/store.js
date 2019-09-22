import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = process.env.NODE_ENV === 'production' ? applyMiddleware(sagaMiddleware) : composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

// mount it on the Store
const store = createStore(
  reducer,
  middleware
)

// then run the saga
sagaMiddleware.run(mySaga)

export default store;
