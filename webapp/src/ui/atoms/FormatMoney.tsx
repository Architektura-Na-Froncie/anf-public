import React from 'react';
import { Money } from 'api/types';

const formatter = new Intl.NumberFormat("pl-PL", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

interface FormatMoneyProps {
  amount: Money
}

export const FormatMoney: React.FC<FormatMoneyProps> = (props) => {
  const { amount } = props
  return <>
    {formatter.format(amount)}
  </>
}
