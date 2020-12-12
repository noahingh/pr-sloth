import React from 'react';
import SigninForm from './SigninForm';

export default {
    title: 'Components/SigninForm',
    component: SigninForm,
}
const Template = (args) => <SigninForm {...args} />

export const Default = Template.bind({});
Default.args = {
    signin: (values) => {
        const { token } = values;
        console.log('token: ' + token)
    }
};
