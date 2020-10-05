import PullRequest from '../../../models/PullRequest'
import * as actions from '../actions'

import {initState, rootReducer} from './root'

test('fetch pull requests', () => {
  const action = {
    type: actions.RECEIVE_PULL_REQUESTS_SUCCESS,
    pullRequests: [new PullRequest({number: 1})],
  };

  var expected = {...initState};
  expected.pullRequests = [new PullRequest({number: 1})];

  expect(rootReducer(initState, action)).toEqual(expected);
});

test('searchBy action', () => {
  const action = {
    type: actions.SEARCH_BY,
    searchBy: actions.searchByAssignee,
  };

  var expected = {...initState};
  expected.searchBy = actions.searchByAssignee;

  expect(rootReducer(initState, action)).toEqual(expected);
})

test('buildQuery with initState', () => {
  const action = {
    type: actions.BUILD_QUERY,
  };

  var expected = {...initState};
  expected.q = 'is:open author:hanjunlee '

  expect(rootReducer(initState, action)).toEqual(expected);
})

test('buildQuery with {closed, asignee}', () => {
  var state = {
    ...initState,
    isOpen: false,
    searchBy: actions.searchByAssignee,
  };

  const action = {
    type: actions.BUILD_QUERY,
  };

  var expected = {...state};
  expected.q = 'is:closed assignee:hanjunlee '

  expect(rootReducer(state, action)).toEqual(expected);
})
