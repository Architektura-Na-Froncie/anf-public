import React, { useState } from "react"

import {
  AuthorizeDeviceChooseMethodView,
  AuthorizeDeviceAllowOnceTokenView,
  AuthorizeDeviceAddDeviceFormView,
  AuthorizeDeviceAddDeviceTokenView,
  AuthorizeDeviceAddDeviceConfirmationView,
} from 'ui/authorize-device/views'
import { AuthorizeDeviceState } from "lessons/m6/authorize-device/types"
import { assertState } from "lessons/m6/state-members"
// importujemy API z retry
import { getTokenInstruction, sendTokenCode } from '../api-retry/token'

import { useLogger, useLogMessage } from "../logger"
import { ErrorContent, useErrorScreen } from "../error-ui"
import { UserErrorMessage, getUserErrorMessage } from "../error-ui/messages"
import { isUnauthorizedError } from "../error-ui/messages/error-guards"

import { Loader } from "ui/atoms"

type AuthorizeDeviceStateWithFailure =
  | AuthorizeDeviceState
  | {
    type: "FAILURE",
    message: UserErrorMessage
  }

interface AuthorizeDeviceProcessMachineProps {
  onSuccess: () => void
  onLogout: () => void
}

/**
 * UWAGA! 🔥
 *
 * Pokazujemy 2 podejścia
 * ścieżka ALLOW_ONCE bazuje na wyświetleniu samego widoku błędu - ErrorContent (mały komponent UI)
 * zaś ścieżka ADD_DEVICE bazuje na ErrorScreenProvider
 *
 * w prawdziwej aplikacji oczywiście wybralibyśmy jedno podejście - i pewnie byłoby to wysoko-poziomowe, czyli kontekst
 * natomiast szkoleniowo chcemy zademonstrować oba podejścia
 */
