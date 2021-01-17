import { LoadingStatus, PullRequest, Query } from './models'

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
    loading: LoadingStatus;
    items: Array<PullRequest>;
    total: number;
    page: number;
    query: Query;
    q: string;
}
