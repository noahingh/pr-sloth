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
    items: Array<PullRequest>;
}

export enum Role {
    Author = 0,
    Assignee,
    Mentions,
    ReviewRequested,
}

/**
 * It occurs when we click the tabs or the toggle button.
 */
interface BuildQueryAction {
    type: typeof BUILD_QUERY;
    role: Role;
    login: string;
}

export type PullsAction = SetPageAction
    | FetchPullRequestsLoadingAction
    | FetchPullRequestsSuccessAction
    | BuildQueryAction;

export interface SetPagePayload {
    page: number;
}

export interface FetchPullRequestsPayLoad {
    total: number;
    items: Array<PullRequest>;
}

export interface SetRolePayLoad {
    role: Role;
    login: string;
}
