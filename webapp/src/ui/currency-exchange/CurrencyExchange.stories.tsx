import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { CurrencyExchangeView } from './CurrencyExchangeView';

export default {
  title: 'Currency Exchange/Currency Exchange',
  argTypes: {
  },
} as Meta;

export const _CurrencyExchange = () => {
  const props = {
    usdRate: 4.0057,
    usdDelta: -0.013,
    eurRate: 4.2311,
    eurDelta: 0,
    gbpRate: 5.5966,
    gbpDelta: 0.0012,
    chfRate: 3.9725,
    chfDelta: 0,
  }
  return <CurrencyExchangeView {...props} />
}
