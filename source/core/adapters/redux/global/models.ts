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
