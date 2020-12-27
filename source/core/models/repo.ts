export default class Repo {
    owner: string;
    repo: string;
    constructor(props: {
        owner: string,
        repo: string,
    }) {
        this.owner = props.owner;
        this.repo = props.repo;
    }

    get fullName() {
        return this.owner + "/" + this.repo;
    }

    get htmlUrl() {
        return "https://github.com/".concat(this.owner, "/", this.repo)
    }
}
