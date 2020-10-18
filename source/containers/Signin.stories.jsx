// TODO: Fix storybook.
// https://github.com/storybookjs/storybook/issues/10467
import React from 'react';
import { Signin } from './Signin';
import { actions } from '../core/adapters/redux';

export default {
    title: 'Views/Signin',
    component: Signin,
}

const Template = (args) => <Signin {...args} />

export const Default = Template.bind({});
Default.args = {
    signinStatus: actions.SIGNIN_SUCCESS,
    signin: (values) => { console.log(values) },
};

export const Loading = Template.bind({});
Loading.args = {
    signinStatus: actions.SIGNIN_LOADING,
    signin: (values) => { console.log(values) },
};
