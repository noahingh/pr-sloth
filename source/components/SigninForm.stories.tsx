import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import SigninForm, { SigninFormProps } from './SigninForm';

export default {
    title: 'Components/SigninForm',
    component: SigninForm,
} as Meta;

const Template: Story<SigninFormProps> = (args: any) => <SigninForm {...args} />

export const Default = Template.bind({})
Default.args = {
    signin: (values: any) => {
        const { token } = values;
        console.log('token: ' + token)
    }
};
