import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import PRList, { PRListProps } from './PRList';

export default {
    title: 'Components/PRList',
    component: PRList,
} as Meta;

const Template: Story<PRListProps> = (args: any) => <PRList {...args} />

export const Default = Template.bind({});
Default.args = {
    total: 2,
    page: 1,
    perPage: 3,
    items: [
        {
            number: 10,
            title: 'Add a foo component.',
            body: 'I want to add a foo component.',
            htmlUrl: '',
            creator: 'sloth',
            createdAt: new Date('2020-09-12T20:10:41Z'),
            repoFullName: 'octocat/pr-sloth',
        },
        {
            number: 12,
            title: 'Add a bar component.',
            body: 'I want to add a bar component.',
            htmlUrl: '',
            creator: 'sloth',
            createdAt: new Date('2020-10-13T20:10:41Z'),
            repoFullName: 'octocat/pr-sloth',
        }
    ],
};
