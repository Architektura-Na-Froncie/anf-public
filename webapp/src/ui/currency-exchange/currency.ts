export type Currency = "USD" | "EUR" | "GBP" | "CHF"
export type CurrencyDelta = number;
export type CurrencyRate = number;

export type CurrencyRatesMap = Record<Currency, CurrencyRate>

export type CurrencyRatesInitialEvent = Partial<CurrencyRatesMap>

export interface CurrencyRatesUpdateEvent {
    currency: Currency;
    delta: CurrencyDelta;
}
