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
    items: [
        {
            number: 10,
            title: 'Add a foo component.',
            body: 'I want to add a foo component.',
            creator: 'sloth',
            createdAt: new Date('2020-09-12T20:10:41Z'),
            repoFullName: 'octocat/pr-sloth',
        },
        {
            number: 12,
            title: 'Add a bar component.',
            body: 'I want to add a bar component.',
            creator: 'sloth',
            createdAt: new Date('2020-10-13T20:10:41Z'),
            repoFullName: 'octocat/pr-sloth',
        }
    ],
};
