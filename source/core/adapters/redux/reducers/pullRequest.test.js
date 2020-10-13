import PullRequest from '../../../models/PullRequest'
import * as actions from '../actions'

import {initState, pullRequestReducer} from './pullRequest'

test('fetch pull requests', () => {
  const action = {
    type: actions.RECEIVE_PULL_REQUESTS_SUCCESS,
    pullRequests: [new PullRequest({number: 1})],
  };

  var expected = {...initState};
  expected.pullRequests = [new PullRequest({number: 1})];

  expect(pullRequestReducer(initState, action)).toEqual(expected);
});
