import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { signin } from './slice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('login success', () => {
    // Mock Github API.
    nock('https://api.github.com').get('/user').times(1).reply(200, {
        login: 'sloth',
    });

    const store = mockStore({});
    const expectedPayloads = [
        undefined,
        {
            token: 'token',
            login: 'sloth'
        },
    ];

    return store.dispatch<any>(signin('token'))
        .then(() => {
            expect(store.getActions().map(action => action.payload)).toEqual(expectedPayloads)
        })
})
