import produce from "immer";

import { Paginator, QueryBuilder } from '../../../models';
import {
    PullsState,
    PullsListState,
    PullsQueryState,
} from '../global';
import {
    FETCH_PULL_REQUESTS_LOADING,
    FETCH_PULL_REQUESTS_SUCCESS,
    BUILD_QUERY,
    PullsAction,
    SET_PAGE,
} from './types';

const initState: PullsState = {
    list: {
        type: '',
        items: [],
        paginator: new Paginator({ total: 0, perPage: 3 })
    },
    query: {
        builder: new QueryBuilder(),
    }
};

export function pullsReducer(
    state = initState,
    action: PullsAction,
): PullsState {
    const {
        list,
        query,
    } = state;

    return {
        list: listReducer(list, action),
        query: queryReducer(query, action)
    };
}

function listReducer(
    state: PullsListState,
    action: PullsAction,
): PullsListState {
    const {
        type
    } = action;

    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                type,
                paginator: produce(state.paginator, draft => {
                    draft.setPage(action.page);
                })
            };
        case FETCH_PULL_REQUESTS_LOADING:
            return {
                ...state,
                type,
            };
        case FETCH_PULL_REQUESTS_SUCCESS:
            const {
                total,
                page,
                perPage,
                items,
            } = action;

            return {
                ...state,
                type,
                items,
                paginator: produce(state.paginator, draft => {
                    draft.reset({ total, perPage });
                    draft.setPage(page);
                }),
            };
        default:
            return state
    }

}

function queryReducer(
    state: PullsQueryState,
    action: PullsAction,
): PullsQueryState {
    switch (action.type) {
        case BUILD_QUERY:
            const {
                role,
                login,
            } = action;

            return {
                ...state,
                builder: produce(state.builder, draft => {
                    draft.login = login;
                    draft.role = role;
                })
            };
        default:
            return state
    }
}
