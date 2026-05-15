/* eslint-disable import/first */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

import { EmployeesView } from './EmployeesView';

import { lessons } from 'stories';
export default {
  title: lessons.m4.add('React Query').toString(),
} as Meta;

export const _EmployeePlans = () => {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>
    <EmployeesView />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
}
