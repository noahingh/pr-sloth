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
            fullName: 'octocat/pr-sloth',
            title: 'Add a new component.',
        },
        {
            fullName: 'octocat/pr-sloth',
            title: 'Add a new component.',
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
            fullName: 'octocat/pr-sloth',
            title: 'Add foo component.',
        },
        {
            fullName: 'octocat/pr-sloth',
            title: 'Add bar component.',
        },
        {
            fullName: 'octocat/pr-sloth',
            title: 'Add baz component.',
        }
    ],
};
