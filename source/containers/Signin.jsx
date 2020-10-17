import React from 'react';
import { connect } from 'react-redux'
import { Octokit } from '@octokit/rest'
import { Form, Input, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { actions } from '../core/adapters/redux';
import * as browser from '../core/adapters/browser';

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
                <div>
                    <Form
                        name="signin"
                        validateTrigger="onSubmit"
                        onFinish={this.props.setToken}
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
                            <Button type="primary" htmlType="submit">
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </section >
        )
    }
}

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        setToken: (values) => {
            const { token } = values;
            // TODO: make to re-use.
            browser.storeToken(token);
            dispatch(actions.setToken(token))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
