import React, { ComponentProps } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { useArgs } from '@storybook/client-api';

import { Modal } from './Modal';
import { Button, Typography } from 'ui/atoms';

export default {
  title: 'Molecules/Modal',
  component: Modal,
  argTypes: {
    isOpen: { type: 'boolean' },
  },
} as Meta;

const Template: Story<ComponentProps<typeof Modal>> = (args) => {
  const [, updateArgs] = useArgs();

  return (
    <Modal {...args} onRequestClose={() => updateArgs({ isOpen: false })}>
      <Typography variant="h1">Modal title</Typography>
      <Typography variant="body">Modal body goes here.</Typography>
      <Button variant="PRIMARY">Click me!</Button>
    </Modal>
  );
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
};
