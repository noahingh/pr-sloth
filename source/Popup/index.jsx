import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { configureStore } from '../core/adapters/redux';
import Popup from './Popup';
import { signin } from '../core/adapters/redux';
import * as browser from '../core/adapters/browser';

import 'antd/dist/antd.css';

const { actions } = signin;

const store = configureStore();

browser.retrieveTokenLogin().then(({ token, login }) => {
    if (token === undefined) {
        token = '';
    }

    // init store
    if (token !== '') {
        store.dispatch(actions.setSignin({ token, login }));
    }
})

ReactDOM.render(
    <Provider store={store}>
        <Popup />
    </Provider>
    , document.getElementById('popup-root'));
