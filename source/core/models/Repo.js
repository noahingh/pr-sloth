export default class Repo {
  constructor({
    owner,
    repo,
  }) {
    this.owner = owner;
    this.repo = repo;
  }

  get fullName() {
    return this.owner + "/" + this.repo;
  }

  get htmlUrl() {
    return "https://github.com/".concat(this.owner, "/", this.repo)
  }
}
