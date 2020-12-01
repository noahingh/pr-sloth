import { SigninState } from '../global';
import { SIGNIN_LOADING, SIGNIN_SUCCESS, SIGNOUT_SUCCESS, SigninAction } from './types';

const initState: SigninState = {
    type: '',
    login: '',
    token: '',
};

export function signinReducer(
    state = initState,
    action: SigninAction
): SigninState {
    const {
        type
    } = action;

    switch (action.type) {
        case SIGNIN_LOADING:
            return {
                ...state,
                type
            };
        case SIGNIN_SUCCESS:
            const {
                login,
                token
            } = action;

            return {
                ...state,
                type,
                login,
                token
            };
        case SIGNOUT_SUCCESS:
            return {
                ...state,
                type,
                login: '',
                token: '',
            }
        default:
            return state
    }
}
