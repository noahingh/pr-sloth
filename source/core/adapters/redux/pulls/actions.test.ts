import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { PullRequest } from '../global';
// import Repo from '../../../models/Repo';

import { FETCH_PULL_REQUESTS_LOADING, FETCH_PULL_REQUESTS_SUCCESS } from './types';
import { fetchPullRequests } from './actions';

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
        signin: {
            token: '',
        },
        pulls: {
            list: {
                page: 1,
                perPage: 3,
            },
            query: {
                q: '',
            },
        },
    });
    const expectedActions = [
        {
            type: FETCH_PULL_REQUESTS_LOADING,
        },
        {
            type: FETCH_PULL_REQUESTS_SUCCESS,
            total: 2,
            page: 1,
            perPage: 3,
            items: [
                new PullRequest({
                    number: 1,
                    title: 'Add a new component',
                    body: '',
                    htmlUrl: 'https://api.github.com/repos/sloth/pr-sloth/pulls/1',
                    creator: 'sloth',
                    createdAt: new Date('2020-10-12T20:10:41Z'),
                }),
                new PullRequest({
                    number: 2,
                    title: 'Fix the bug',
                    body: '',
                    htmlUrl: 'https://api.github.com/repos/sloth/pr-sloth/pulls/2',
                    creator: 'sloth',
                    createdAt: new Date('2020-10-13T20:10:41Z'),
                }),
            ],
        },
    ];

    return store.dispatch<any>(fetchPullRequests())
        .then(() => { expect(store.getActions()).toEqual(expectedActions) })
})
