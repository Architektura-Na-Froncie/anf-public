import { autorun, trace, getObserverTree, getDependencyTree } from "mobx";

import { ExchangeRateStore } from "./ExchangeRateStore";
import { MultipleExchangeRateStore } from "./MultipleExchangeRateStore";

/**
 * 🔥 UWAGA!
 *
 * Te testy są czysto ilustracyjne. Demonstrujemy tutaj działanie MobX:
 * - trace
 * - getObserverTree
 * - getDependencyTree
 * które pokazują/odzswierciedlają WEWNĘTRZNY graf zależności danego store'a.
 * A przecież wewnętrzne zależności do SZCZEGÓŁ IMPLEMENTACYJNY,
 * więc NIE powinniśmy go testować.
 *
 * My to ubraliśmy w formę testu, aby łatwo było ten kod uruchomić,
 * ewentualnie żeby łatwo było zobaczyć regresję na snapshocie.
 *
 * Tak czy siak, testów na trace/getObserverTree/getDependencyTree
 * w produkcyjnym projekcie NIE NALEŻY robić. Tu robimy jedynie demo.
 */

/**
 * Co pokazuje ten plik?
 * Ilustruje grafy zależności dla 2 store'ów:
 * - prostego - ExchangeRateStore
 * - i złożonego - MultipleExchangeRateStore
 *   (czyli store'a który KOMPONUJE inne store'y)
 *
 * Aby prześledzić zależności, robimy:
 * - snapshot test (łatwo widać regresję/zawartość)
 * - console.log dla `autorun`
 * - trace dla `autorun`
 *
 * W pracy z MobXem - w razie bugów/problemów - moglibyśmy np.
 * wstawić `trace`, sprawdzić, kiedy się resetuje dana reakcja/zależność
 * a potem trace usunąć.
 */

/**
 * 🤡 ODWRÓĆ, aby pokazać/ukryć output w konsoli
 */
const LOG_TRACE = false;
const LOG_OUTPUT = false;

const log = (...args: any[]) => {
  if (LOG_OUTPUT) {
    console.log(...args.map((arg) => JSON.stringify(arg, null, 2)));
  }
};

describe("ExchangeRateStore", () => {
  it("should track observer tree and dependency tree", () => {
    const spy = jest.fn();
    const store = new ExchangeRateStore(100000, 4);

    const disposer = autorun(() => {
      spy(store.exchange);
      if (LOG_TRACE) {
        trace();
      }
    });

    /**
     * 🔥 UWAGA!
     * zamień (odkomentuj/zakomentuj) linijki
     *
     * (wspominaliśmy o tym podczas nagrania przy okazji "akcji / transakcji")
     * MobX _i tak_ ogarnie, że zmieniamy observabla, nawet, jeśli
     * robimy to z pominięciem akcji. MobX robi pod spodem PROXY, które śledzą zmiany.
     *
     * Kiedy zmodyfikujemy bezpośrednio, to:
     * - MobX nie ogarnie, gdzie jest "granica transakcji" (w przypadku grupy kilku akcji wykonywanych jednocześnie - aby wiedzieć, KIEDY zacząć notyfikować obserwatorów - żeby np. nie robić tego wielokrotnie/przedwcześnie)
     * - rzuci warningiem w konsoli: "[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed. []...]"
     */
    // store.rate = 3.99;
    store.setRate(3.99);

    log("getObserverTree", getObserverTree(store, "amount"));
    expect(getObserverTree(store, "amount")).toMatchInlineSnapshot(`
      Object {
        "name": "ExchangeRateStore@1.amount",
        "observers": Array [
          Object {
            "name": "ExchangeRateStore@1.exchange",
            "observers": Array [
              Object {
                "name": "Autorun@2",
              },
            ],
          },
        ],
      }
    `);

    log("getDependencyTree", getDependencyTree(disposer));
    expect(getDependencyTree(disposer)).toMatchInlineSnapshot(`
      Object {
        "dependencies": Array [
          Object {
            "dependencies": Array [
              Object {
                "name": "ExchangeRateStore@1.amount",
              },
              Object {
                "name": "ExchangeRateStore@1.rate",
              },
            ],
            "name": "ExchangeRateStore@1.exchange",
          },
        ],
        "name": "Autorun@2",
      }
    `);
  });
});

describe("MultipleExchangeRateStore", () => {
  it("should track indirect computed values", () => {
    const store = new MultipleExchangeRateStore();

    store.exchanges.push(new ExchangeRateStore(50000, 3.99));
    store.exchanges.push(new ExchangeRateStore(100000, 4));

    expect(store.rates).toMatchInlineSnapshot(`
      Array [
        12531.33,
        25000,
      ]
    `);

    store.exchanges[0].setPrecision(4);

    expect(store.rates).toMatchInlineSnapshot(`
      Array [
        12531.3283,
        25000,
      ]
    `);
  });

  it("should react to modifying state", () => {
    const spy = jest.fn();
    const store = new MultipleExchangeRateStore();
    const disposer = autorun(() => {
      spy(store.rates);
      if (LOG_TRACE) {
        trace();
      }
    });

    log(
      "getDependencyTree / MultipleExchangeRateStore",
      getDependencyTree(disposer)
    );

    expect(spy.mock.calls).toHaveLength(1);
    store.addExchangeRate(new ExchangeRateStore(50000, 3.99));
    store.addExchangeRate(new ExchangeRateStore(100000, 4));

    expect(spy.mock.calls).toHaveLength(3);
    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Array [],
        ],
        Array [
          Array [
            12531.33,
          ],
        ],
        Array [
          Array [
            12531.33,
            25000,
          ],
        ],
      ]
    `);

    // 🔥 zamień (odkomentuj/zakomentuj) linijki
    // store.exchanges[0].rate = 3.98;
    store.exchanges[0].setRate(3.98);

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Array [],
        ],
        Array [
          Array [
            12531.33,
          ],
        ],
        Array [
          Array [
            12531.33,
            25000,
          ],
        ],
        Array [
          Array [
            12562.81,
            25000,
          ],
        ],
      ]
    `);
  });
});
