import * as actions from '../actions'

import {initState, searchReducer} from './search'

test('buildQuery with initState', () => {
  const action = {
    type: actions.BUILD_QUERY,
  };

  var expected = {...initState};
  expected.q = 'type:pr is:open author:hanjunlee '

  expect(searchReducer(initState, action)).toEqual(expected);
})

test('searchBy', () => {
  const action = {
    type: actions.SEARCH_BY,
    searchBy: actions.searchByAssignee,
  };
  var expected = {...initState};
  expected.searchBy = actions.searchByAssignee;

  expect(searchReducer(initState, action)).toEqual(expected);
})
