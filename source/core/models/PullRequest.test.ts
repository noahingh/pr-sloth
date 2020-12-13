import PullRequest from './PullRequest';
import Repo from './Repo';

test('PullRequest getter', function () {
    const pr = new PullRequest({
        number: 1,
        title: 'Add foo component',
        body: 'Add a new component',
        htmlUrl: 'github.com/hanjunlee/pr-sloth',
        repo: new Repo({
            owner: 'hanjunlee', 
            repo: 'pr-sloth',
        }),
        creator: 'hanjunlee',
        createdAt: new Date(),
    })
    expect(pr.number).toBe(1)
})
