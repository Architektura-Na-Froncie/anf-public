import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { getTokenInstruction, sendTokenCode, TokenInstruction } from 'api/token'
import { RenderResult } from '@testing-library/react'

import { Loader } from "ui/atoms"

// MACHINE

import { Machine, assign } from 'xstate';
import { useMachine } from '@xstate/react';

interface AuthorizeDeviceContext {
  tokenInstruction?: TokenInstruction
  deviceName?: string
  error: boolean
}

export type AuthorizeDeviceEvent =
  | { type: 'CHOOSE_ALLOW_ONCE' }
  | { type: 'CHOOSE_ADD_DEVICE' }
  | { type: 'CHOOSE_LOGOUT' }
  | { type: 'CANCEL_CHOICE' }
  | { type: 'SUBMIT', password: string }
  | { type: 'SUBMIT_DEVICE_NAME', deviceName: string }
  | { type: 'RESET_TOKEN' }
  | { type: 'CONFIRM_DEVICE_ADDED' }

export const authorizeDeviceMachine = Machine<AuthorizeDeviceContext, any, AuthorizeDeviceEvent>({
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
      },
      meta: {
        test: ({ getByRole }: RenderResult) => {
          const chooseAddDeviceButton = getByRole("button", { name: "zapisz to urządzenie jako zaufane" })
          const chooseAllowOnceButton = getByRole("button", { name: "jednorazowy wjazd do apki" })
          expect(chooseAddDeviceButton).toBeEnabled()
          expect(chooseAllowOnceButton).toBeEnabled()
        }
      }
    },
    loggedOut: {
      type: 'final',
      entry: ['onLogout']
    },
    failure: {
      type: 'final',
      // 🔥 przydałaby się obsługa błędów (nie onLogout, tylko błędu technicznego np. API; więcej w module "Obsługa Błędów")
      // entry: ['onFailure']
    },
    loadingAllowOnceToken: {
      invoke: {
        src: 'getTokenInstruction',
        onDone: {
          target: 'allowOnceToken',
          actions: assign({
            // ⚠️ type-unsafe
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            tokenInstruction: (_, event) => event.data
          })
        },
        onError: 'failure'
      },
    },
    allowOnceToken: {
      on: {
        CANCEL_CHOICE: 'chooseMethod',
        SUBMIT: 'submittingAllowOnceToken'
      }
    },
    submittingAllowOnceToken: {
      invoke: {
        src: 'sendTokenCode',
        onDone: {
          target: 'allowOnceSuccess'
        },
        // 🔥 jeśli 401 (zły kod) to powrót do formularza
        // 🔥 ale jeśli 500, to powinno być failure
        // 🔥 quasi-pattern-matching
        onError: [{
          cond: (context, { data }) => {
            return data?.response?.status === 401
          },
          actions: assign({ error: (context, event) => true }),
          target: 'allowOnceToken',
        }, {
          // 🔥 no condition == catch-all (tak jak switch-case/default)
          target: 'failure'
        }],
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
        id: 'getTokenInstruction', // potrzebne aby dostać event done.invoke.getTokenInstruction
        src: 'getTokenInstruction',
        onDone: {
          target: 'addDeviceToken',
          actions: assign({
            // ⚠️ type-unsafe
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            tokenInstruction: (_, event) => event.data
          })
        },
        onError: 'failure'
      },
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
        id: 'sendTokenCode', // potrzebne aby dostać event done.invoke.sendTokenCode
        src: 'sendTokenCode',
        onDone: {
          target: 'addDeviceConfirmation'
        },
        // 🔥 jeśli 401 (zły kod) to powrót do formularza
        // 🔥 ale jeśli 500, to powinno być failure
        // 🔥 quasi-pattern-matching
        onError: [{
          cond: (context, { data }) => {
            return data?.response?.status === 401
          },
          actions: assign({ error: (context, event) => true }),
          target: 'addDeviceToken',
        }, {
          // 🔥 no condition == catch-all (tak jak switch-case/default)
          target: 'failure'
        }],
      }
    },
    addDeviceConfirmation: {
      on: {
        CONFIRM_DEVICE_ADDED: 'addDeviceSuccess'
      }
    },
    addDeviceSuccess: {
      type: 'final',
      // 🔥 komponent SuccessView obsługuje callback, ale równie dobrze mogłaby obsługiwać to maszyna stanowa
      // entry: ['onSuccess'],
    },
  }
}, {
  services: {
    getTokenInstruction: (context, event) => getTokenInstruction(),
    sendTokenCode: (context, { password }: any) => sendTokenCode({ // ⚠️ type-unsafe any
      tokenId: context.tokenInstruction!.tokenId, // ⚠️ type-unsafe: !
      tokenCode: password,
    }),
  }
})

// UI

interface AuthorizeDeviceProcessReduxProps {
  onSuccess: () => void
  onLogout: () => void
}

export const AuthorizeDeviceProcessXState = (props: AuthorizeDeviceProcessReduxProps) => {
  const { onSuccess, onLogout } = props

  const [state, send] = useMachine(authorizeDeviceMachine, {
    actions: {
      onSuccess: (context, event) => { onSuccess() },
      onLogout: (context, event) => { onLogout() },
    }
  });

  switch(state.value){
    case "loadingAllowOnceToken":
    case "submittingAllowOnceToken":
    case "loadingAddDeviceToken":
    case "submittingAddDeviceToken":
      return <Loader />

    case "chooseMethod":
      return <AuthorizeDeviceChooseMethodView
        onAddDeviceToTrusted={() => send("CHOOSE_ADD_DEVICE")}
        onAllowDeviceOnce={() => send("CHOOSE_ALLOW_ONCE")}
        onLogout={() => send("CHOOSE_LOGOUT")}
      />

    case "allowOnceToken":
      return <AuthorizeDeviceAllowOnceTokenView
        onSubmit={password => send("SUBMIT", { password })}
        onCancel={() => send("CANCEL_CHOICE")}
        instruction={state.context.tokenInstruction!.instruction} // ⚠️ type-unsafe: !
        error={state.context.error}
      />

    case "allowOnceSuccess":
      return null

    case "addDeviceForm":
      return <AuthorizeDeviceAddDeviceFormView
        onSubmit={(deviceName) => send("SUBMIT_DEVICE_NAME", { deviceName })}
      />

    case "addDeviceToken":
      return <AuthorizeDeviceAddDeviceTokenView
        deviceName={state.context.deviceName!} // ⚠️ type-unsafe: !
        instruction={state.context.tokenInstruction!.instruction} // ⚠️ type-unsafe: !
        onSubmit={password => send("SUBMIT", { password })}
        onReset={() => send("RESET_TOKEN")}
        onCancel={() => send("CANCEL_CHOICE")}
        error={state.context.error}
      />

    case "addDeviceConfirmation":
      return <AuthorizeDeviceAddDeviceConfirmationView
        deviceName={state.context.deviceName!} // ⚠️ type-unsafe: !
        onClose={onSuccess}
      />

    case "addDeviceSuccess":
      return null

    case "cancelled":
      return null
  }

  return <h1>{state.value}</h1>
}
