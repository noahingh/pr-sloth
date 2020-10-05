import React from 'react';
import { Popup } from './Popup';

export default {
    title: 'Views/Popup',
    component: Popup,
}
const Template = (args) => <Popup {...args} />

export const Default = Template.bind({});
Default.args = {
    searchBys: [
        {
            display: 'Created',
            value: 'author',
        },
        {
            display: 'Assigned',
            value: 'assignee',
        },
        {
            display: 'Mentioned',
            value: 'mentions',
        },
        {
            display: 'Review requests',
            value: 'review-requested',
        },
    ],
    onSearchByChange: function () {},
    totalCount: 2,
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
    onPagination: function () { },
};
