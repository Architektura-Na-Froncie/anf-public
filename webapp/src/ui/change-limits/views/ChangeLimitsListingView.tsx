import React from 'react';

import { changeLimitsVerificationMethodLabel, LimitsSettings } from 'api/limits';

import { Typography, Button, FormatMoney } from 'ui/atoms';
import { Row, Cell, Grid } from './styled';

interface ChangeLimitsListingViewProps {
  settings: LimitsSettings
  onChangeDailyLimit: () => void
  onChangeMonthlyLimit: () => void
  onChangeVerificationMethod: () => void
}

export const ChangeLimitsListingView: React.FC<ChangeLimitsListingViewProps> = (props) => {
  const {
    settings: {
      dailyLimit, availableDailyAmount,
      monthlyLimit, availableMonthlyAmount,
      verificationMethod
    }, onChangeDailyLimit, onChangeMonthlyLimit, onChangeVerificationMethod
  } = props
  return <Grid>
    <Row>
      <Cell>
        <Typography variant="h3" noMargin>Rodzaj limitu</Typography>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Obecna wartość</Typography>
      </Cell>
      <Cell>
      </Cell>
      <Cell>
        <Typography variant="h3" noMargin>Dostępne hajsiwo</Typography>
      </Cell>
    </Row>
    <Row>
      <Cell>
        <Typography variant="body" noMargin>Dzienny limit wydawania hajsu</Typography>
      </Cell>
      <Cell variant="amount">
        <Typography variant="body" noMargin bold><FormatMoney amount={dailyLimit} /></Typography>
      </Cell>
      <Cell variant="action">
        <Button
          data-testid="btn-change-daily-limit"
          variant="SECONDARY"
          onClick={onChangeDailyLimit}
        >Zmień</Button>
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
      <Cell variant="action">
        <Button
          data-testid="btn-change-monthly-limit"
          variant="SECONDARY"
          onClick={onChangeMonthlyLimit}
        >Zmień</Button>
      </Cell>
      <Cell variant="amount">
        <Typography variant="body" noMargin bold><FormatMoney amount={availableMonthlyAmount} /></Typography>
      </Cell>
    </Row>
    <hr />
    <Row>
      <Cell>
        <Typography variant="body" noMargin>Metoda potwierdzania płatności</Typography>
      </Cell>
      <Cell variant="amount">
        <Typography variant="body" noMargin bold>{changeLimitsVerificationMethodLabel[verificationMethod]}</Typography>
      </Cell>
      <Cell variant="action">
        <Button
          data-testid="btn-change-verification-method"
          variant="SECONDARY"
          onClick={onChangeVerificationMethod}
        >Zmień</Button>
      </Cell>
    </Row>
  </Grid>
}
