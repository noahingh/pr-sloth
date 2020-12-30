import { Octokit } from '@octokit/rest';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState, SigninState, LoadingStatus } from '../global';
import * as types from './types';

export const signin = createAsyncThunk<
    types.SigninSuccessPayload,
    string,
    { state: RootState }
>(
    'signin/signin',
    async (token: string, { rejectWithValue }) => {
        await sleep(1);

        try {
            const octokit = new Octokit({ auth: token });

            const { data } = await octokit.users.getAuthenticated();
            const { login } = data;

            return { token, login } as types.SigninSuccessPayload;
        } catch (e) {
            rejectWithValue(e);
        }
    }
)

const initialState: SigninState = {
    type: '',
    loading: LoadingStatus.Idle,
    login: '',
    token: '',
};

export const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        setSignin(state, action: PayloadAction<types.SetSigninPayload>) {
            const { login, token } = action.payload;

            state.login = login;
            state.token = token;
        },
        signout(state) {
            state.login = '';
            state.token = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(signin.pending, (state) => {
            state.loading = LoadingStatus.Loading;
        })

        builder.addCase(signin.fulfilled, (state, action) => {
            const { login, token } = action.payload;

            state.loading = LoadingStatus.Success;
            state.login = login;
            state.token = token;
        })

        builder.addCase(signin.rejected, (state) => {
            state.loading = LoadingStatus.Failed;
        })
    }
});

function sleep(second: number) {
    return new Promise(resolve => {
        setTimeout(resolve, second * 1000);
    })
}
