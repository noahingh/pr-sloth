import {Octokit} from '@octokit/rest'
import PullRequest from '../../../models/PullRequest'
import Repo from '../../../models/Repo'

export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
export const SET_PAGE = 'SET_PAGE'
export const SET_PER_PAGE = 'SET_PER_PAGE'
export const RECEIVE_PULL_REQUESTS_SUCCESS = 'RECEIVE_PULL_REQUESTS_SUCCESS'
export const RECEIVE_PULL_REQUESTS_FAILED = 'RECEIVE_PULL_REQUESTS_FAILED'
export const PER_PAGE = 3

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

function receivePullRequestsSuccess({
  totalCount,
  page,
  perPage,
  pullRequests,
}) {
  return {
    type: RECEIVE_PULL_REQUESTS_SUCCESS,
    totalCount,
    page,
    perPage,
    pullRequests,
  };
}

function receivePullRequestsFailed(e) {
  return {
    type: RECEIVE_PULL_REQUESTS_FAILED,
    e: e,
  };
}

function convertPullRequestDTO(data) {
  const {number, title, body, html_url, user, created_at, repository_url} = data;
  const { login } = user;
  const {owner, repo} = parseRepositoryUrl(repository_url);
  const htmlUrl = html_url;
  const createdAt = new Date(created_at);

  return new PullRequest({
    number,
    title,
    body,
    htmlUrl,
    creator: login,
    createdAt,
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
        per_page: PER_PAGE,
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

      return dispatch(receivePullRequestsSuccess({
        totalCount: data.total_count,
        page: page,
        perPage: PER_PAGE,
        pullRequests,
      }));
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
