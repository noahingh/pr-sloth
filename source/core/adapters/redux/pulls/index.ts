import { pullsSlice, fetchPullRequests, setRole } from './slice';

const actions = {
    ...pullsSlice.actions,
    fetchPullRequests,
    setRole,
}
const reducer = pullsSlice.reducer;

export {
    actions,
    reducer
}
export * as types from './types';
