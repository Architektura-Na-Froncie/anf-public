import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { Button } from 'ui/atoms';
import { delay } from 'lib/async';
import { randomBetween } from 'lib/random';

import { lessons } from 'stories';
export default {
  title: lessons.m4.add('Hooks').toString(),
  argTypes: {
  },
} as Meta;

const apiCall = () => delay(randomBetween(1000, 2000))

const updateAction = action('count')

export const ReactStaleClosure = () => {
  const [count, setCount] = useState(0)

  return <Button
    variant="PRIMARY"
    onClick={async () => {
      updateAction(count + 1)
      await apiCall()
      // 👉 setState / stale closure:
      setCount(count + 1)
      // 👉 setState with callback
      // setCount(c => c + 1)
    }}
  >current count: {count}</Button>
}
