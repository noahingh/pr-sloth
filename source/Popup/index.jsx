import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import {configureStore} from '../core/adapters/redux';
import Popup from './Popup';
import { actions } from '../core/adapters/redux';

import 'antd/dist/antd.css';

const store = configureStore();

// TODO: get github token from browser store.

// init store
store.dispatch(actions.setToken(''))
store.dispatch(actions.buildQuery())

ReactDOM.render(
    <Provider store={store}>
       <Popup />
    </Provider>
, document.getElementById('popup-root'));
