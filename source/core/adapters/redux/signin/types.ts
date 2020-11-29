export const SIGNIN_LOADING = 'signin/SIGNIN_LOADING';
export const SIGNIN_SUCCESS = 'signin/SIGNIN_SUCCESS';

interface SigninLoadingAction {
    type: typeof SIGNIN_LOADING;
}

interface SigninSuccessAction {
    type: typeof SIGNIN_SUCCESS;
    login: string;
    token: string;
}

export type SigninAction = SigninLoadingAction | SigninSuccessAction;
