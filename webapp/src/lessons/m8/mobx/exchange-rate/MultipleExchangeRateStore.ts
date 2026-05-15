import { observable, makeAutoObservable } from "mobx";

import { ExchangeRateStore } from './ExchangeRateStore'

export class MultipleExchangeRateStore {
  public exchangeRates: ExchangeRateStore[] = observable([]);

  constructor() {
    makeAutoObservable(this, {
      exchangeRates: false
    })
    // makeObservable(this, {
    //   // exchangeRates: observable,
    //   // exchanges: computed,
    //   addExchangeRate: action,
    //   rates: computed,
    // });
  }

  addExchangeRate(exchangeRate: ExchangeRateStore) {
    // const existing = this.exchangeRates;
    // existing.push(exchangeRate);
    // this.exchangeRates = existing;
    this.exchangeRates.push(exchangeRate);
  }

  get exchanges() {
    return this.exchangeRates;
  }

  get rates() {
    return this.exchanges.map((exchangeRate) => exchangeRate.exchange);
  }
}
