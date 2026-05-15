import {
  makeObservable,
  observable,
  computed,
  action,
  autorun,
} from "mobx";

const roundTo = (prec: number) =>
  (value: number) => Math.round(value * 10**prec) / 10**prec

// uncomment hardcoded exchange-getter to see changes in the snapshot

export class ExchangeRateStore {
  constructor(public amount: number, public rate: number) {
    makeObservable(this, {
      amount: observable,
      rate: observable,
      exchange: computed,
      setPrecision: action,
      setAmount: action,
      setRate: action,
    });
  }

  // for usage in mobx strict-mode (explicit actions)
  setAmount(amount: number){
    this.amount = amount
  }
  setRate(rate: number){
    this.rate = rate
  }

  private round = roundTo(2)

  setPrecision(precision: number){
    if (precision >= 0){
      this.round = roundTo(precision)
    } else {
      throw new Error('Negative precision is not supported because so.')
    }
  }

  get exchange() {
    // return to4(this.amount / 4);
    return this.round(this.amount / this.rate);
  }
}

export const createExchangeRateStore = ({ amount, rate }: { amount: number, rate: number }) =>
  observable.object(
    {
      amount,
      rate,
      round: roundTo(2),
      setPrecision(precision: number){
        if (precision >= 0){
          this.round = roundTo(precision)
        } else {
          throw new Error('Negative precision is not supported because so.')
        }
      },
      get exchange() {
        // return to4(this.amount / 4);
        return this.round(this.amount / this.rate);
      },
    },
    {
      setPrecision: action,
    }
  );

