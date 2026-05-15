const randomTickTime = () => 2000 * (1 + Math.random())

const sign = () => Math.random() < 0.5 ? 1 : -1
const randomDelta = () => Math.random() * 0.001 * sign()

const initialRates = {
  USD: 4.00535115,
  EUR: 4.23939572,
  GBP: 4.99995995,
  CHF: 3.97592784
};
const rates = Object.assign({}, initialRates);

const getRates = (chosenCurrencies = undefined) => {
  if (!chosenCurrencies) {
    return rates;
  }
  let result = {};
  for (let c of chosenCurrencies){
    if (chosenCurrencies.indexOf(c) > -1) {
      result[c] = rates[c];
    }
  }
  return result;
};

// single register, to be used by API-level
let notifyCb = () => { };
const start = (callback) => {
  notifyCb = callback;
  let currencies = Object.keys(initialRates);
  currencies.forEach(currency => {
    const updateRate = () => {
      setTimeout(() => {
        let delta = randomDelta();
        rates[currency] += delta;
        notifyCb(currency, delta);
        updateRate(); // recursive loop, random timeout, no real money here!
      }, randomTickTime());
    }
    updateRate();
  })
}

module.exports = { start, getRates };
