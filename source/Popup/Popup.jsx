import React from 'react';
import { connect } from 'react-redux'
import Main from '../containers/Main';
import Signin from '../containers/Signin';
import * as browser from '../core/adapters/browser';

export class Popup extends React.Component {
    render() {
        return (
            this.props.hasSignin ?
                <Main /> :
                <Signin />
        )
    }
}

function mapStateToProps(state) {
    const { search } = state;
    const { token, login } = search;

    // every time caching token and login.
    browser.cacheTokenLogin({token, login});

    return {
        hasSignin: token !== '' ? true : false,
    };
}

export default connect(mapStateToProps)(Popup);
