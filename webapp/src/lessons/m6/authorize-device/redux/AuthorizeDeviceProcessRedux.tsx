import { createSlice, configureStore } from '@reduxjs/toolkit'
import { Provider, useDispatch, useSelector } from "react-redux"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { getTokenInstruction, sendTokenCode, TokenInstruction } from 'api/token'
import { AuthorizeDeviceState } from "lessons/m6/authorize-device/types"
import { assertState } from "../../state-members"

import { Loader } from "ui/atoms"

// ACTIONS + REDUCER = SLICE

export const authorizeDeviceSlice = createSlice({
  name: 'authorizeDevice',
  initialState: {
    type: "CHOOSE_METHOD"
  } as AuthorizeDeviceState,
  reducers: {
    loading: state => ({ type: "LOADING" }),
    cancelChoice: state => ({ type: "CHOOSE_METHOD" }),
    chooseLogout: state => ({ type: "LOGGED_OUT" }),

    allowOnceSuccess: state => ({ type: "ALLOW_ONCE_SUCCESS" }),
    addDeviceSuccess: state => ({ type: "ADD_DEVICE_SUCCESS" }),
    addDeviceForm: state => ({ type: "ADD_DEVICE_FORM" }),
    allowOnceToken: (state, action: {
      payload: TokenInstruction & {
        error: boolean
      }
    }) => ({
      type: "ALLOW_ONCE_TOKEN",
      ...action.payload,
    }),
    addDeviceToken: (state, action: {
      payload: TokenInstruction & {
        deviceName: string,
        error: boolean
      }
    }) => ({
      type: "ADD_DEVICE_TOKEN",
      ...action.payload,
    }),
    addDeviceConfirmation: (state, action: {
      payload: {
        deviceName: string,
      }
    }) => ({
      type: "ADD_DEVICE_CONFIRMATION",
      deviceName: action.payload.deviceName,
    }),
  }
})

// CONFIG

export const actions = authorizeDeviceSlice.actions

export const getStore = () => configureStore({
  reducer: {
    authorizeDevice: authorizeDeviceSlice.reducer
  },
  devTools: { // https://redux-toolkit.js.org/api/configureStore#devtools
    name: "Authorize Device Process"
  }
})

export type AppStore = ReturnType<typeof getStore>
type RootState = ReturnType<AppStore['getState']>
type Dispatch = AppStore['dispatch']

// THUNKS

export const cancelChoice = () =>
  (dispatch: Dispatch) => {
    dispatch(actions.cancelChoice())
  }

export const chooseAllowOnce = () =>
  async (dispatch: Dispatch) => {
    dispatch(actions.loading())
    const tokenInstruction = await getTokenInstruction()
    dispatch(actions.allowOnceToken({
      ...tokenInstruction,
      error: false,
      // 🔥 nota bene 😅
      // 🔥 przypomnijmy sobie "excessive property check" z TSa - odkomentujmy poniższą linijkę:
      // unnecessaryProperty: 125 // ❌ Object literal may only specify known properties bla bla
      // przydaje się o tyle - że nie wrzucimy nadmiarowych pól na stan (przypadkowo go nie zaśmiecimy/nie nadpiszemy)
    }))
  }

export const chooseAddDevice = () =>
  (dispatch: Dispatch) => {
    dispatch(actions.addDeviceForm())
  }

// 🔥 thunk to dobre miejsce na rzucanie wyjątków
// 🔥 reducer to ZŁE miejsce na rzucanie wyjątków

export const submitAllowOnce = (password: string, onSuccess: () => void) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { authorizeDevice: state } = getState()
    assertState(state, "ALLOW_ONCE_TOKEN")

    dispatch(actions.loading())
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      dispatch(actions.allowOnceSuccess())
      onSuccess()
    } catch (e: unknown) {
      dispatch(actions.allowOnceToken({ ...state, error: true }))
    }
  }

export const submitDeviceName = (deviceName: string) =>
  async (dispatch: Dispatch) => {
    dispatch(actions.loading())
    const tokenInstruction = await getTokenInstruction()
    dispatch(actions.addDeviceToken({
      deviceName,
      ...tokenInstruction,
      error: false,
    }))
  }

export const resetToken = () =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { authorizeDevice: state } = getState()
    assertState(state, "ADD_DEVICE_TOKEN")

    dispatch(actions.loading())
    const tokenInstruction = await getTokenInstruction()
    dispatch(actions.addDeviceToken({
      deviceName: state.deviceName,
      ...tokenInstruction,
      error: false,
    }))
  }

