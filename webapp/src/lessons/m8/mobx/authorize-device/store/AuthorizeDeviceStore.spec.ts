import { autorun } from "mobx";

import { AuthorizeDeviceProcess } from "lessons/m6/authorize-device/types";
import { AuthorizeDeviceStore } from "./AuthorizeDeviceStore";

// import { getTokenInstruction, sendTokenCode } from '../../../../../api/token'
jest.mock('../../../../../api/token', () => ({
  getTokenInstruction: async () => ({
    instruction: "Wpisz hasło SMS",
    tokenId: "1111-2222-3333-4444"
  }),
  sendTokenCode: async (params: { tokenCode: string }) => {
    if (params.tokenCode.length !== 4){
      throw new Error(`Invalid confirmation token!`)
    }
  },
}))

describe("AuthorizeDeviceStore", () => {
  const configure = () => {
    const store: AuthorizeDeviceProcess = new AuthorizeDeviceStore();
    const spy = jest.fn();
    autorun(() => spy(store.state));
    return { store, spy }
  }

  describe('allow device once', () => {

    it("should notify state changes when successfully allowing device once", async () => {
      // given
      const { store, spy } = configure()
  
      // when
      await store.chooseAllowOnce();
      await store.submitAllowOnce("1234");
  
      // then
      expect(spy.mock.calls).toMatchSnapshot();
    });
  
    it("should notify state changes when failing to allow device once", async () => {
      // given
      const { store, spy } = configure()
  
      // when
      await store.chooseAllowOnce();
      await store.submitAllowOnce("too long");
  
      // then
      expect(spy.mock.calls).toMatchSnapshot();
    });
  })

  describe('add device', () => {
    it("should notify state changes when successfully adding device", async () => {
      // given
      const { store, spy } = configure()

      // when
      await store.chooseAddDevice();
      await store.submitDeviceName("my computer");
      await store.resetToken();
      await store.submitAddDevice("1234");
      await store.confirmDeviceAdded();

      // then
      expect(spy.mock.calls).toMatchSnapshot();
    });

    it("should notify state changes when failing to add device", async () => {
      // given
      const { store, spy } = configure()

      // when
      await store.chooseAddDevice();
      await store.submitDeviceName("my computer");
      await store.submitAddDevice("too long");

      // then
      expect(spy.mock.calls).toMatchSnapshot();
    })
  });
});
