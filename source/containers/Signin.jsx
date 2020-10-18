import React from 'react';
import { connect } from 'react-redux'
import { Octokit } from '@octokit/rest'
import { Form, Input, Button, Spin } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { actions } from '../core/adapters/redux';

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
                <div style={{ textAlign: 'center' }}>
                    {this.props.signinStatus === actions.SIGNIN_LOADING ?
                        <Spin tip="Signing in..." />
                        :
                        < Form
                            name="signin"
                            validateTrigger="onSubmit"
                            onFinish={this.props.signin}
                        >
                            <Form.Item
                                label="Github Token"
                                name="token"
                                rules={[
                                    { required: true, message: 'Please input your Github token!' },
                                    {
                                        validator: async (_, token) => {
                                            await this.validateToken(token);
                                        }
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item >
                                <Button type="primary" htmlType="submit" style={{ width: '330px' }}>
                                    Sign in
                            </Button>
                            </Form.Item>
                        </Form>


                    }
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    const { search } = state;
    const { signinStatus } = search;
    return {
        signinStatus,
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
