import React, { useEffect, useState } from 'react';

import {
  ChangeLimitsAmountFormView,
  ChangeLimitsListingView,
  ChangeLimitsVerificationMethodFormView,
  ChangeLimitsTokenView,
} from 'ui/change-limits/views'
import { getTokenInstruction, sendTokenCode } from 'api/token'
import { VerificationMethod, getLimits, sendLimitsUpdate } from 'api/limits';
import { Money } from 'api/types';

import { Loader } from "ui/atoms/Loader"
import { ChangeLimitsState } from './HOMEWORK-types';
import { assertState } from 'lessons/m6/state-members';
import { useLogger, useLogMessage } from "lessons/m9/logger"

const useChangeLimits = (props: ChangeLimitsProcessMachineProps) => {
  const { onSuccess, onCancel } = props

  // loading is a state. loading=false & state.type="SOMETHING" is going back to primitive obsession
  // so we're dropping a standalone loading:boolean cell
  // const [isLoading, setLoading] = useState(false)

  const [state, setState] = useState<ChangeLimitsState>({
    type: "LOADING",
  })

  const loadListing = async () => {
    getLimits()
      .then(settings => setState({
        type: "LISTING",
        settings,
      }))
  }

  useEffect(() => {
    loadListing()
  }, [])

  useLogMessage(`User has started process: change limits`)
  const { logger } = useLogger()

  const modifyDailyLimit = () => {
    assertState(state, "LISTING")
    logger.info(`User has clicked to modify daily limit`)

    setState({
      type: "DAILY_AMOUNT_FORM",
      settings: state.settings,
    })
  }

  const modifyMonthlyLimit = () => {
    assertState(state, "LISTING")
    logger.info(`User has clicked to modify monthly limit`)

    setState({
      type: "MONTHLY_AMOUNT_FORM",
      settings: state.settings,
    })
  }

  const applyDailyLimit = async (newLimit: Money) => {
    assertState(state, "DAILY_AMOUNT_FORM")
    logger.info(`User has chosen daily limit: ${newLimit}`)

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      dailyLimit: newLimit
    })

    setState({
      type: "TOKEN",
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const applyMonthlyLimit = async (newLimit: Money) => {
    assertState(state, "MONTHLY_AMOUNT_FORM")
    logger.info(`User has chosen monthly limit: ${newLimit}`)

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      monthlyLimit: newLimit
    })

    setState({
      type: "TOKEN",
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const modifyVerificationMethod = () => {
    assertState(state, "LISTING")
    logger.info(`User has clicked to modify limits verification method`)

    setState({
      type: "VERIFICATION_METHOD_FORM",
      settings: state.settings,
    })
  }

  const applyVerificationMethod = async (newMethod: VerificationMethod) => {
    assertState(state, "VERIFICATION_METHOD_FORM")
    logger.info(`User has chosen verification method: ${newMethod}`)

    setState({ type: "LOADING" })
    const response = await sendLimitsUpdate({
      verificationMethod: newMethod
    })

    setState({
      type: "TOKEN",
      settings: { ...state.settings, ...response.settings },
      ...response.token,
    })
  }

  const resetToken = async () => {
    if (state.type !== "TOKEN" && state.type !== "TOKEN_INVALID"){
      throw new Error(`Invalid State: ${state}`)
    }
    logger.info(`User has clicked to reset the token`)
    setState({ type: "LOADING" })
    const tokenInstruction = await getTokenInstruction()
    setState({ ...state, ...tokenInstruction, type: "TOKEN" })
  }

  const cancel = async () => {
    logger.info(`User has clicked to cancel modifying limit`)
    onCancel()
    await loadListing()
  }

  const submitToken = async (password: string) => {
    // make sure we're in an appropriate state so that TS can destructure state object
    // cheap solution:
    if (state.type !== "TOKEN" && state.type !== "TOKEN_INVALID") {
      throw new Error(`Invalid State: ${state}`)
    }
    // more consistent solution:
    assertState(state, "TOKEN", "TOKEN_INVALID");

    setState({ type: "LOADING" })
    try {
      await sendTokenCode({ tokenId: state.tokenId, tokenCode: password })
      logger.info(`User has successfully authorized once`)
      onSuccess()
      await loadListing()
    } catch (e: unknown) {
      setState({ ...state, type: "TOKEN_INVALID" })
      logger.info(`User has sent an invalid confirmation token`)
    }
  }

  return {
    state,
    modifyDailyLimit,
    modifyMonthlyLimit,
    modifyVerificationMethod,
    applyDailyLimit,
    applyMonthlyLimit,
    applyVerificationMethod,
    resetToken,
    cancel,
    submitToken,
  }
}

interface ChangeLimitsProcessMachineProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ChangeLimitsWithErrorHandling: React.FC<ChangeLimitsProcessMachineProps> = (props) => {
  const { onSuccess, onCancel } = props

  const {
    state,
    modifyDailyLimit, modifyMonthlyLimit, modifyVerificationMethod,
    applyDailyLimit, applyMonthlyLimit, applyVerificationMethod,
    cancel, resetToken, submitToken,
  } = useChangeLimits(props)

  switch(state.type){
    case "LOADING":
      return <Loader />

    case "LISTING":
      return <ChangeLimitsListingView
        settings={state.settings}
        onChangeDailyLimit={modifyDailyLimit}
        onChangeMonthlyLimit={modifyMonthlyLimit}
        onChangeVerificationMethod={modifyVerificationMethod}
      />

    case "DAILY_AMOUNT_FORM":
      return <ChangeLimitsAmountFormView
        limitType="DAILY"
        settings={state.settings}
        onApply={applyDailyLimit}
        onCancel={cancel}
      />

    case "MONTHLY_AMOUNT_FORM":
      return <ChangeLimitsAmountFormView
        limitType="MONTHLY"
        settings={state.settings}
        onApply={applyMonthlyLimit}
        onCancel={cancel}
      />

    case "VERIFICATION_METHOD_FORM":
      return <ChangeLimitsVerificationMethodFormView
        settings={state.settings}
        onApply={applyVerificationMethod}
        onCancel={cancel}
      />

    case "TOKEN":
      return <ChangeLimitsTokenView
        settings={state.settings}
        onSubmit={submitToken}
        onReset={resetToken}
        onCancel={cancel}
        instruction={state.instruction}
        error={false}
      />

    case "TOKEN_INVALID":
      return <ChangeLimitsTokenView
        settings={state.settings}
        onSubmit={submitToken}
        onReset={resetToken}
        onCancel={cancel}
        instruction={state.instruction}
        error={true}
      />

    case "SUCCESS":
      return null

    default:
      const leftover: never = state
      return null
  }
}
