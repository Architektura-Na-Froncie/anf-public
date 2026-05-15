import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click' },
    disabled: { control: 'boolean' },
    variant: {
      table: {
        disable: true
      }
    }
  },
} as Meta;

const Template: Story<ComponentProps<typeof Button>> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: "PRIMARY",
  children: "Primary action",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "SECONDARY",
  children: "Secondary action",
};

export const Disabled = Template.bind({});
Disabled.args = {
  variant: "PRIMARY",
  disabled: true,
  children: "Primary action",
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: "OUTLINED",
  children: "Outlined action",
};
