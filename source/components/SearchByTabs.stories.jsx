import React from 'react';
import SearchByTabs from './SearchByTabs';

export default {
    title: 'Component/SearchByTabs',
    component: SearchByTabs,
}
const Template = (args) => <SearchByTabs {...args} />

export const Default = Template.bind({});
Default.args = {
    items: [
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
    onChange: function(value) {
        
    }
};
