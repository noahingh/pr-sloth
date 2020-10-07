import * as actions from '../actions'

export const initState =
    {
      /**
       * Bool of pr opened.
       */
      isOpen: true,
      /**
       * Enum of search-by.
       */
      searchBy: actions.searchByAuthor,
      /**
       * Query of search for Github.
       */
      q: '',
      /**
       * Total count of pull request.
       */
      totalCount: 0,
      /**
       * Array of instance of PullRequest.
       */
      pullRequests: [],
    }

export function rootReducer(state, action) {
  /**
   * fetch pull requests
   */
  switch (action.type) {
    case actions.SET_TOTAL_COUNT:
      const totalCount = action.totalCount
      return {
        ...state,
        totalCount: totalCount,
      };
    case actions.RECEIVE_PULL_REQUESTS_SUCCESS:
      const pullRequests = action.pullRequests
      return {
        ...state,
        pullRequests,
      };
  }

  /**
   * build query
   */
  switch (action.type) {
    case actions.BUILD_QUERY:
      // TODO: change user name.
      const q = buildQuery('hanjunlee', {
        isOpen: state.isOpen,
        searchBy: state.searchBy,
      })
      return {
        ...state, q: q
      }
    case actions.SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
  }
}

function buildQuery(userName, {isOpen, searchBy}) {
  var q = ''

  // open or closed
  switch (isOpen) {
    case true:
      q += 'is:open ';
      break;
    case false:
      q += 'is:closed ';
      break;
  }

  // search by
  switch (searchBy) {
    case actions.searchByAuthor:
      q += 'author:';
      break;
    case actions.searchByAssignee:
      q += 'assignee:';
      break;
    case actions.searchByMention:
      q += 'mentions:';
      break;
    case actions.searchByReviewRequested:
      q += 'review-requested:';
      break;
    default:
      q += 'author:';
  }
  q += userName + ' '

  return q
}
