import React, { useState } from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';

import { lessons } from 'stories';
import { CurrencyExchangeView } from 'ui/currency-exchange/CurrencyExchangeView';

export default {
  title: lessons.m8.add('RxJS').toString(),
  argTypes: {}
} as Meta;

export const CurrencyExchange: React.FC = () => {
  const props = {
    usdRate: 4.0057,
    eurRate: 4.2311,
    gbpRate: 5.5966,
    chfRate: 3.9725,
  }

  return <CurrencyExchangeView {...props} />
}

export const CurrencyExchangeWithDelta: React.FC = () => {
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
