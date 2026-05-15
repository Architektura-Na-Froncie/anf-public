import { Meta } from '@storybook/react/types-6-0';

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('Rendering').toString(),
  argTypes: {
  },
} as Meta;

export * from './react-refs-lost-update.stories'
export * from './react-keys-unmount.stories'
export * from './react-keys-index.stories'
