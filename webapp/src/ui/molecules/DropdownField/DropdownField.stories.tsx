import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { DropdownField } from './DropdownField';

export default {
  title: 'Molecules/DropdownField',
  component: DropdownField,
  argTypes: {
    onChange: { action: 'change' },
    items: { control: 'object' },
  },
  args: {
    id: "DropdownField-sample",
    layoutDirection: "horizontal",
    items: {},
  },
} as Meta;

const Template: Story<ComponentProps<typeof DropdownField>> =
  (args) => <DropdownField {...args} />;


export const Default = Template.bind({});
Default.args = {
  label: 'Default',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  label: 'Disabled',
};

export const IncludeEmpty = Template.bind({});
IncludeEmpty.args = {
  label: 'Include empty',
  includeEmpty: true,
};

export const Error = Template.bind({});
Error.args = {
  label: 'Error',
  error: "Musisz wybrać wartość"
};
