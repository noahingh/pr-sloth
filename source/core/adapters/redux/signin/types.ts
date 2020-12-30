export const SIGNIN_LOADING = 'signin/SIGNIN_LOADING';
export const SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS';

export const SIGNOUT_SUCCESS = 'pulls/SIGNOUT_SUCCESS';

interface SigninLoadingAction {
    type: typeof SIGNIN_LOADING;
}

interface SigninSuccessAction {
    type: typeof SIGNIN_SUCCESS;
    login: string;
    token: string;
}

interface SignoutSuccessAction {
    type: typeof SIGNOUT_SUCCESS;
}

export type SigninAction = SigninLoadingAction | SigninSuccessAction | SignoutSuccessAction;

export interface SetSigninPayload {
    login: string;
    token: string;
}

export interface SigninSuccessPayload {
    login: string;
    token: string;
}
