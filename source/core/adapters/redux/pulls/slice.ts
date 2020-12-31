import { Octokit } from '@octokit/rest';
import { createSlice, createAction, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { RootState, PullsState, LoadingStatus, AppThunk } from '../global';
import { Paginator, QueryBuilder } from '../../../models';
import { mapPullRequestData } from './mapper';
import * as types from './types';

/**
 * The init function initializes the pulls state,
 * it sets the login to build a query.
 */
export function init(): AppThunk {
    return (dispatch, getState) => {
        const { login } = getState().signin;

        dispatch(initAction(login))
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
        resetPage(state) {
            state.loading = LoadingStatus.Idle;
            state.paginator.reset();
        },
        setPage(state, action: PayloadAction<types.SetPagePayload>) {
            const { page } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.paginator.setPage(page);
        },
        setRole(state, action: PayloadAction<types.SetRolePayLoad>) {
            const { role } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.builder.role = role;
            console.log(role)
        }
    },
    extraReducers: builder => {
        builder.addCase(initAction, (state, action) => {
            const { login } = action.payload;

            state.loading = LoadingStatus.Idle;
            state.builder.login = login;
        })

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
    }
})
