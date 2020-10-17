import {Octokit} from '@octokit/rest'
import PullRequest from '../../../models/PullRequest'
import Repo from '../../../models/Repo'

export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const SET_PAGE = 'SET_PAGE'
export const SET_PER_PAGE = 'SET_PER_PAGE'
export const RECEIVE_PULL_REQUESTS_SUCCESS = 'RECEIVE_PULL_REQUESTS_SUCCESS'
export const RECEIVE_PULL_REQUESTS_FAILED = 'RECEIVE_PULL_REQUESTS_FAILED'

export function setTotalCount(count) {
  return {
    type: SET_TOTAL_COUNT,
    totalCount: count,
  };
}

export function setPage(page) {
  return {
    type: SET_PAGE,
    page: page,
  }
}

export function setPerPage(perPage) {
  return {
    type: SET_PER_PAGE,
    perPage: perPage,
  }
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
  const {number, title, body, repository_url} = data;
  const {owner, repo} = parseRepositoryUrl(repository_url);

  return new PullRequest({
    number,
    title,
    body,
    repo: new Repo({
      owner,
      repo,
    }),
  });
}

export function fetchPullRequests(page) {
  return async (dispatch, getStore) => {
    const { token, q } = getStore().search;
    const octokit = new Octokit({auth: token});

    try {
      const {data} = await octokit.search.issuesAndPullRequests({
        q,
        page,
        per_page: 3,
      });

      // Dispatch total count.
      dispatch(setTotalCount(data.total_count));
      dispatch(setPage(page));
      dispatch(setPerPage(3));

      // pull requests
      const pullRequests = await Promise.all(data.items.map(async item => {
        var pullRequest = convertPullRequestDTO(item);
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
