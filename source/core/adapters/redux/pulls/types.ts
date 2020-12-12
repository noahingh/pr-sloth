import { PullRequest } from '../../../models';

export const SET_PAGE = 'pulls/SET_PAGE';

export const FETCH_PULL_REQUESTS_LOADING = 'pulls/FETCH_PULL_REQUESTS_LOADING';
export const FETCH_PULL_REQUESTS_SUCCESS = 'pulls/FETCH_PULL_REQUESTS_SUCCESS';
export const FETCH_PULL_REQUESTS_FAILED = 'pulls/FETCH_PULL_REQUESTS_FAILED';

export const BUILD_QUERY = 'pulls/BUILD_QUERY';

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

export enum Role {
    Author = 0,
    Assignee,
    Mentions,
    ReviewRequested,
}

interface BuildQueryAction {
    type: typeof BUILD_QUERY;
    role: Role;
    login: string;
}

export type PullsAction = SetPageAction
    | FetchPullRequestsLoadingAction
    | FetchPullRequestsSuccessAction
    | BuildQueryAction;
