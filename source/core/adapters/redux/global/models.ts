export enum LoadingStatus {
    Idle = "idle",
    Loading = "loading",
    Success = "success",
    Failed = "failed"
}

export type PullRequest = {
    number: number;
    title: string;
    body: string;
    htmlUrl: string;
    repo?: Repo;
    creator: string;
    createdAt: Date;
}

export type Repo = {
    owner: string;
    repo: string;
}

export enum Role {
    Author = "author",
    Assignee = "assignee",
    Mentions = "mentions",
    ReviewRequested = "review-requested",
}

export type Query = {
    role: Role;
    login: string;
    opened: boolean;
    archived: boolean;
}
