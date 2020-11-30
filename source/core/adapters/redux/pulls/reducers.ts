import { PullsState, PullsListState } from '../global';
import { FETCH_PULL_REQUESTS_LOADING, FETCH_PULL_REQUESTS_SUCCESS, PullsAction } from './types';

const initState: PullsState = {
    list: {
        type: '',
        total: 0,
        page: 1,
        perPage: 3,
        items: [],
    }
};

export function pullsReducer(
    state = initState,
    action: PullsAction,
): PullsState {
    const {
        list,
    } = state;

    return {
        list: listReducer(list, action),
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
                total,
                page,
                perPage,
                items
            };
        default:
            return state
    }

}
