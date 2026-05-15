import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextField } from './TextField';

export default {
  title: 'Molecules/TextField',
  component: TextField,
  argTypes: {
    onChange: { action: 'change' },
  },
  args: {
    id: "input-sample",
    label: "First name",
    layoutDirection: "horizontal",
  },
} as Meta;

const Template: Story<ComponentProps<typeof TextField>> =
  (args) => <TextField {...args} />;

export const Empty = Template.bind({});
Empty.args = {
};

export const Default = Template.bind({});
Default.args = {
  defaultValue: "Zenon",
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "first name",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  defaultValue: "Zenon",
};

export const Password = Template.bind({});
Password.args = {
  label: "hasło",
  type: "password",
};

export const LayoutHorizontal = Template.bind({});
LayoutHorizontal.args = {
  layoutDirection: "horizontal",
  label: "bardzo długi opis pola które należy wypełnić"
};

export const Error = Template.bind({});
Error.args = {
  error: "Nieprawidłowa wartość",
  defaultValue: "X Æ A-12"
};
