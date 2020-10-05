import {Octokit} from '@octokit/rest'
import PullRequest from '../../../models/PullRequest'

export const RECEIVE_PULL_REQUESTS_SUCCESS = 'RECEIVE_PULL_REQUESTS_SUCCESS'
export const RECEIVE_PULL_REQUESTS_FAILED = 'RECEIVE_PULL_REQUESTS_FAILED'


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

function convertPullRequestDTO(items) {
  return items.map(item => new PullRequest({
                     number: item.number,
                   }));
}

export function fetchPullRequests(token, query) {
  return (dispatch) => {
    const octokit = new Octokit({auth: token});
    const q = query

    return octokit.search
        .issuesAndPullRequests({
          q,
        })
        .then(({data}) => {
          const prs = convertPullRequestDTO(data.items)
          dispatch(receivePullRequestsSuccess(prs));
        })
        .catch(e => {
          dispatch(receivePullRequestsFailed(e));
        })
  };
}
