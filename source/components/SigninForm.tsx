import React from 'react';
import { Octokit } from '@octokit/rest'
import { Form, Input, Button } from 'antd';

export type SigninFormProps = {
    signin(values: any): void;
};

export default class SigninForm extends React.Component<SigninFormProps> {
    async validateToken(token: string) {
        const octokit = new Octokit({ auth: token });
        await octokit.users.getAuthenticated();
    }

    render() {
        return (
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
                        { validator: async (_, token) => { await this.validateToken(token); } },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" style={{ width: '330px' }}>Sign in</Button>
                </Form.Item>
            </Form>
        )
    }

}
