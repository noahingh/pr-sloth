// TODO: Fix storybook.
// https://github.com/storybookjs/storybook/issues/10467
import React from 'react';
import { Signin } from './Signin';

export default {
    title: 'Views/Signin',
    component: Signin,
}

const Template = (args) => <Signin {...args} />

export const Default = Template.bind({});
Default.args = {
    signin: (values) => { console.log(values) },
};
