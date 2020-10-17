import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from '../core/adapters/redux';
import Popup from './Popup';
import { actions } from '../core/adapters/redux';
import * as browser from '../core/adapters/browser';

import 'antd/dist/antd.css';

const store = configureStore();

browser.fetchToken().then((token) => {
    if (token === undefined) {
        token = '';
    }

    // init store
    store.dispatch(actions.setToken(token))
})

ReactDOM.render(
    <Provider store={store}>
        <Popup />
    </Provider>
    , document.getElementById('popup-root'));
