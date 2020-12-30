import { Paginator, PullRequest } from '../../../models';

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
    items: Array<PullRequest>;
    paginator: Paginator;
}

export interface PullsQueryState {
    q: string;
}
