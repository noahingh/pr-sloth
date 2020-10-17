import React from 'react';
import PRList from './PRList';

export default {
    title: 'Components/PRList',
    component: PRList,
}
const Template = (args) => <PRList {...args} />

export const Default = Template.bind({});
Default.args = {
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
};

export const Pagination = Template.bind({});
Pagination.args = {
    totalCount: 6,
    page: 2,
    perPage: 3,
    pullRequests: [
        {
            repoFullName: 'octocat/pr-sloth',
            pullRequestTitle: 'Add foo component.',
        },
        {
            repoFullName: 'octocat/pr-sloth',
            pullRequestTitle: 'Add bar component.',
        },
        {
            repoFullName: 'octocat/pr-sloth',
            pullRequestTitle: 'Add baz component.',
        }
    ],
};
