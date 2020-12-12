export default class PullRequest {
    number: number;
    title: string;
    body: string;
    htmlUrl: string;
    creator: string;
    createdAt: Date;

    constructor(pr: {
        number: number,
        title: string,
        body: string,
        htmlUrl: string,
        creator: string,
        createdAt: Date,
    }) {
        this.number = pr.number;
        this.title = pr.title;
        this.body = pr.body;
        this.htmlUrl = pr.htmlUrl;
        this.creator = pr.creator;
        this.createdAt = pr.createdAt;
    }
}
