import { Octokit } from '@octokit/rest';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState, PullsState, LoadingStatus } from '../global';
import { Paginator, QueryBuilder, Role } from '../../../models';
import { mapPullRequestData } from './mapper';
import * as types from './types';

export const fetchPullRequests = createAsyncThunk<
    types.FetchPullRequestsPayLoad,
    unknown,
    { state: RootState }
>(
    'pulls/fetchPullRequests',
    async (_, { getState, rejectWithValue }) => {
        const { signin, pulls, } = getState();
        const { token } = signin;
        const { builder, paginator } = pulls
        const q = builder.buildQuery();
        try {
            const octokit = new Octokit({ auth: token });

            const { data } = await octokit.search.issuesAndPullRequests({
                q,
                page: paginator.page,
                per_page: paginator.perPage,
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

// TODO: rename into buildQuery.
export const setRole = createAsyncThunk<
    types.SetRolePayLoad,
    Role,
    { state: RootState }
>(
    'pulls/setRole',
    async (role, { getState }) => {
        const { login } = getState().signin;
        return {
            role,
            login,
        }
    },
)

const initialState: PullsState = {
    loading: LoadingStatus.Idle,
    items: [],
    paginator: new Paginator(0),
    builder: new QueryBuilder(),
};

export const pullsSlice = createSlice({
    name: 'pulls',
    initialState,
    reducers: {
        setPage(state, action: PayloadAction<types.SetPagePayload>) {
            const { page } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.paginator.setPage(page);
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchPullRequests.pending, (state) => {
            state.loading = LoadingStatus.Loading;
        })

        builder.addCase(fetchPullRequests.rejected, (state) => {
            state.loading = LoadingStatus.Failed;
        })

        builder.addCase(fetchPullRequests.fulfilled, (state, action) => {
            const { total, items } = action.payload;

            state.loading = LoadingStatus.Success;
            state.paginator.total = total;
            state.items = items;
        })

        builder.addCase(setRole.fulfilled, (state, action) => {
            const { role, login } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.paginator.reset(0);
            state.builder.login = login;
            state.builder.role = role;
        })
    }
})
