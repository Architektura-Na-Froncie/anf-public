import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Dropdown } from './Dropdown';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
  argTypes: {
    disabled: { control: 'boolean' },
    items: { control: 'object' },
  },
  args: {
    items: { "foo": "Foo", "bar": "Bar", "baz": "Baz" },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Dropdown>> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Error = Template.bind({});
Error.args = {
  error: true,
};
