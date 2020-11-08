import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PullRequest from '../../../models/PullRequest'
import Repo from '../../../models/Repo'

import {fetchPullRequests, RECEIVE_PULL_REQUESTS_SUCCESS, PER_PAGE} from './pr'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('simple fetch pull-requests', () => {
  // Mock Github API.
  nock('https://api.github.com').get('/search/issues?q=&page=1&per_page=3').reply(200, {
    total_count: 2,
    items: [
      {
        repository_url: 'https://api.github.com/repos/sloth/pr-sloth',
        html_url: 'https://api.github.com/repos/sloth/pr-sloth/pulls/1',
        number: 1,
        title: 'Add a new component',
        body: '',
        user: {
          login: 'sloth',
        },
        created_at: '2020-10-12T20:10:41Z',
      },
      {
        repository_url: 'https://api.github.com/repos/sloth/pr-sloth',
        html_url: 'https://api.github.com/repos/sloth/pr-sloth/pulls/2',
        number: 2,
        title: 'Fix the bug',
        body: '',
        user: {
          login: 'sloth',
        },
        created_at: '2020-10-13T20:10:41Z',
      },
    ],
  });

  const store = mockStore({ 
    search: { token: '', q: '' },
    list: {
      totalcount: 0, 
      pullRequests: [],
    },
  });
  const expectedActions = [
    {
      type: RECEIVE_PULL_REQUESTS_SUCCESS,
      totalCount: 2,
      page: 1,
      perPage: PER_PAGE,
      pullRequests: [
        new PullRequest({
          number: 1,
          title: 'Add a new component',
          body: '',
          htmlUrl: 'https://api.github.com/repos/sloth/pr-sloth/pulls/1',
          creator: 'sloth',
          createdAt: new Date('2020-10-12T20:10:41Z'),
          repo: new Repo({
            owner: 'sloth',
            repo: 'pr-sloth'
          }),
        }),
        new PullRequest({
          number: 2,
          title: 'Fix the bug',
          body: '',
          htmlUrl: 'https://api.github.com/repos/sloth/pr-sloth/pulls/2',
          creator: 'sloth',
          createdAt: new Date('2020-10-13T20:10:41Z'),
          repo: new Repo({
            owner: 'sloth',
            repo: 'pr-sloth'
          }),
        }),
      ],
    },
  ];

  return store.dispatch(fetchPullRequests(1))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})
