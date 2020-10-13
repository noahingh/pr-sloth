import * as actions from '../actions'

import {initState, queryBuilderReducer} from './queryBuilder'

test('buildQuery with initState', () => {
  const action = {
    type: actions.BUILD_QUERY,
  };

  var expected = {...initState};
  expected.q = 'type:pr is:open author:hanjunlee '

  expect(queryBuilderReducer(initState, action)).toEqual(expected);
})

test('searchBy', () => {
  const action = {
    type: actions.SEARCH_BY,
    searchBy: actions.searchByAssignee,
  };
  var expected = {...initState};
  expected.searchBy = actions.searchByAssignee;

  expect(queryBuilderReducer(initState, action)).toEqual(expected);
})
