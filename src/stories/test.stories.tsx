import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import button from '../components/Button/button'

export default {
  title: 'test/button2号',
  component: button,
} as ComponentMeta<typeof button>;

const Template: ComponentStory<typeof button> = (args) => <button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  btnType: 'danger',
  size: 'lg'
};