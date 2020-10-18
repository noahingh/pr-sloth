import {Octokit} from '@octokit/rest';

export const SIGNIN_LOADING = 'SIGNIN_LOADING';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILED = 'SIGNIN_FAILED';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
export const SEARCH_BY = 'SEARCH_BY';

function signinLoading() {
  return {
    type: SIGNIN_LOADING,
  };
}

function signinSuccess({token, login}) {
  return {
    type: SIGNIN_SUCCESS,
    token,
    login,
  };
}

function signinFailed(e) {
  return {
    type: SIGNIN_FAILED,
    e,
  };
}

export function signin(token) {
  return async (dispatch) => {
    dispatch(signinLoading());

    const octokit = new Octokit({auth: token});

    try {
      const { data } = await octokit.users.getAuthenticated();
      const { login } = data;
      dispatch(signinSuccess({
        token,
        login,
      }));
    } catch(e) {
      dispatch(signinFailed(e));
    }
  }
}

export function signinCache({token, login}) {
  return signinSuccess({token, login});
}

export function signout() {
  return {
    type: SIGNOUT_SUCCESS,
  }
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

