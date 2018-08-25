import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from 'reducers';
import rootSaga from 'sagas';

import persistMiddleware from './persister';
import getInitialState from './initial-state';

export const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  // Redux debug tool (source: https://github.com/zalmoxisus/redux-devtools-extension)
  const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  const store = createStore(
    rootReducer,
    getInitialState(),
    composeEnhancers(applyMiddleware(sagaMiddleware, persistMiddleware)),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
