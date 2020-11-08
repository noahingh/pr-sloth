import * as actions from '../actions'

export const initState = {
  /**
   * Total count of pull request.
   */
  totalCount: 0,
  /**
   * Page of pull request.
   */
  page: 1,
  /**
   * Count of pull request for a page.
   */
  perPage: 3,
  /**
   * Array of instance of PullRequest.
   */
  pullRequests: [],
}

export function listReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      };
    case actions.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case actions.SET_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage,
      };
    case actions.RECEIVE_PULL_REQUESTS_SUCCESS:
      const { totalCount, page, perPage, pullRequests } = action
      return {
        ...state,
        totalCount,
        page,
        perPage,
        pullRequests,
      };
    default:
      return state
  }
}
