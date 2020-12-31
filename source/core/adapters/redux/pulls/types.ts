import { PullRequest, Role } from '../../../models';

export interface FetchPullRequestsPayLoad {
    total: number;
    items: Array<PullRequest>;
}

export interface SetPagePayload {
    page: number;
}

export interface SetRolePayLoad {
    role: Role;
}

export interface InitPayLoad {
    login: string;
}
