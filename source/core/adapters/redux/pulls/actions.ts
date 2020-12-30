import { Octokit } from '@octokit/rest';

import { AppThunk } from '../global';
import { PullRequest, Repo } from '../../../models';
import * as types from './types';

type PullsAction = types.PullsAction;

export function setPage(page: number): PullsAction {
    return {
        type: types.SET_PAGE,
        page
    };
}

function fetchPullRequestsSuccess(pulls: {
    total: number;
    items: Array<PullRequest>;
}): PullsAction {
    const {
        total,
        items,
    } = pulls;

    return {
        type: types.FETCH_PULL_REQUESTS_SUCCESS,
        total,
        items
    };
}

function fetchPullRequestsLoading(): PullsAction {
    return {
        type: types.FETCH_PULL_REQUESTS_LOADING
    };
}

function convertPullRequestData(item: {
    number: number;
    title: string;
    body: string;
    html_url: string;
    repository_url: string;
    user: {
        login: string;
    };
    created_at: string;
}) {
    const {
        number,
        title,
        body,
        html_url,
        user,
        created_at,
    } = item;
    const {
        login
    } = user;
    const { owner, repo } = parseRepositoryUrl(item.repository_url)

    return new PullRequest({
        ...item,
        number,
        title,
        body,
        htmlUrl: html_url,
        repo: new Repo({
            owner,
            repo,
        }),
        creator: login,
        createdAt: new Date(created_at),
    });
}

function parseRepositoryUrl(url: string) {
    const ret = url.replace('https://api.github.com/repos/', '').split('/')
    return {
        owner: ret[0],
        repo: ret[1],
    };
}

export function fetchPullRequests(): AppThunk {
    return async (dispatch, getStore) => {
        dispatch(fetchPullRequestsLoading());

        const { paginator, builder, } = getStore().pulls
        const q = builder.buildQuery();
        const { token } = getStore().signin;

        try {
            const octokit = new Octokit({ auth: token });

            const { data } = await octokit.search.issuesAndPullRequests({
                q,
                page: paginator.page,
                per_page: paginator.perPage,
            });

            const items = await Promise.all(data.items.map(async item => convertPullRequestData(item)));

            dispatch(fetchPullRequestsSuccess({
                total: data.total_count,
                items,
            }));
        } catch (e) {
            console.log('error: ' + e)
        }
    };
}

function buildQuery(param: {
    role: types.Role;
    login: string;
}): PullsAction {
    const {
        role,
        login
    } = param;

    return {
        type: types.BUILD_QUERY,
        login,
        role,
    };
}

export function setRole(role: types.Role): AppThunk {
    return async (dispatch, getStore) => {
        const {
            login
        } = getStore().signin;

        dispatch(buildQuery({ role, login }));
    }
}
