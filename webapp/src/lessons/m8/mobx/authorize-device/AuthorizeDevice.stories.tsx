import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';

import { AuthorizeDeviceProcessMobx as AuthorizeDeviceProcess } from './AuthorizeDeviceProcessMobx'
import { AuthorizeDeviceStore } from './store/AuthorizeDeviceStore';
import { tokenMockHandlers } from 'api/mock/token.mock';

import { Panel } from 'ui/layout';
import { Button } from 'ui/atoms'

import { lessons } from 'stories';
export default {
  title: lessons.m8.add('MobX').toString(),
  parameters: {
    msw: tokenMockHandlers
  },
  argTypes: {}
} as Meta;

const notify = action('notify')

// no boolean obsession
export const AuthorizeDevice = () => {
  const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "LOGGED_OUT">("CLEAN")
  const start = () => { setStatus("RUNNING") }

  const successFn = () => {
    setStatus("SUCCESS")
    notify('succeeded')
  }

  const logoutFn = () => {
    setStatus("LOGGED_OUT")
    notify('logged out')
  }

  return <Panel>
    { (status === "SUCCESS") && <div>authorization succeeded</div> }
    { (status === "LOGGED_OUT") && <div>logged out</div> }
    {!(status === "RUNNING")
    ? <Button
        variant="PRIMARY"
        onClick={start}
      >autoryzuj urządzenie</Button>
    : <AuthorizeDeviceProcess
        onSuccess={successFn}
        onLogout={logoutFn}
        store={new AuthorizeDeviceStore()}
      />}
  </Panel>
}
