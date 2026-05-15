import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { CurrencyRatesInitialEvent, CurrencyRatesUpdateEvent } from './currency'

import { Container } from 'ui/layout';
import { CurrencyExchangeView } from 'ui/currency-exchange/CurrencyExchangeView';
import { CURRENCY_SVC_URL } from './config';

export const CurrencyExchange: React.FC = () => {
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

  // useEffect(() => {
  //   const socket = io(CURRENCY_SVC_URL)
  //   socket.emit('request', { currencies: [ 'USD', 'EUR', 'GBP', 'CHF' ] });
  //   socket.on('init', (rates: CurrencyRatesInitialEvent) => {
  //     console.info('Initial data:', rates);
  //   });
  //   socket.on('update', (data: CurrencyRatesUpdateEvent) => {
  //     console.info('Update:', data);
  //   });
  //   socket.on('disconnect', () => {
  //     console.log('disconnected');
  //     socket.close();
  //   });
  //   return () => { socket.disconnect() };
  // }, [])

  return <>
    <Container>
      <CurrencyExchangeView {...props} />
    </Container>
  </>
}
