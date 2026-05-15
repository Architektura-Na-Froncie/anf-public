import flushPromises from "flush-promises";
import { interpret } from "xstate";
import { authorizeDeviceMachine as machine } from "./AuthorizeDeviceProcessXState";

describe("AuthorizeDevice State Machine", () => {
  // 🤔 mega proste... ale czy bardzo pomocne?
  // te testy jednostkowo sprawdzają pojedyncze przejścia. Ale się posypią, kiedy przemodelujemy maszynę.
  // 🤨 testy mocno kruche
  describe("testing pure logic", () => {
    // to jest zwyczajne przejście:
    // chooseMethod -> addDeviceForm
    it('should reach "addDeviceForm" given "chooseMethod" after "CHOOSE_ADD_DEVICE" event', () => {
      const actualState = machine.transition(
        "chooseMethod",
        "CHOOSE_ADD_DEVICE"
      );
      expect(actualState.matches("addDeviceForm")).toBeTruthy();
    });

    // tu przechodzimy do stanu "loading", który opuścimy w zależności od rezultatu promisy:
    // addDeviceForm -> loadingAddDeviceToken
    it('should reach "loadingAddDeviceToken" given "addDeviceForm" after "SUBMIT_DEVICE_NAME" event', async () => {
      const actualState = machine.transition(
        "addDeviceForm",
        "SUBMIT_DEVICE_NAME"
      );
      expect(actualState.matches("loadingAddDeviceToken")).toBeTruthy();
    });

    // a to jest przejście "ukrytym eventem":
    // loadingAddDeviceToken -> addDeviceToken
    // Typ eventu odpowiadającego temu przejściu zależy od wartości invoke.id w konfiguracji stanu.
    // Bez zdefiniowanego invoke.id event otrzymałby typ done.invoke.AuthorizeDevice.loadingAddDeviceToken:invocation[0]
    it('should reach "addDeviceToken" given "loadingAddDeviceToken" after "done.invoke.getTokenInstruction" event', () => {
      const actualState = machine.transition("loadingAddDeviceToken", {
        type: "done.invoke.getTokenInstruction" as any,
      });
      expect(actualState.matches("addDeviceToken")).toBeTruthy();
    });

    it('should reach "submittingAddDeviceToken" given "addDeviceToken" after "SUBMIT" event', () => {
      const actualState = machine.transition("addDeviceToken", "SUBMIT");
      expect(actualState.matches("submittingAddDeviceToken")).toBeTruthy();
    });

    it('should reach "addDeviceConfirmation" given "submittingAddDeviceToken" after "done.invoke.sendTokenCode" event', () => {
      const actualState = machine.transition(
        "submittingAddDeviceToken",
        "done.invoke.sendTokenCode" as any
      );
      expect(actualState.matches("addDeviceConfirmation")).toBeTruthy();
    });

    it('should reach "addDeviceSuccess" given "addDeviceConfirmation" after "CONFIRM_DEVICE_ADDED" event', () => {
      const actualState = machine.transition(
        "addDeviceConfirmation",
        "CONFIRM_DEVICE_ADDED"
      );
      expect(actualState.matches("addDeviceSuccess")).toBeTruthy();
    });
  });

  // 🤔 poniższy test uruchamia maszynę, wysyła zdarzenia (tak jak robiłby to komponent) i sprawdza zawartość stanu po każdym kroku
  // robimy snapshoty, aby wychwycić niechciane regresje
  // test w dalszym ciągu jednostkowy - ale bardziej kompleksowo sprawdza zachowanie maszyny

  const mockMachine = machine.withConfig({
    services: {
      getTokenInstruction: async () => {
        return {
          instruction: "Wpisz hasło SMS",
          tokenId: "1111-2222-3333-4444",
        };
      },
      sendTokenCode: async () => {},
    },
  });

  it('should eventually reach "addDeviceSuccess"', async () => {
    const spy = jest.fn();

    const service = interpret(mockMachine).onTransition((state) => {
      // uruchamia się przy każdym przejściu
      const { value, context } = state;
      spy({ value, context });
    });

    service.start();

    service.send({ type: "CHOOSE_ADD_DEVICE" });
    service.send({ type: "SUBMIT_DEVICE_NAME", deviceName: "lapcio" });
    await flushPromises();

    service.send({ type: "SUBMIT", password: "1234" });
    await flushPromises();

    service.send({ type: "CONFIRM_DEVICE_ADDED" });
    expect(service.state.matches("addDeviceSuccess")).toBeTruthy();

    expect(spy.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          Object {
            "context": Object {
              "error": false,
            },
            "value": "chooseMethod",
          },
        ],
        Array [
          Object {
            "context": Object {
              "error": false,
            },
            "value": "addDeviceForm",
          },
        ],
        Array [
          Object {
            "context": Object {
              "deviceName": "lapcio",
              "error": false,
            },
            "value": "loadingAddDeviceToken",
          },
        ],
        Array [
          Object {
            "context": Object {
              "deviceName": "lapcio",
              "error": false,
              "tokenInstruction": Object {
                "instruction": "Wpisz hasło SMS",
                "tokenId": "1111-2222-3333-4444",
              },
            },
            "value": "addDeviceToken",
          },
        ],
        Array [
          Object {
            "context": Object {
              "deviceName": "lapcio",
              "error": false,
              "tokenInstruction": Object {
                "instruction": "Wpisz hasło SMS",
                "tokenId": "1111-2222-3333-4444",
              },
            },
            "value": "submittingAddDeviceToken",
          },
        ],
        Array [
          Object {
            "context": Object {
              "deviceName": "lapcio",
              "error": false,
              "tokenInstruction": Object {
                "instruction": "Wpisz hasło SMS",
                "tokenId": "1111-2222-3333-4444",
              },
            },
            "value": "addDeviceConfirmation",
          },
        ],
        Array [
          Object {
            "context": Object {
              "deviceName": "lapcio",
              "error": false,
              "tokenInstruction": Object {
                "instruction": "Wpisz hasło SMS",
                "tokenId": "1111-2222-3333-4444",
              },
            },
            "value": "addDeviceSuccess",
          },
        ],
      ]
    `);
  });
});
