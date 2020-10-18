import * as actions from '../actions'

export const initState = {
  token: '',
  /**
   * Login of user.
   *
   * TODO: complete fetchUser.
   */
  login: '',
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

export function searchReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_TOKEN:
      state = {
        ...state,
        token: action.token,
      };
      break;
    case actions.SIGNIN_SUCCESS:
      const {token, login} = action;
      state = {
        ...state,
        token,
        login,
      };
      break;
    case actions.SEARCH_BY:
      state = {
        ...state,
        searchBy: action.searchBy,
      };
      break;
  }
  
  const q = buildQuery(state)
  return {
    ...state,
    q,
  };
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
