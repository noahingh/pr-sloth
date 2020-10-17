import {combineReducers} from 'redux';
import * as actions from '../actions';
import {listReducer} from './list';
import {searchReducer} from './search';

export const rootReducer = combineReducers({
  list: listReducer,
  search: searchReducer,
});
