import React from 'react';
import { connect } from 'react-redux'
import { Octokit } from '@octokit/rest'
import { Form, Input, Button, Spin } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

import { signin } from '../core/adapters/redux';
import SigninForm from '../components/SigninForm';

const { types, actions } = signin;

export class Signin extends React.Component {
    async validateToken(token) {
        const octokit = new Octokit({ auth: token });
        await octokit.users.getAuthenticated();
    }

    render() {
        return (
            <section style={{ minWidth: '350px', padding: '30px 20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <GithubOutlined style={{ fontSize: '60px', color: 'black' }} />
                    <h1>Sign in to GitHub</h1>
                </div>
                {this.props.isSigning ?
                    <div style={{ textAlign: 'center' }}><Spin tip="Signing in..." /></div>
                    :
                    <div ><SigninForm signin={this.props.signin}></SigninForm></div>
                }
            </section >
        )
    }
}

function mapStateToProps(state) {
    const { type } = state.signin;
    return {
        isSigning: (type == types.SIGNIN_LOADING) ? true : false,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        signin: (values) => {
            const { token } = values;
            dispatch(actions.signin(token))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
