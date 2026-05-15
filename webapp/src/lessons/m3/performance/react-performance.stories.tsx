import { Meta } from '@storybook/react/types-6-0';

import { lessons } from 'stories';
export default {
  title: lessons.m3.add('Performance').toString(),
  argTypes: {
  },
} as Meta;

export * from './CodeBlock.stories'
export * from './react-memo-children.stories'
export * from './react-usememo.stories'