export const AuthorizeDeviceWithErrorHandling = (props: AuthorizeDeviceProcessMachineProps) => {
  const { onSuccess, onLogout } = props

  const [state, setState] = useState<AuthorizeDeviceStateWithFailure>({
    type: "CHOOSE_METHOD"
  })

  useLogMessage(`User has started process: authorize device`)
  const { logger } = useLogger()
  const { showError } = useErrorScreen()

  // useLogMessage(`User has entered state ${state.type}`)

  const cancelChoice = async () => {
    logger.info(`User has cancelled the authorization method choice`)
    setState({ type: "CHOOSE_METHOD" })
  }

  const chooseAllowOnce = async () => {
    setState({ type: "LOADING" })
    logger.info(`User has clicked to allow once`)
    try {
      const tokenInstruction = await getTokenInstruction()
      setState({
        type: "ALLOW_ONCE_TOKEN",
        ...tokenInstruction,
        error: false,
      })
    } catch (e: unknown) {
      // UWAGA! 🔥
      setState({
        type: "FAILURE",
        message: getUserErrorMessage(e)
      })
    }
  }

  const submitAllowOnce = async (password: string) => {
    if (state.type !== "ALLOW_ONCE_TOKEN"){
      throw new Error(`Invalid State: ${state}`)
    }

    setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      logger.info(`The device has been successfully authorized once`)
      setState({ type: "ALLOW_ONCE_SUCCESS" })
      onSuccess()
    } catch (e: unknown) {
      const isUnauthorized = isUnauthorizedError(e)
      if (isUnauthorized){
        setState({ ...state, error: true })
        logger.info(`User has sent an invalid confirmation token`)
      } else {
        // UWAGA! 🔥
        setState({
          type: "FAILURE",
          message: getUserErrorMessage(e)
        })
      }
    }
  }

  const chooseAddDevice = async () => {
    setState({ type: "LOADING" })
    logger.info(`User has clicked to add a trusted device`)
    setState({
      type: "ADD_DEVICE_FORM"
    })
  }

  const submitDeviceName = async (currentDeviceName: string) => {
    setState({ type: "LOADING" })
    logger.info(`User has chosen the device name: ${currentDeviceName}`)
    try {
      const tokenInstruction = await getTokenInstruction()
      setState({
        type: "ADD_DEVICE_TOKEN",
        deviceName: currentDeviceName,
        ...tokenInstruction,
        error: false,
      })
    } catch (e: unknown) {
      // UWAGA! 🔥
      showError({
        layout: "ERROR_PAGE",
        message: getUserErrorMessage(e)
      })
      // powinniśmy jeszcze ustawić stan maszyny stanowej
      // (gdybyśmy używali kontekstu, to stan FAILURE prawd. nie potrzebuje już message)
      // setState({ type: "FAILURE" })
    }
  }

  const resetToken = async () => {
    assertState(state, "ADD_DEVICE_TOKEN")
    logger.info(`User has clicked to reset the token`)
    setState({ type: "LOADING" })
    try {
      const tokenInstruction = await getTokenInstruction()
      setState(({ ...state, ...tokenInstruction, error: false }))
    } catch (e: unknown) {
      // UWAGA! 🔥
      showError({
        layout: "ERROR_PAGE",
        message: getUserErrorMessage(e)
      })
      // setState({ type: "FAILURE" })
    }
  }

  const submitAddDevice = async (password: string) => {
    // make sure we're in an appropriate state so that TS can destructure state object
    // manual solution:
    if (state.type !== "ADD_DEVICE_TOKEN"){
      throw new Error(`Invalid State: ${state}`)
    }
    // more consistent solution:
    assertState<AuthorizeDeviceState['type']>(state, "ADD_DEVICE_TOKEN")

    setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      logger.info(`The device has been successfully added to trusted devices`)
      setState({
        type: "ADD_DEVICE_CONFIRMATION",
        deviceName: state.deviceName
      })
    } catch (e: unknown) {
      const isUnauthorized = isUnauthorizedError(e)
      if (isUnauthorized){
        setState(({ ...state, error: true }))
        logger.info(`User has sent an invalid confirmation token`)
      } else {
        // UWAGA! 🔥
        showError({
          layout: "ERROR_PAGE",
          message: getUserErrorMessage(e)
        })
        // setState({ type: "FAILURE" })
      }
    }
  }

  // albo: useEffect(() => { if (state.type === "LOGGED_OUT"){ onLogout() } }, [state, onLogout])
  const handleLogout = () => {
    logger.info(`User has cancelled authorizing the device`)
    setState({
      type: "LOGGED_OUT"
    })
    onLogout()
  }

  const handleSuccess = () => {
    logger.info(`User has successfully finished the process`)
    setState({
      type: "ADD_DEVICE_SUCCESS"
    })
    onSuccess()
  }

switch(state.type){
  case "LOADING":
    return <Loader />

  case "FAILURE":
    return <ErrorContent message={state.message} />

  case "CHOOSE_METHOD":
    return <><AuthorizeDeviceChooseMethodView
      onAddDeviceToTrusted={chooseAddDevice}
      onAllowDeviceOnce={chooseAllowOnce}
      onLogout={handleLogout}
    /></>

  case "ALLOW_ONCE_TOKEN":
    return <AuthorizeDeviceAllowOnceTokenView
      onSubmit={submitAllowOnce}
      onCancel={cancelChoice}
      instruction={state.instruction}
      error={state.error}
    />

  case "ALLOW_ONCE_SUCCESS":
    return null

  case "ADD_DEVICE_FORM":
    return <AuthorizeDeviceAddDeviceFormView
      onSubmit={submitDeviceName}
    />

  case "ADD_DEVICE_TOKEN":
    return <AuthorizeDeviceAddDeviceTokenView
      deviceName={state.deviceName}
      instruction={state.instruction}
      onSubmit={submitAddDevice}
      onReset={resetToken}
      onCancel={cancelChoice}
      error={state.error}
    />

  case "ADD_DEVICE_CONFIRMATION":
    return <AuthorizeDeviceAddDeviceConfirmationView
      deviceName={state.deviceName}
      onClose={handleSuccess}
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
