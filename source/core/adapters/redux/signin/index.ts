import { signinSlice, signin } from './slice';

export const actions = {
    ...signinSlice.actions,
    signin,
}
export const reducer = signinSlice.reducer;
