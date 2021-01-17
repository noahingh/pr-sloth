import { Paginator, PullRequest, QueryBuilder } from '../../../models'
import { LoadingStatus } from './models'

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
    paginator: Paginator;
    builder: QueryBuilder;
}
