import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { TextArea } from './TextArea';

export default {
  title: 'Atoms/TextArea',
  component: TextArea,
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof TextArea>> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  defaultValue: "Text",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  defaultValue: "Disabled",
};

export const Error = Template.bind({});
Error.args = {
  error: true,
  defaultValue: "Error",
};
