import * as actions from '../actions'

export const initState = {
  /**
   * Login of user.
   *
   * TODO: complete fetchUser.
   */
  login: 'hanjunlee',
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
};

export function queryBuilderReducer(state = initState, action) {
  switch (action.type) {
    case actions.BUILD_QUERY:
      const q = buildQuery({
        login: state.login,
        isOpen: state.isOpen,
        searchBy: state.searchBy,
      })
      return {
        ...state,
        q,
      };
    case actions.SEARCH_BY:
      return {
        ...state,
        searchBy: action.searchBy,
      };
    default:
      return state
  }
}

function buildQuery({login, isOpen, searchBy}) {
  var q = 'type:pr ';

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
  q += login + ' '

  return q
}
