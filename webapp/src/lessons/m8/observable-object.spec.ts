export {};

const produceObservable = <T>(initial: T) => ({
  _value: initial,
  set value(newValue: T) {
    this._value = newValue;
    for (const subFn of this.subscribers) {
      subFn(this._value);
    }
  },

  // 🔥 IoC PART
  subscribers: [] as Array<(value: T) => void>,
  subscribe(fn: (value: T) => void) {
    this.subscribers.push(fn);
  },
});

describe("Observable Object", () => {
  it("should send notifications, when value changes", () => {
    const name$ = produceObservable("John");
    const spy = jest.fn();
    name$.subscribe(spy);

    name$.value = "Alice";
    name$.value = "Bob";
    name$.value = "Cecile";

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          "Alice",
        ],
        Array [
          "Bob",
        ],
        Array [
          "Cecile",
        ],
      ]
    `);
  });
});
