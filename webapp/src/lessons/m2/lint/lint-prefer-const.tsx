import React, { useState } from 'react';

type Money = number

type LimitsSettings = {
  dailyLimit: Money
  availableDailyAmount: Money
  monthlyLimit: Money
  availableMonthlyAmount: Money
}

interface ChangeLimitsFormViewProps {
  quota: LimitsSettings
  onApply: (quota: Money) => void
  onCancel: () => void
}

export const ChangeLimitsFormView: React.FC<ChangeLimitsFormViewProps> = (props) => {
  let { quota: { dailyLimit }, onApply, onCancel } = props
  let [newQuota, setNewQuota] = useState(dailyLimit)

  return <>
    <div>
      <label htmlFor="input-change-quota">Dzienny limit kwotowy</label>
      <input
        id="input-change-quota"
        defaultValue={newQuota + ''}
        onChange={e => setNewQuota(parseFloat(e.target.value))}
      />
      <button
        type="button"
        onClick={() => onApply(newQuota)}
      >zapisz</button>
      <button
        type="button"
        onClick={onCancel}
      >anuluj</button>
    </div>
  </>
}
