import React from 'react';
import { Main } from './Main';

export default {
    title: 'Views/Main',
    component: Main,
}
const Template = (args) => <Main {...args} />

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
