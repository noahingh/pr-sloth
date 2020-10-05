export default class PullRequest {
  constructor({
    number,
    title,
    body,
    repo,
  }) {
    this.number = number;
    this.title = title;
    this.body = body;
    this.repo = repo
  }

  get prNumber() {
    return this.number;
  }
}
