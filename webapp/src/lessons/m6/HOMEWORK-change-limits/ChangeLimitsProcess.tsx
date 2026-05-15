import React, { useEffect, useState } from 'react';

import {
  ChangeLimitsAmountFormView,
  ChangeLimitsListingView,
  ChangeLimitsVerificationMethodFormView,
  ChangeLimitsTokenView,
} from 'ui/change-limits/views'
import { sendTokenCode } from 'api/token'
import { getLimits, LimitsSettings, sendLimitsUpdate, VerificationMethod } from 'api/limits';

import { Loader } from "ui/atoms"

interface ChangeLimitsProcessProps {
  onSuccess: () => void
  onCancel: () => void
}

export const ChangeLimitsProcess: React.FC<ChangeLimitsProcessProps> = (props) => {
  const { onSuccess, onCancel } = props

  // PRACA DOMOWA: zaimplementuj proces
  // zaczynamy od primitive obsession - wybierz kierunek nowej implementacji
  const [state, setState] = useState<"LOADING" | "LISTING">("LOADING");
  const [settings, setSettings] = useState<LimitsSettings | null>(null);

  useEffect(() => {
    getLimits()
      .then(limitsSettings => {
        setState("LISTING");
        setSettings(limitsSettings);
      })
  }, [])

  const modifyDailyLimit = () => {
    // eslint-disable-next-line no-console
    console.log('napisz implementację')
  }

  const modifyMonthlyLimit = () => {
    // eslint-disable-next-line no-console
    console.log('tu też napisz implementację')
  }

  const modifyVerificationMethod = () => {
    // eslint-disable-next-line no-console
    console.log('i tu również napisz implementację')
  }

  if (state === "LOADING") {
    return <Loader />
  }

  if (state === "LISTING" && settings) {
    return <ChangeLimitsListingView
      settings={settings}
      onChangeDailyLimit={modifyDailyLimit}
      onChangeMonthlyLimit={modifyMonthlyLimit}
      onChangeVerificationMethod={modifyVerificationMethod}
    />
  }

  return null;
}
