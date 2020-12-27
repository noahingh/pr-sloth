import Repo from './repo';

export default class PullRequest {
    number: number;
    title: string;
    body: string;
    htmlUrl: string;
    repo: Repo;
    creator: string;
    createdAt: Date;

    constructor(pr: {
        number: number,
        title: string,
        body: string,
        htmlUrl: string,
        repo: Repo,
        creator: string,
        createdAt: Date,
    }) {
        this.number = pr.number;
        this.title = pr.title;
        this.body = pr.body;
        this.htmlUrl = pr.htmlUrl;
        this.repo = pr.repo;
        this.creator = pr.creator;
        this.createdAt = pr.createdAt;
    }
}
