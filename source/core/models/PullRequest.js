export default class PullRequest {
  constructor({
    number,
    title,
    body,
    htmlUrl,
    creator,
    createdAt,
    repo,
  }) {
    this.number = number;
    this.title = title;
    this.body = body;
    this.htmlUrl = htmlUrl;
    this.creator = creator;
    this.createdAt = createdAt;
    this.repo = repo;
  }

  get prNumber() {
    return this.number;
  }
}
