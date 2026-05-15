import React, { useState } from 'react';
import styled from 'styled-components';

import { Typography } from 'ui/atoms';
import { Container } from 'ui/layout';
import { TextField } from 'ui/molecules';

import { ReactComponent as EUR } from '../../assets/icons/eur.svg';
import { ReactComponent as USD } from '../../assets/icons/usd.svg';
import { ReactComponent as GBP } from '../../assets/icons/gbp.svg';
import { ReactComponent as CHF } from '../../assets/icons/chf.svg';

const TrendWrapper = styled.span<{ color: string }>`
  position: absolute;
  right: -1.5em;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.color};
`;

const Trend: React.FC<{ delta?: number }> = ({ delta }) => {
  if (!delta) {
    return null;
  }

  if (delta < 0) {
    return <TrendWrapper color="#a00">⬇︎</TrendWrapper>
  }

  return <TrendWrapper color="#080">⬆︎</TrendWrapper>;
}

const FormatAmount: React.FC<{ amount?: number, decimals: number }> = ({ amount, decimals = 2 }) => {
  if (typeof amount !== 'number' || !isFinite(amount)) {
    return null;
  }
  if (amount > 1e10) {
    return <>💰💰💰</>;
  }
  return <>
    {amount.toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
  </>;
};

const BorderedPanel = styled.div`
  border: 2px solid rgba(0, 0, 0, .15);
  border-radius: 8px;
  padding: 1.5rem;
  background: #fff;
  box-sizing: border-box;
`;

const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  max-width: 600px;
  min-width: 300px;
  border-collapse: collapse;
`;

const Row = styled.tr`
  margin: 0;
`;

const HeadRow = styled(Row)`
  && > td,
  && > th {
    border-bottom: 2px solid rgba(0, 0, 0, .15);
    padding-top: 0;
    padding-bottom: .35rem;
    font-weight: bold;
  }
`;

const Cell = styled.td<{ width?: string; textAlign?: 'left' | 'center' | 'right' }>`
  display: table-cell;
  padding: .75rem;
  text-align: ${(props) => props.textAlign};
  vertical-align: middle;
  width: ${(props) => props.width ? props.width : 'auto'};
  white-space: nowrap;
  line-height: 1.75rem;
`;

const RateWrapper = styled.div`
  position: relative;
`;

const CurrencyWrapper = styled.div`
  position: relative;
  padding-left: 40px;
`;

const FlagWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  & > svg {
    display: block;
    width: 30px;
    height: 20px;
  }
`

const flags = {
  EUR,
  USD,
  GBP,
  CHF,
}

const CurrencyRate: React.FC<{
  currency: keyof typeof flags;
  rate: number;
  delta?: number;
  amount?: number;
}> = (props) => {
  const {
    currency,
    rate,
    delta,
    amount,
  } = props;
  const Flag = flags[currency];

  return (
    <Row>
      <Cell>
        <CurrencyWrapper>
          <FlagWrapper>
            {Flag && <Flag />}
          </FlagWrapper>
          {currency}
        </CurrencyWrapper>
      </Cell>
      <Cell textAlign="right">
        <RateWrapper>
          <FormatAmount amount={rate} decimals={4} />
          <Trend delta={delta} />
        </RateWrapper>
      </Cell>
      <Cell textAlign="right">
        <FormatAmount amount={amount! / rate} decimals={2} />
      </Cell>
    </Row>
  );
}

interface CurrencyExchangeProps {
  usdRate: number;
  usdDelta?: number;
  eurRate: number;
  eurDelta?: number;
  gbpRate: number;
  gbpDelta?: number;
  chfRate: number;
  chfDelta?: number;
}

export const CurrencyExchangeView: React.FC<CurrencyExchangeProps> = (props) => {
  const [amount, setAmount] = useState(0);
  const {
    usdRate, usdDelta,
    eurRate, eurDelta,
    gbpRate, gbpDelta,
    chfRate, chfDelta,
  } = props;

  return <>
    <Container>
      <Typography variant="h1">Kantor walutowy</Typography>
      <TextField type="number" id="cash-input" label="Kwota do wymiany (PLN)" placeholder="Wpisz kwotę" onChange={(val) => setAmount(+val)} />

      <BorderedPanel>
        <Table>
          <thead>
            <HeadRow>
              <Cell as="th" scope="col">Waluta</Cell>
              <Cell as="th" scope="col" textAlign="right">Kurs</Cell>
              <Cell as="th" scope="col" textAlign="right" width="10em">Kwota wymiany</Cell>
            </HeadRow>
          </thead>
          <tbody>
            <CurrencyRate currency="USD" rate={usdRate} delta={usdDelta} amount={amount} />
            <CurrencyRate currency="EUR" rate={eurRate} delta={eurDelta} amount={amount} />
            <CurrencyRate currency="GBP" rate={gbpRate} delta={gbpDelta} amount={amount} />
            <CurrencyRate currency="CHF" rate={chfRate} delta={chfDelta} amount={amount} />
          </tbody>
        </Table>
      </BorderedPanel>
    </Container>
  </>
}
