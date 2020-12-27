import Repo from './repo';

test('Repo fullName getter', function () {
    const pr = new Repo({
        owner: 'sloth',
        repo: 'pr-sloth',
    });
    expect(pr.fullName).toBe('sloth/pr-sloth');
})

test('Repo htmlUrl getter', function () {
    const pr = new Repo({
        owner: 'sloth',
        repo: 'pr-sloth',
    });
    expect(pr.htmlUrl).toBe('https://github.com/sloth/pr-sloth');
})
