import * as actions from '../actions'

import {initState, searchReducer} from './search'

test('setToken', () => {
  const action = {
    type: actions.SET_TOKEN,
    token: 'token'
  };

  var expected = {...initState};
  expected.token = 'token'
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
  expected.q = 'type:pr is:open assignee:hanjunlee '

  expect(searchReducer(initState, action)).toEqual(expected);
})
