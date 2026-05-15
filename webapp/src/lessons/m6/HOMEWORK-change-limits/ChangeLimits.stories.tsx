import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { ChangeLimitsProcess } from './ChangeLimitsProcess';

import { lessons } from 'stories';
export default {
  title: lessons.m6.add('Change Limits').toString(),
  parameters: {
  },
  argTypes: {}
} as Meta;

const notify = action('notify')

export const _ChangeLimitsProcessMachine = () => {
  const successFn = () => {
    notify('succeeded')
  }

  const cancelFn = () => {
    notify('cancelled')
  }

  return <ChangeLimitsProcess
    onSuccess={successFn}
    onCancel={cancelFn}
  />
}
