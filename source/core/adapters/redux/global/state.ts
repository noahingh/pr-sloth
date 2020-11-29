export interface RootState {
    signin: SigninState;
}

export interface SigninState {
    type: string;
    login: string;
    token: string;
}
