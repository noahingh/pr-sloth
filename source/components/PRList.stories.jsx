import React from 'react';
import PRList from './PRList';

export default {
    title: 'Component/PRList',
    component: PRList,
}
const Template = (args) => <PRList {...args} />

export const Default = Template.bind({});
Default.args = {
    totalCount: 2,
    items: [
        {
            fullName: 'octocat/pr-sloth',
            title: 'Add a new component.',
        },
        {
            fullName: 'octocat/pr-sloth',
            title: 'Add a new component.',
        }
    ],
};
