import React from 'react';
import PRPopover from './PRPopover';

export default {
    title: 'Components/PRPopover',
    component: PRPopover,
}

const Template = (args) => <PRPopover {...args} >Hover here</PRPopover>

export const Default = Template.bind({});
Default.args = {
    title: 'feat(component): add a popover',
    number: 10,
    description: `I've added a new component Popover to display details of pull-request. 
        It includes a title and a descript.`
};
