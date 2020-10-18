import nock from 'nock'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {SIGNIN_SUCCESS, signin, SIGNIN_FAILED} from './query'

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
      type: SIGNIN_SUCCESS,
      token: 'token',
      login: 'sloth'
    },
  ];

  return store.dispatch(signin('token'))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})

test('login failed', () => {
  // unauthorized token
  nock('https://api.github.com').get('/user').times(1).reply(401, {
    "message": "Bad credentials",
  });

  const store = mockStore({ 
    search: { token: '', login: '' },
  });
  const expectedActions = [
    {
      type: SIGNIN_FAILED,
      e: new Error("Bad credentials"),
    },
  ];

  return store.dispatch(signin('token'))
      .then(() => {expect(store.getActions()).toEqual(expectedActions)})
})

