import React from 'react';
import { Popup } from './Popup';

export default {
    title: 'Views/Popup',
    component: Popup,
}
const Template = (args) => <Popup {...args} />

export const Default = Template.bind({});
Default.args = {
    q: 'type:pr is:open author:sloth',
    totalCount: 2,
    page: 1,
    perPage: 3,
    pullRequests: [
        {
            repoFullName: 'octocat/pr-sloth',
            pullRequestTitle: 'Add a new component.',
        },
        {
            repoFullName: 'octocat/pr-sloth',
            pullRequestTitle: 'Add a new component.',
        }
    ],
    setSearchBy: function () { },
    setPage: function () {},
};
