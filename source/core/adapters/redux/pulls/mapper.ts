import { PullRequest, Repo } from '../../../models';

export function mapPullRequestData(item: {
    number: number;
    title: string;
    body: string;
    html_url: string;
    repository_url: string;
    user: {
        login: string;
    };
    created_at: string;
}) {
    const { owner, repo } = parseRepositoryUrl(item.repository_url)

    return new PullRequest({
        ...item,
        htmlUrl: item.html_url,
        repo: new Repo({
            owner,
            repo,
        }),
        creator: item.user.login,
        createdAt: new Date(item.created_at),
    });
}

function parseRepositoryUrl(url: string) {
    const ret = url.replace('https://api.github.com/repos/', '').split('/')
    return {
        owner: ret[0],
        repo: ret[1],
    };
}
