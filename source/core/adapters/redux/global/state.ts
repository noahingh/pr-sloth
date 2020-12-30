import { Paginator, PullRequest, QueryBuilder } from '../../../models';

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
    type: string;
    items: Array<PullRequest>;
    paginator: Paginator;
    builder: QueryBuilder;
}
