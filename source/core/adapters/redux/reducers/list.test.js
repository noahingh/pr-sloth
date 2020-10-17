import PullRequest from '../../../models/PullRequest'
import * as actions from '../actions'

import {initState, listReducer} from './list'

test('fetch pull requests', () => {
  const action = {
    type: actions.RECEIVE_PULL_REQUESTS_SUCCESS,
    pullRequests: [new PullRequest({number: 1})],
  };

  var expected = {...initState};
  expected.pullRequests = [new PullRequest({number: 1})];

  expect(listReducer(initState, action)).toEqual(expected);
});
