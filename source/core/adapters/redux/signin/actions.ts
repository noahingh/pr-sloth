import {Octokit} from '@octokit/rest';

import { AppThunk } from '../global';
import { SIGNIN_LOADING, SIGNIN_SUCCESS, SigninAction } from './types';

function signinLoading(): SigninAction {
    return {
        type: SIGNIN_LOADING,
    };
}

function signinSuccess(creds: {
    login: string,
    token: string,
}): SigninAction {
    const {
        login,
        token
    } = creds;
    return {
        type: SIGNIN_SUCCESS,
        login,
        token,
    };
}

export function signin(token: string): AppThunk {
    return async (dispatch, getState) => {
        dispatch(signinLoading());

        const octokit = new Octokit({auth: token});
        try {
            const { data } = await octokit.users.getAuthenticated();
            const { login } = data;

            dispatch(signinSuccess({login, token}));
        } catch(e) {
            console.log('error occurs: ' + e);
        }
    }
}