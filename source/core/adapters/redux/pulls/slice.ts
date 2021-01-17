import { Octokit } from '@octokit/rest';
import { createSlice, createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState, PullsState, LoadingStatus, Role, AppThunk } from '../global';
import { mapPullRequestData } from './mapper';
import * as types from './types';
import { buildQuery } from './builder'

const initialState: PullsState = {
    loading: LoadingStatus.Idle,
    items: [],
    total: 0,
    page: 1,
    query: {
        role: Role.Author,
        login: '',
        opened: true,
        archived: false,
    },
    q: '',
};

/**
 * The init function initializes the pulls state,
 * it sets the login to build a query.
 */
export function init(): AppThunk {
    return async (dispatch, getState) => {
        const { login } = getState().signin;
        await dispatch(initAction(login))
    }
}

const initAction = createAction('pulls/init', (login: string) => {
    return {
        payload: {
            login,
        }
    }
})

export const fetchPullRequests = createAsyncThunk<
    types.FetchPullRequestsPayLoad,
    unknown,
    { state: RootState }
>(
    'pulls/fetchPullRequests',
    async (_, { getState, rejectWithValue }) => {
        const { token } = getState().signin;
        const { page, query } = getState().pulls
        const q = buildQuery(query)

        try {
            const octokit = new Octokit({ auth: token });

            const { data } = await octokit.search.issuesAndPullRequests({
                q,
                page,
                per_page: 3,
            });

            return {
                items: data.items.map(item => mapPullRequestData(item)),
                total: data.total_count,
            }
        } catch (e) {
            return rejectWithValue(e)
        }
    },
)

export const pullsSlice = createSlice({
    name: 'pulls',
    initialState,
    reducers: {
        resetPage(state) {
            state.loading = LoadingStatus.Idle;
            state.total = 0
            state.page = 1
        },
        setPage(state, action: PayloadAction<types.SetPagePayload>) {
            const { page } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.page = page
        },
        setRole(state, action: PayloadAction<types.SetRolePayLoad>) {
            const { role } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.query.role = role;
        }
    },
    extraReducers: builder => {
        builder.addCase(initAction, (state, action) => {
            const { login } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.query.login = login;
        })

        builder.addCase(fetchPullRequests.pending, (state) => {
            state.loading = LoadingStatus.Loading;
            state.q = buildQuery(state.query)
        })

        builder.addCase(fetchPullRequests.rejected, (state) => {
            state.loading = LoadingStatus.Failed;
        })

        builder.addCase(fetchPullRequests.fulfilled, (state, action) => {
            const { total, items } = action.payload;

            state.loading = LoadingStatus.Success;
            state.total = total;
            state.items = items;
        })
    }
})
