import { Paginator, PullRequest, QueryBuilder } from '../../../models';

export interface RootState {
    signin: SigninState;
    pulls: PullsState;
}

export interface SigninState {
    loading: LoadingStatus;
    login: string;
    token: string;
}

export interface PullsState {
    type: string;
    items: Array<PullRequest>;
    paginator: Paginator;
    builder: QueryBuilder;
}

export enum LoadingStatus {
    Idle = 1,
    Loading, 
    Success,
    Failed
}
