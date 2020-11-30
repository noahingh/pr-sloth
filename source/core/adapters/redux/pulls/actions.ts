import { Octokit } from '@octokit/rest';

import { AppThunk, PullRequest } from '../global';
import {
    SET_PAGE,
    FETCH_PULL_REQUESTS_LOADING,
    FETCH_PULL_REQUESTS_SUCCESS,
    PullsAction
} from './types';

export function setPage(page: number): PullsAction {
    return {
        type: SET_PAGE,
        page
    };
}

function fetchPullRequestsSuccess(pulls: {
    total: number;
    page: number;
    perPage: number;
    items: Array<PullRequest>;
}): PullsAction {
    const {
        total,
        page,
        perPage,
        items,
    } = pulls;

    return {
        type: FETCH_PULL_REQUESTS_SUCCESS,
        total,
        page,
        perPage,
        items
    };
}

function fetchPullRequestsLoading(): PullsAction {
    return {
        type: FETCH_PULL_REQUESTS_LOADING
    };
}

function convertPullRequestData(item: {
    number: number;
    title: string;
    body: string;
    html_url: string;
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

    return new PullRequest({
        number,
        title,
        body,
        htmlUrl: html_url,
        creator: login,
        createdAt: new Date(created_at),
    });
}

export function fetchPullRequests(): AppThunk {
    return async (dispatch, getStore) => {
        dispatch(fetchPullRequestsLoading());

        const {
            page,
            perPage,
        } = getStore().pulls.list;
        const {
            token
        } = getStore().signin;

        try {
            const octokit = new Octokit({ auth: token });

            const { data } = await octokit.search.issuesAndPullRequests({
                q: 'type:pr is:open author:hanjunlee',
                page,
                per_page: perPage,
            });

            const items = await Promise.all(data.items.map(async item => convertPullRequestData(item)));

            dispatch(fetchPullRequestsSuccess({
                total: data.total_count,
                page,
                perPage,
                items,
            }));
        } catch (e) {
            console.log('error: ' + e)
        }
    };
}
