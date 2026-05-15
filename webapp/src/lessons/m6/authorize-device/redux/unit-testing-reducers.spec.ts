import {
  authorizeDeviceSlice,
  actions,
} from "./AuthorizeDeviceProcessRedux";

describe("Authorize Device Reducer", () => {
  const reducer = authorizeDeviceSlice.reducer;

  it("should match snapshot after addDeviceForm action dispatched", () => {
    const result = reducer({ type: "CHOOSE_METHOD" }, actions.addDeviceForm);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "type": "ADD_DEVICE_FORM",
      }
    `);
  });

  // 🔥 niestety, redux "pozwala" na dispatchowanie akcji które w danym stanie nie mają sensu :(
  it("should match snapshot after allowOnceSuccess action dispatched", () => {
    const result = reducer(
      { type: "CHOOSE_METHOD" },
      actions.allowOnceSuccess
    );
    expect(result).toMatchInlineSnapshot(`
      Object {
        "type": "ALLOW_ONCE_SUCCESS",
      }
    `);
  });
});
