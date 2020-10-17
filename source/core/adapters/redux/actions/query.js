export const SET_TOKEN = 'SET_TOKEN'
export const SEARCH_BY = 'SEARCH_BY'

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export const searchByAuthor = 'author'
export const searchByAssignee = 'assignee'
export const searchByMention = 'mentions'
export const searchByReviewRequested = 'review-requested'

export function setSearchBy(it) {
  if (!(it === searchByAuthor || it === searchByAssignee ||
        it === searchByMention || it === searchByReviewRequested)) {
    return {
      type: 'default',
    };
  }

  return {
    type: SEARCH_BY,
    searchBy: it,
  };
}

