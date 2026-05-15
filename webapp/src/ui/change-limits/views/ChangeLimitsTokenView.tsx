import React, { useState } from 'react';

import { changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Button, Typography, FormatMoney } from 'ui/atoms';
import { TextField, ButtonList } from 'ui/molecules';
import { Grid, Row, Cell } from './styled';

interface ChangeLimitsTokenViewProps {
  settings: LimitsSettings
  instruction: string
  onSubmit: (password: string) => void
  onReset: () => void
  onCancel: () => void
  error: boolean
}

export const ChangeLimitsTokenView: React.FC<ChangeLimitsTokenViewProps> = (props) => {
  const {
    settings: {
      dailyLimit, availableDailyAmount,
      monthlyLimit, availableMonthlyAmount,
      verificationMethod
    }, instruction, onSubmit, onReset, onCancel, error
  } = props
  const [password, setPassword] = useState('')

  return <>
    <Grid>
    <Row>
      <Cell>
        <Typography variant="h3" noMargin>Rodzaj limitu</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Limit</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Dostępne</Typography>
      </Cell>
    </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Dzienny limit wydawania hajsu</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={dailyLimit} /></Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={availableDailyAmount} /></Typography>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Miesięczny limit wydawania hajsu</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={monthlyLimit} /></Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold><FormatMoney amount={availableMonthlyAmount} /></Typography>
        </Cell>
      </Row>
      <Row>
        <Cell>
          <Typography variant="body" noMargin>Metoda potwierdzania płatności</Typography>
        </Cell>
        <Cell variant="amount">
          <Typography variant="body" noMargin bold>{changeLimitsVerificationMethodLabel[verificationMethod]}</Typography>
        </Cell>
      </Row>
    </Grid>
    <hr />
    <TextField
      type="password"
      id="input-change-limit-password"
      label={instruction}
      defaultValue={password}
      layoutDirection="vertical"
      onChange={setPassword}
      error={error ? "Niepoprawny token" : undefined}
    />
    <ButtonList align="center">
      <Button
        data-testid="btn-token-submit"
        variant="PRIMARY"
        onClick={() => onSubmit(password)}
      >Potwierdź</Button>
      <Button
        data-testid="btn-token-reset"
        variant="SECONDARY"
        onClick={onReset}
      >Prześlij nowy kod</Button>
      <Button
        data-testid="btn-token-cancel"
        variant="SECONDARY"
        onClick={onCancel}
      >Anuluj</Button>
    </ButtonList>
  </>
}
