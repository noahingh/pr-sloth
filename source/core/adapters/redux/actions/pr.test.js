import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PullRequest from '../../../models/PullRequest'
import Repo from '../../../models/Repo'

import {fetchPullRequests, RECEIVE_PULL_REQUESTS_SUCCESS, SET_TOTAL_COUNT} from './pr'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('simple fetch pull-requests', () => {
  // Mock Github API.
  nock('https://api.github.com').get('/search/issues?q=').reply(200, {
    total_count: 2,
    items: [
      {
        repository_url: 'https://api.github.com/repos/sloth/pr-sloth',
        number: 1,
        title: 'Add a new component',
        body: '',
      },
      {
        repository_url: 'https://api.github.com/repos/sloth/pr-sloth',
        number: 2,
        title: 'Fix the bug',
        body: '',
      },
    ],
  });

  nock('https://api.github.com').get('/repos/sloth/pr-sloth').reply(200, {
    full_name: 'sloth/pr-sloth',
    html_url: 'https://github.com/sloth/pr-sloth',
  });

  nock('https://api.github.com').get('/repos/sloth/pr-sloth').reply(200, {
    full_name: 'sloth/pr-sloth',
    html_url: 'https://github.com/sloth/pr-sloth',
  });


  const store = mockStore({totalcount: 0, pullRequests: []})
  const expectedActions = [
    {
      type: SET_TOTAL_COUNT,
      totalCount: 2,
    },
    {
      type: RECEIVE_PULL_REQUESTS_SUCCESS,
      pullRequests: [
        new PullRequest({
          number: 1,
          title: 'Add a new component',
          body: '',
          repo: new Repo({
            fullName: 'sloth/pr-sloth',
            url: 'https://github.com/sloth/pr-sloth'
          }),
        }),
        new PullRequest({
          number: 2,
          title: 'Fix the bug',
          body: '',
          repo: new Repo({
            fullName: 'sloth/pr-sloth',
            url: 'https://github.com/sloth/pr-sloth'
          }),
        }),
      ],
    },
  ];

  return store.dispatch(fetchPullRequests('', ''))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})
