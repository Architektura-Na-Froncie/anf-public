import React, { useState } from 'react';

import { Money } from 'api/types';
import { LimitsSettings } from 'api/limits';

import { Button } from 'ui/atoms';
import { TextField, ButtonList } from 'ui/molecules';

interface ChangeLimitsAmountFormViewProps {
  limitType: "DAILY" | "MONTHLY"
  settings: LimitsSettings
  onApply: (limit: Money) => void
  onCancel: () => void
}

export const ChangeLimitsAmountFormView: React.FC<ChangeLimitsAmountFormViewProps> = (props) => {
  const { settings, limitType, onApply, onCancel } = props
  const initialLimitValue = limitType === "DAILY" ? settings.dailyLimit : settings.monthlyLimit
  const [newLimit, setNewLimit] = useState(initialLimitValue)
  const limitLabel = limitType === "DAILY"
    ? "Dzienny limit wydawania hajsu"
    : "Miesięczny limit wydawania hajsu"


  return <>
    <div>
      <TextField
        id="input-change-limit-amount"
        label={limitLabel}
        defaultValue={newLimit + ''}
        onChange={e => setNewLimit(parseFloat(e))}
      />
      <ButtonList align="center">
        <Button
          data-testid="btn-apply"
          variant="PRIMARY"
          onClick={() => onApply(newLimit)}
        >Zmień</Button>
        <Button
          data-testid="btn-cancel"
          variant="SECONDARY"
          onClick={onCancel}
        >Anuluj</Button>
      </ButtonList>
    </div>
  </>
}
