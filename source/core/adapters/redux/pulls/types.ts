import { PullRequest, Role } from '../../../models';

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
