import PullRequest from '../../../models/PullRequest'
import * as actions from '../actions'

import {initState, listReducer} from './list'

test('fetch pull requests', () => {
  const action = {
    type: actions.RECEIVE_PULL_REQUESTS_SUCCESS,
    totalCount: 5,
    page: 1,
    perPage: 3,
    pullRequests: [new PullRequest({number: 1})],
  };

  var expected = {...initState};
  expected.totalCount = 5;
  expected.page = 1;
  expected.perPage = 3;
  expected.pullRequests = [new PullRequest({number: 1})];

  expect(listReducer(initState, action)).toEqual(expected);
});
