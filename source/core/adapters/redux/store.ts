import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';

import * as signin from './signin';
import { pullsReducer } from './pulls/reducers';

const loggerMiddleware = createLogger()

const rootReducer = combineReducers({
  signin: signin.reducer,
  pulls: pullsReducer,
})

export function configureStore(preloadedState: any) {
  return createStore(
    rootReducer, preloadedState,
    applyMiddleware(thunkMiddleware, loggerMiddleware));
}
