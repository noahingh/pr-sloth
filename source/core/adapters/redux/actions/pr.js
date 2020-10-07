import {Octokit} from '@octokit/rest'
import PullRequest from '../../../models/PullRequest'
import Repo from '../../../models/Repo'

export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const RECEIVE_PULL_REQUESTS_SUCCESS = 'RECEIVE_PULL_REQUESTS_SUCCESS'
export const RECEIVE_PULL_REQUESTS_FAILED = 'RECEIVE_PULL_REQUESTS_FAILED'

export function setTotalCount(count) {
  return {
    type: SET_TOTAL_COUNT,
    totalCount: count,
  };
}

function receivePullRequestsSuccess(prs) {
  return {
    type: RECEIVE_PULL_REQUESTS_SUCCESS,
    pullRequests: prs,
  };
}

function receivePullRequestsFailed(e) {
  return {
    type: RECEIVE_PULL_REQUESTS_FAILED,
    e: e,
  };
}

function convertPullRequestDTO(data) {
  return new PullRequest({
    number: data.number,
    title: data.title,
    body: data.body,
  })
}

function convertRepoDTO(data) {
  return new Repo({
    fullName: data.full_name,
    url: data.html_url,
  });
}

export function fetchPullRequests(token, query) {
  return async (dispatch) => {
    const octokit = new Octokit({auth: token});
    const q = query

    try {
      const {data: searchData} = await octokit.search.issuesAndPullRequests({
        q,
      });

      // Dispatch total count.
      dispatch(setTotalCount(searchData.total_count));

      // Convert into Pullrequest entity.
      const pullRequests = await Promise.all(searchData.items.map(async item => {
        const {owner, repo} = parseRepositoryUrl(item.repository_url);
        const {data: repoData} = await octokit.repos.get({
          owner,
          repo,
        });

        var pullRequest = convertPullRequestDTO(item);
        pullRequest.repo = convertRepoDTO(repoData);
        return pullRequest
      })) 

      // Dispatch pull requests.
      return dispatch(receivePullRequestsSuccess(pullRequests));
    } catch (e) {
      return dispatch(receivePullRequestsFailed(e))
    }
  };
}

function parseRepositoryUrl(url) {
  const ret = url.replace('https://api.github.com/repos/', '').split('/')
  return {
    owner: ret[0],
    repo: ret[1],
  };
}
