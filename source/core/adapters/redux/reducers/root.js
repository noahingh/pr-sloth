import {combineReducers} from 'redux';
import * as actions from '../actions';
import {pullRequestReducer} from './pullRequest';
import {queryBuilderReducer} from './queryBuilder';

const rootReducer = combineReducers({
  pullRequest: pullRequestReducer,
  queryBuilder: queryBuilderReducer,
});
