# [visualizer demo](https://xstate.js.org/viz/?gist=d0dbaec7069c1e79114f97f93eaea2af)

```js
Machine({
  id: 'AuthorizeDevice',
  initial: 'chooseMethod',
  states: {
    chooseMethod: {
      on: {
        CHOOSE_ADD_DEVICE: 'addDeviceForm',
      }
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
    },
  }
})
```
