import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import flushPromises from "flush-promises";

import { TokenInstruction, TokenConfirmation } from "api/token";
import {
  chooseAddDevice,
  chooseAllowOnce,
  submitAddDevice,
  submitDeviceName,
  submitAllowOnce,
  cancelChoice,
  confirmDeviceAdded,
} from "./AuthorizeDeviceProcessRedux";

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

// `redux-mock-store` NIE uruchamia reducera, dlatego NIE będziemy mieli aktualnego stanu
// assertState oczekuje bycia w konkretnym stanie w momencie dispatchowania danego thunka
// i tego w teście mieć nie będzie... dlatego mockujemy assertState, żeby nie rzucało błędami podczas testu
// import { assertState } from "../state-members";
jest.mock("../../state-members");

type Scenario = Function[]
const addDeviceSuccess: Scenario = [
  () => chooseAddDevice(),
  () => submitDeviceName("mój lapcio"),
  () => submitAddDevice("za-długie-hasło"),
  () => submitAddDevice("pswd"),
  () => confirmDeviceAdded(jest.fn()),
];

const allowOnceSuccess: Scenario = [
  () => chooseAllowOnce(),
  () => submitAllowOnce("za-długie-hasło", jest.fn()),
  () => submitAllowOnce("pswd", jest.fn()),
];

const addDeviceCancelThenAllow: Scenario = [
  () => chooseAddDevice(),
  () => submitDeviceName("mój lapcio"),
  () => cancelChoice(),
  () => chooseAllowOnce(),
  () => submitAllowOnce("pswd", jest.fn()),
];

/**
 * 🔥 z racji że mock store nie jest prawdziwym storem, tylko "mockiem", to nie uruchamia
 * reducerów, nie oblicza stanu etc. Dlatego nie przechowuje aktualnego stanu.
 * I kiedy dispatchujemy thunki które ODPYTUJĄ store o aktualny stan, to ten uparcie zwraca initial.
 * Przez co _niektóre_ payloady akcji (te dispatchowane przez thunki odpytujące stan) mają wybrakowany payload.
 *
 * To jest istotne ograniczenie redux-mock-store, gdyby chcieć testować sekwencje akcji
 */
describe("Authorize Device Actions", () => {
  const getMockStore = () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const initialState = {
      authorizeDevice: {
        type: "CHOOSE_METHOD",
      },
    };
    const store = mockStore(initialState);
    return store;
  }

  it.each<[string, Scenario]>([
    ['addDeviceSuccess', addDeviceSuccess],
    ['allowOnceSuccess', allowOnceSuccess],
    ['addDeviceCancelThenAllow', addDeviceCancelThenAllow],
  ])("%s scenario match actions snapshots", async (scenarioName, scenario) => {
    const store = getMockStore();
    for (const dispatchable of scenario) {
      store.dispatch(dispatchable());
      await flushPromises();
    }
    expect(store.getActions()).toMatchSnapshot();
  })
});
