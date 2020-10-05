import PullRequest from './PullRequest';

test('PullRequest getter', function() {
  const pr = new PullRequest({
    number: 1,
    title: 'Add foo component',
  })
  expect(pr.prNumber).toBe(1)
})
