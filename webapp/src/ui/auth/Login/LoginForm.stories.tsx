import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { LoginForm } from './LoginForm';

export default {
  title: 'Auth/LoginForm',
  component: LoginForm,
  argTypes: {
    onSubmit: { action: 'submit' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof LoginForm>> =
  (args) => <LoginForm {...args} />;

export const Standard = Template.bind({});
Standard.args = {
};
