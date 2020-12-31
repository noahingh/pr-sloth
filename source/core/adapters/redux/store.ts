import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';

import * as pulls from './pulls';
import * as signin from './signin';

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
  signin: signin.reducer,
  pulls: pulls.reducer,
})

export function configureStore(preloadedState: any) {
  return createStore(
    rootReducer, preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware));
}
