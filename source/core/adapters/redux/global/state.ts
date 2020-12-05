import { PullRequest } from './models';

export interface RootState {
    signin: SigninState;
    pulls: PullsState;
}

export interface SigninState {
    type: string;
    login: string;
    token: string;
}

export interface PullsState {
    list: PullsListState;
    query: PullsQueryState;
}

export interface PullsListState {
    type: string;
    total: number;
    page: number;
    perPage: number;
    items: Array<PullRequest>;
}

export interface PullsQueryState {
    q: string;
}
