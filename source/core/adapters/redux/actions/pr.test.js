import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PullRequest from '../../../models/PullRequest'

import {fetchPullRequests, RECEIVE_PULL_REQUESTS_SUCCESS} from './pr'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('simple fetch pull-requests', () => {
  const scope =
      nock('https://api.github.com').get('/search/issues?q=').reply(200, {
        total_number: '1',
        items: [{
          number: 1,
        }],
      });

  const store = mockStore({pullRequests: []})
  const expectedActions = [
    {
      type: RECEIVE_PULL_REQUESTS_SUCCESS,
      pullRequests: [new PullRequest({number: 1})]
    },
  ];

  return store.dispatch(fetchPullRequests('', ''))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})
