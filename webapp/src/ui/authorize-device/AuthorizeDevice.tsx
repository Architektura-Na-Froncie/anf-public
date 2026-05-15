import React, { useState } from 'react';
import { AuthorizeDeviceProcessPrimitive as AuthorizeDeviceProcess } from 'lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessPrimitive';
// import { AuthorizeDeviceProcessUnion as AuthorizeDeviceProcess } from 'lessons/m6/authorize-device/hooks/AuthorizeDeviceProcessUnion';
// import { AuthorizeDeviceProcessReduxWithStore as AuthorizeDeviceProcess } from 'lessons/m6/authorize-device/redux/AuthorizeDeviceProcessRedux';
// import { AuthorizeDeviceProcessXState as AuthorizeDeviceProcess } from 'lessons/m6/authorize-device/xstate/AuthorizeDeviceProcessXState';

import { Button } from 'ui/atoms';
import { Panel } from 'ui/layout';

export const AuthorizeDevice: React.FC = () => {
  const [status, setStatus] = useState<"CLEAN" | "RUNNING" | "SUCCESS" | "LOGGED_OUT">("CLEAN")
  const start = () => { setStatus("RUNNING") }

  const successFn = () => setStatus("SUCCESS")
  const logoutFn = () => setStatus("LOGGED_OUT")

  return <Panel>
    { (status === "SUCCESS") && <div>authorization succeeded</div> }
    { (status === "LOGGED_OUT") && <div>logged out</div> }
    {!(status === "RUNNING")
    ? <Button
        data-testid="btn-authorize-device"
        variant="PRIMARY"
        onClick={start}
      >autoryzuj urządzenie</Button>
    : <AuthorizeDeviceProcess
        onSuccess={successFn}
        onLogout={logoutFn}
      />}
  </Panel>
}
