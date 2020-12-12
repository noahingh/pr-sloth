import PullRequest from './PullRequest';

test('PullRequest getter', function () {
    const pr = new PullRequest({
        number: 1,
        title: 'Add foo component',
        body: 'Add a new component',
        htmlUrl: 'github.com/hanjunlee/pr-sloth',
        creator: 'hanjunlee',
        createdAt: new Date(),
    })
    expect(pr.number).toBe(1)
})
