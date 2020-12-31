import { pullsSlice, init, fetchPullRequests } from './slice';

const actions = {
    ...pullsSlice.actions,
    init,
    fetchPullRequests,
}
const reducer = pullsSlice.reducer;

export {
    actions,
    reducer
}
export * as types from './types';
