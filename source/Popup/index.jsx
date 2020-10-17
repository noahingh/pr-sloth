import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {configureStore} from '../core/adapters/redux';
import Main from '../containers/Main';
import { actions } from '../core/adapters/redux';

import 'antd/dist/antd.css';

const store = configureStore();

// TODO: get github token from browser store.

// init store
store.dispatch(actions.setToken(''))

ReactDOM.render(
    <Provider store={store}>
       <Main />
    </Provider>
, document.getElementById('popup-root'));
