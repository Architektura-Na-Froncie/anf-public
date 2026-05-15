# [visualizer demo](https://xstate.js.org/viz/?gist=726a78a2a4dc7f6283201fb58af125ff)

```js
// CORRECT SUBMIT EVENT:
// {
//   "type": "SUBMIT",
//   "password": "1234"
// }

// pure mocks

const delay = (time) => {
  return new Promise((res, rej) => {
    setTimeout(res, time)
  })
}

const getTokenInstruction = async () => {
  await delay(1500)
  return {
    instruction: "Wpisz hasło SMS",
    tokenId: "1111-2222-3333-4444"
  }
}

const sendTokenCode = async (params) => {
  await delay(1500)
  if (params.tokenCode.length !== 4){
    throw new Error(`Invalid confirmation token!`)
  }
}

// /api
/*
const BASE_URL = `http://localhost:3000`

const getTokenInstruction = () =>
  fetch(`${BASE_URL}/token`, { method: 'POST' })
  .then(response => response.json())

const sendTokenCode = (params) => 
  fetch(`${BASE_URL}/token/${params.tokenId}`, { method: 'POST', body: JSON.stringify(params) })
  .then(response => response.json())
*/
// machine

Machine({
  id: 'AuthorizeDevice',
  initial: 'chooseMethod',
  context: {
    error: false
  },
  states: {
    chooseMethod: {
      on: {
        CHOOSE_ALLOW_ONCE: 'loadingAllowOnceToken',
        CHOOSE_ADD_DEVICE: 'addDeviceForm',
        CHOOSE_LOGOUT: 'loggedOut',
      }
    },
    loggedOut: {
      type: 'final',
      entry: ['onLogout']
    },
    failure: {
      type: 'final'
    },
    loadingAllowOnceToken: {
      invoke: {
        id: 'getTokenInstruction',
        src: (context, event) => getTokenInstruction(),
        onDone: {
          target: 'allowOnceToken',
          actions: assign({
            tokenInstruction: (_, event) => event.data
          })
        },
        onError: 'failure'
      }
    },
    allowOnceToken: {
      on: {
        CANCEL_CHOICE: 'chooseMethod',
        SUBMIT: 'submittingAllowOnceToken'
      }
    },
    submittingAllowOnceToken: {
      invoke: {
        id: 'sendTokenCode',
        src: (context, { password }) => sendTokenCode({
          tokenId: context.tokenInstruction.tokenId,
          tokenCode: password,
        }),
        onDone: {
          target: 'allowOnceSuccess'
        },
        onError: {
          target: 'allowOnceToken',
          actions: assign({ error: (context, event) => true }),
        },
      }
    },
    allowOnceSuccess: {
      type: 'final',
      entry: ['onSuccess'],
    },
    addDeviceForm: {
      on: {
        SUBMIT_DEVICE_NAME: {
          actions: assign({ deviceName: (context, { deviceName }) => deviceName }),
          target: 'loadingAddDeviceToken'
        }
      }
    },
    loadingAddDeviceToken: {
      invoke: {
        id: 'getTokenInstruction',
        src: (context, event) => getTokenInstruction(),
        onDone: {
          target: 'addDeviceToken',
          actions: assign({
            tokenInstruction: (_, event) => event.data
          })
        },
        onError: 'failure'
      }
    },
    addDeviceToken: {
      on: {
        CANCEL_CHOICE: 'chooseMethod',
        SUBMIT: 'submittingAddDeviceToken',
        RESET_TOKEN: {
          target: 'loadingAddDeviceToken',
          actions: assign({ error: (context, event) => false }),
        }
      }
    },
    submittingAddDeviceToken: {
      invoke: {
        id: 'sendTokenCode',
        src: (context, { password }) => sendTokenCode({
          tokenId: context.tokenInstruction.tokenId,
          tokenCode: password,
        }),
        onDone: {
          target: 'addDeviceConfirmation'
        },
        onError: {
          target: 'addDeviceToken',
          actions: assign({ error: (context, event) => true }),
        },
      }
    },
    addDeviceConfirmation: {
      on: {
        CONFIRM_DEVICE_ADDED: "addDeviceSuccess"
      }
    },
    addDeviceSuccess: {
      type: 'final',
      entry: ['onSuccess'],
    },
  }
})
```
