import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { SIGNIN_LOADING, SIGNIN_SUCCESS } from './types';
import { signin } from './actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

test('login success', () => {
  // Mock Github API.
  nock('https://api.github.com').get('/user').times(1).reply(200, {
    login: 'sloth',
  });

  const store = mockStore({ 
    search: { token: '', login: '' },
  });
  const expectedActions = [
    {
      type: SIGNIN_LOADING,
    },
    {
      type: SIGNIN_SUCCESS,
      token: 'token',
      login: 'sloth'
    },
  ];

  return store.dispatch<any>(signin('token'))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})
