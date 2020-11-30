// TODO: move models.ts into models directory.
export class PullRequest {
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
        const {
            number,
            title,
            body,
            htmlUrl,
            creator,
            createdAt,
        } = pr;

        this.number = number;
        this.title = title;
        this.body = body;
        this.htmlUrl = htmlUrl;
        this.creator = creator;
        this.createdAt = createdAt;
    }
}
