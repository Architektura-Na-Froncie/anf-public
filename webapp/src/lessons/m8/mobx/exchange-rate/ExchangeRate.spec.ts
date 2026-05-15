import { observe } from "mobx";
import {
  ExchangeRateStore,
  createExchangeRateStore,
} from "./ExchangeRateStore";

describe("ExchangeRateStore", () => {
  it.each([
    ["class", new ExchangeRateStore(100000, 4)],
    ["object", createExchangeRateStore({ amount: 100000, rate: 4 })],
  ])("should update exchange after changes (%s)", (testcase, store) => {
    expect(store.exchange).toEqual(25000);
    store.rate = 4.01;
    expect(store.exchange).toEqual(24937.66);
    store.amount = 95000;
    expect(store.exchange).toEqual(23690.77);
    store.setPrecision(4);
    expect(store.exchange).toEqual(23690.7731);
  });

  it("should notify about changes (class)", () => {
    const store = new ExchangeRateStore(100000, 4);
    const spy = jest.fn();
    observe(store, spy);
    store.rate = 4.01;
    store.amount = 95000;
    store.setPrecision(4);
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "debugObjectName": "ExchangeRateStore@3",
            "name": "rate",
            "newValue": 4.01,
            "object": ExchangeRateStore {
              "amount": 95000,
              "rate": 4.01,
              "round": [Function],
            },
            "observableKind": "object",
            "oldValue": 4,
            "type": "update",
          },
        ],
        Array [
          Object {
            "debugObjectName": "ExchangeRateStore@3",
            "name": "amount",
            "newValue": 95000,
            "object": ExchangeRateStore {
              "amount": 95000,
              "rate": 4.01,
              "round": [Function],
            },
            "observableKind": "object",
            "oldValue": 100000,
            "type": "update",
          },
        ],
      ]
    `);
  });

  it("should notify about changes (object)", () => {
    const store = createExchangeRateStore({ amount: 100000, rate: 4 });
    const spy = jest.fn();
    observe(store, spy);
    store.rate = 4.01;
    store.amount = 95000;
    store.setPrecision(4);
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "debugObjectName": "ObservableObject@4",
            "name": "rate",
            "newValue": 4.01,
            "object": Object {
              "amount": 95000,
              "rate": 4.01,
              "round": [Function],
            },
            "observableKind": "object",
            "oldValue": 4,
            "type": "update",
          },
        ],
        Array [
          Object {
            "debugObjectName": "ObservableObject@4",
            "name": "amount",
            "newValue": 95000,
            "object": Object {
              "amount": 95000,
              "rate": 4.01,
              "round": [Function],
            },
            "observableKind": "object",
            "oldValue": 100000,
            "type": "update",
          },
        ],
        Array [
          Object {
            "debugObjectName": "ObservableObject@4",
            "name": "round",
            "newValue": [Function],
            "object": Object {
              "amount": 95000,
              "rate": 4.01,
              "round": [Function],
            },
            "observableKind": "object",
            "oldValue": [Function],
            "type": "update",
          },
        ],
      ]
    `);
  });
});
