/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { getStore } from './store';
import { EmployeesView } from './components/EmployeesView';

import { lessons } from 'stories';
export default {
  title: lessons.m5.add('Employee Plans').toString(),
} as Meta;

import { Provider } from 'react-redux';
const store = getStore()
export const _EmployeePlans = () => {
  return <Provider store={store}>
    <EmployeesView />
  </Provider>
}
