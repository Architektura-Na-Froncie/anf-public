# [visualizer demo](https://xstate.js.org/viz/?gist=e3fe04a7952d376addb69f48dd7ccbe0)

```js
Machine({
  id: 'AuthorizeDevice',
  initial: 'chooseMethod',
  states: {
    chooseMethod: {
      on: {
        CHOOSE_ALLOW_ONCE: 'allowOnceToken',
        CHOOSE_ADD_DEVICE: 'addDeviceForm',
        CHOOSE_LOGOUT: 'loggedOut',
      }
    },
    loggedOut: {
      type: 'final',
      entry: ['onLogout']
    },
    allowOnceToken: {
      on: {
        CANCEL_CHOICE: 'chooseMethod',
        SUBMIT: 'allowOnceSuccess',
      }
    },
    allowOnceSuccess: {
      type: 'final',
      entry: ['onSuccess'],
    },
    addDeviceForm: {
      on: {
        SUBMIT_DEVICE_NAME: "addDeviceToken"
      }
    },
    addDeviceToken: {
      on: {
        CANCEL_CHOICE: 'chooseMethod',
        RESET_TOKEN: "addDeviceToken",
        SUBMIT: "addDeviceConfirmation"
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
