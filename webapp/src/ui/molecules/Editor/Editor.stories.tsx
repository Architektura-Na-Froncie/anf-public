import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Editor } from './Editor';

export default {
  title: 'Molecules/Editor',
  component: Editor,
  argTypes: {},
} as Meta;

const Template: Story<ComponentProps<typeof Editor>> =
  (args) => <Editor {...args} />;

export const Standard = Template.bind({});
Standard.args = {
};
