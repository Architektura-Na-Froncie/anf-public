import flushPromises from "flush-promises";

import { TokenInstruction, TokenConfirmation } from "api/token";
import {
  getStore,
  chooseAddDevice,
  submitAddDevice,
  submitDeviceName,
  chooseAllowOnce,
  submitAllowOnce,
  confirmDeviceAdded,
} from "./AuthorizeDeviceProcessRedux";

// 🤓 DEMO
// usuńmy jeden z mocków API (poniżej) to testy się wysypią, bo będą próbowały wysyłać prawdziwe żądania
// żeby nasze testy integracyjne działały zgodnie z zamierzeniem, IO musi być zamockowane

// import { getTokenInstruction, sendTokenCode } from "../../../../api/token";
jest.mock("../../../../api/token", () => ({
  getTokenInstruction: async (): Promise<TokenInstruction> => {
    return { tokenId: "123", instruction: "Wpisz hasło" };
  },
  sendTokenCode: async (params: TokenConfirmation): Promise<void> => {
    if (params.tokenCode.length != 4) {
      throw new Error("wrong code");
    }
  },
}));

describe("Authorize Device Redux Store", () => {
  it("should have state matching INLINE snapshots throughout successful 'add-device' scenario", async () => {
    const store = getStore();
    const mock = jest.fn();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "CHOOSE_METHOD",
        },
      }
    `);

    store.dispatch(chooseAddDevice());
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "ADD_DEVICE_FORM",
        },
      }
    `);

    store.dispatch(submitDeviceName("mój lapcio"));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "deviceName": "mój lapcio",
          "error": false,
          "instruction": "Wpisz hasło",
          "tokenId": "123",
          "type": "ADD_DEVICE_TOKEN",
        },
      }
    `);

    store.dispatch(submitAddDevice("za-długie-hasło"));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "deviceName": "mój lapcio",
          "error": true,
          "instruction": "Wpisz hasło",
          "tokenId": "123",
          "type": "ADD_DEVICE_TOKEN",
        },
      }
    `);

    store.dispatch(submitAddDevice("pswd"));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "deviceName": "mój lapcio",
          "type": "ADD_DEVICE_CONFIRMATION",
        },
      }
    `);

    store.dispatch(confirmDeviceAdded(mock));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "ADD_DEVICE_SUCCESS",
        },
      }
    `);

    expect(mock).toHaveBeenCalledTimes(1);
  });

  it("should have state matching INLINE snapshots throughout successful 'allow-once' scenario", async () => {
    const store = getStore();
    const mock = jest.fn();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "CHOOSE_METHOD",
        },
      }
    `);

    store.dispatch(chooseAllowOnce());
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "error": false,
          "instruction": "Wpisz hasło",
          "tokenId": "123",
          "type": "ALLOW_ONCE_TOKEN",
        },
      }
    `);

    store.dispatch(submitAllowOnce("za-długie-hasło", mock));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "error": true,
          "instruction": "Wpisz hasło",
          "tokenId": "123",
          "type": "ALLOW_ONCE_TOKEN",
        },
      }
    `);

    store.dispatch(submitAllowOnce("pswd", mock));
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "LOADING",
        },
      }
    `);

    await flushPromises();
    expect(store.getState()).toMatchInlineSnapshot(`
      Object {
        "authorizeDevice": Object {
          "type": "ALLOW_ONCE_SUCCESS",
        },
      }
    `);

    expect(mock).toHaveBeenCalledTimes(1);
  });
});
