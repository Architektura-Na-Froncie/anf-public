import React, { useState } from 'react';

import { VerificationMethod, changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Button, Typography } from 'ui/atoms';
import { DropdownField, ButtonList } from 'ui/molecules';

interface ChangeLimitsVerificationMethodFormViewProps {
  settings: LimitsSettings
  onApply: (method: VerificationMethod) => void
  onCancel: () => void
}

export const ChangeLimitsVerificationMethodFormView: React.FC<ChangeLimitsVerificationMethodFormViewProps> = (props) => {
  const { settings: { verificationMethod }, onApply, onCancel } = props
  const [currentMethod, setCurrentMethod] = useState(verificationMethod)

  return <>
    <div>
      <DropdownField
        id="input-change-verification-method"
        label='Metoda potwierdzania płatności'
        defaultValue={currentMethod}
        items={changeLimitsVerificationMethodLabel}
        includeEmpty={false}
        onChange={method => setCurrentMethod(method as VerificationMethod)}
      />
      <Typography variant="body">Polecamy mimo wszystko iść z duchem czasu.</Typography>
      <ButtonList align="center">
        <Button
          data-testid="btn-apply"
          variant="PRIMARY"
          onClick={() => onApply(currentMethod)}
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
