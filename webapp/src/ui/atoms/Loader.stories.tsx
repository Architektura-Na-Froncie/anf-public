import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Loader } from './Loader';

export default {
  title: 'Atoms',
  component: Loader,
  argTypes: {
    fillColor: { control: "color" }
  },
} as Meta;

const Template: Story<ComponentProps<typeof Loader>> = (args) => <Loader {...args} />;

export const _Loader = Template.bind({});
_Loader.args = {};
