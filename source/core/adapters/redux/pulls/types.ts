import { PullRequest } from '../global';

export const SET_PAGE = 'pulls/SET_PAGE';

export const FETCH_PULL_REQUESTS_LOADING = 'pulls/FETCH_PULL_REQUESTS_LOADING';
export const FETCH_PULL_REQUESTS_SUCCESS = 'pulls/FETCH_PULL_REQUESTS_SUCCESS';
export const FETCH_PULL_REQUESTS_FAILED = 'pulls/FETCH_PULL_REQUESTS_FAILED';

interface SetPageAction {
    type: typeof SET_PAGE;
    page: number;
}

interface FetchPullRequestsLoadingAction {
    type: typeof FETCH_PULL_REQUESTS_LOADING;
}

interface FetchPullRequestsSuccessAction {
    type: typeof FETCH_PULL_REQUESTS_SUCCESS;
    total: number;
    page: number;
    perPage: number;
    items: Array<PullRequest>;
}

export type PullsAction = FetchPullRequestsLoadingAction | FetchPullRequestsSuccessAction | SetPageAction;