export const submitAddDevice = (password: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { authorizeDevice: state } = getState()
    assertState(state, "ADD_DEVICE_TOKEN")

    dispatch(actions.loading())
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      dispatch(actions.addDeviceConfirmation({
        deviceName: state.deviceName
      }))
    } catch (e: unknown){
      dispatch(actions.addDeviceToken({ ...state, error: true }))
    }
  }

export const handleLogout = (onLogout: () => void) =>
  (dispatch: Dispatch) => {
    dispatch(authorizeDeviceSlice.actions.chooseLogout())
    onLogout()
  }

export const confirmDeviceAdded = (onSuccess: () => void) =>
  (dispatch: Dispatch) => {
    dispatch(authorizeDeviceSlice.actions.addDeviceSuccess())
    onSuccess()
  }

// UI

interface AuthorizeDeviceProcessReduxProps {
  onSuccess: () => void
  onLogout: () => void
}

/**
 * UWAGA! 🔥
 *
 * w typowej aplikacji reduxowej komponenty osadzone głęboko w drzewie prawdopodobnie same subskrybowałyby na reduxa
 * my tutaj robimy wyjątek (wszystkie widoki Authorize Device pozostają "dumb" components) tylko po to, aby nie robić zbyt wielu kopii tego samego
 * (wygoda podczas szkolenia - mamy 1 zestaw pomniejszych widoków)
 * tzn. widoki same w środku PRAWDOPODOBNIE wywoływałyby useSelector i useDispatch.
 * a to sprawiłoby, że byłyby bardziej redux-specific - ale mniej prop-drilling
 * oraz że w poniższym komponencie mogłoby ani useSelector ani useDispatch nie być
 * kompromis: na ile chcemy aby komponenty niżej były niezależne od state-management, a na ile NIE chcemy prop-drilling
 */
export const AuthorizeDeviceProcessRedux = (props: AuthorizeDeviceProcessReduxProps) => {
  const { onSuccess, onLogout } = props
  const state = useSelector((rootState: RootState) => rootState.authorizeDevice)
  const dispatch: Dispatch = useDispatch()

  switch(state.type){
    case "LOADING":
      return <Loader />

    case "CHOOSE_METHOD":
      return <AuthorizeDeviceChooseMethodView
        onAddDeviceToTrusted={() => dispatch(chooseAddDevice())}
        onAllowDeviceOnce={() => dispatch(chooseAllowOnce())}
        onLogout={() => dispatch(handleLogout(onLogout))}
      />

    case "ALLOW_ONCE_TOKEN":
      return <AuthorizeDeviceAllowOnceTokenView
        onSubmit={(password) => dispatch(submitAllowOnce(password, onSuccess))}
        onCancel={() => dispatch(cancelChoice())}
        instruction={state.instruction}
        error={state.error}
      />

    case "ALLOW_ONCE_SUCCESS":
      return null

    case "ADD_DEVICE_FORM":
      return <AuthorizeDeviceAddDeviceFormView
        onSubmit={(deviceName) => dispatch(submitDeviceName(deviceName))}
      />

    case "ADD_DEVICE_TOKEN":
      return <AuthorizeDeviceAddDeviceTokenView
        deviceName={state.deviceName}
        instruction={state.instruction}
        onSubmit={(password) => dispatch(submitAddDevice(password))}
        onReset={() => dispatch(resetToken())}
        onCancel={() => dispatch(cancelChoice())}
        error={state.error}
      />

    case "ADD_DEVICE_CONFIRMATION":
      return <AuthorizeDeviceAddDeviceConfirmationView
        deviceName={state.deviceName}
        onClose={() => dispatch(confirmDeviceAdded(onSuccess))}
      />

    case "ADD_DEVICE_SUCCESS":
      return null

    case "LOGGED_OUT":
      return null

    default:
      const leftover: never = state
      return null
  }
}

/**
 * UWAGA! 🔥
 *
 * podobnie jak w "Module REDUX":
 * W normalnej aplikacji Redux powinien być GLOBALNY.
 * My tutaj robimy wyjątek (i tworzymy store w głębi drzewa) tylko z uwagi na organizację kodu szkoleniowego
 * chcemy, aby przykłady były od siebie odseparowane, a gdybyśmy kilka różnych przykładów wrzucili do jednego reduxa, wymieszałyby się
 * w normalnej aplikacji tak byśmy nie robili
 */
export const AuthorizeDeviceProcessReduxWithStore = (props: AuthorizeDeviceProcessReduxProps) => {
  return <Provider store={getStore()}>
    <AuthorizeDeviceProcessRedux {...props} />
  </Provider>
}
