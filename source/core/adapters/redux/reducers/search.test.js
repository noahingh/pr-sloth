import * as actions from '../actions'

import {initState, searchReducer} from './search'


test('sign-in success', () => {
  const action = {
    type: actions.SIGNIN_SUCCESS,
    token: 'token',
    login: 'login',
  };

  var expected = {
    ...initState,
    signinStatus: actions.SIGNIN_SUCCESS,
    token: 'token',
    login:  'login',
    q: 'type:pr is:open author:login ',
  };

  expect(searchReducer(initState, action)).toEqual(expected);
})

test('sign-out success', () => {
  const action = {
    type: actions.SIGNOUT_SUCCESS,
  };

  var expected = {...initState};
  expected.token = ''
  expected.login = ''
  expected.q = 'type:pr is:open author: '

  expect(searchReducer(initState, action)).toEqual(expected);
})

test('searchBy', () => {
  const action = {
    type: actions.SEARCH_BY,
    searchBy: actions.searchByAssignee,
  };

  var expected = {...initState};
  expected.searchBy = actions.searchByAssignee;
  expected.q = 'type:pr is:open assignee: '

  expect(searchReducer(initState, action)).toEqual(expected);
})
