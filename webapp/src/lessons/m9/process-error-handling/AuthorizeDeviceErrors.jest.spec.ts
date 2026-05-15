import { AuthorizeDeviceWithProvidersPO } from "./AuthorizeDeviceWithProviders.po";

import { MockLogger } from "../logger/Logger.mock";

import { getTokenInstruction, sendTokenCode } from "../api-retry/token";
jest.mock('../api-retry/token', () => ({
  getTokenInstruction: jest.fn(),
  sendTokenCode: jest.fn()
}))

describe('AuthorizeDevice (Errors)', () => {

  // 🔥 w każdym teście robimy inne ustawienia (raz jedno żądanie przechodzi, a innym razem failuje)
  const fail = {
    getTokenInstruction: () => (getTokenInstruction as jest.Mock).mockImplementation(async () => { throw new Error('ale lipa') }),
    sendTokenCode: () => (sendTokenCode as jest.Mock).mockImplementation(async () => { throw new Error('ale lipa') }),
  }
  const pass = {
    getTokenInstruction: () => (getTokenInstruction as jest.Mock).mockImplementation(async () => ({
      instruction: "Wpisz hasło SMS",
      tokenId: "1111-2222-3333-4444"
    })),
    sendTokenCode: () => (sendTokenCode as jest.Mock).mockImplementation(async (params: { tokenCode: string }) => {
      if (params.tokenCode.length !== 4){
        throw new Error(`Invalid confirmation token!`)
      }
    }),
  }

  // 🔥 każdy test ustawia sam sobie mockowe żądania - ale czyścimy je wspólnie
  afterEach(() => {
    (getTokenInstruction as jest.Mock).mockReset();
    (sendTokenCode as jest.Mock).mockReset();
  })

  describe("allow once", () => {

    it('should display error page if API fails on getTokenInstruction while requesting token', async () => {
      // given
      // 🔥 proces wywali się na getTokenInstruction, dalej nawet nie pójdzie
      fail.getTokenInstruction()
      const mockLogger = new MockLogger()
      const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

      // then
      await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

      // when
      authorizeDevicePO.clickChooseAllowOnceButton()

      // 🔥 mamy "generyczny" błąd, tj. nie wiemy, jaki konkretnie. Więc fallback do ogólnego "Unexpected error occurred"
      // then
      await authorizeDevicePO.expectTextDisplayed("Unexpected error occurred. Please contact Support.")
    });

    it('should display error page if API fails on getTokenInstruction while submitting token', async () => {
      // given
      // 🔥 proces przjedzie getTokenInstruction, ale wywali się na sendTokenCode
      pass.getTokenInstruction()
      fail.sendTokenCode()
      const mockLogger = new MockLogger()
      const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

      // when
      authorizeDevicePO.clickChooseAllowOnceButton()

      // then
      await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki")

      // when
      authorizeDevicePO.submitAllowOnceToken("pass")

      // then
      await authorizeDevicePO.expectTextDisplayed("Unexpected error occurred. Please contact Support.")
    });

  });

  describe("add device", () => {

    it('should display error page if API fails on getTokenInstruction while requesting add device token', async () => {
      // given
      // 🔥 proces wywali się na getTokenInstruction, dalej nawet nie pójdzie
      fail.getTokenInstruction()
      const mockLogger = new MockLogger()
      const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

      // when
      authorizeDevicePO.clickChooseAddDeviceButton()

      // then
      await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

      // when
      authorizeDevicePO.confirmAddDeviceName("mój komputerek")

      // then
      await authorizeDevicePO.expectTextDisplayed("Unexpected error occurred. Please contact Support.")
    });

    it('should display error page if API fails on getTokenInstruction while submitting token', async () => {
      // given
      // 🔥 proces przejdzie getTokenInstruction, ale wywali się na sendTokenCode
      pass.getTokenInstruction()
      fail.sendTokenCode()
      const mockLogger = new MockLogger()
      const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

      // when
      authorizeDevicePO.clickChooseAddDeviceButton()

      // then
      await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

      // when
      authorizeDevicePO.confirmAddDeviceName()

      // then
      await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

      // when
      // 🔥 bez znaczenia, czy dobry token czy zły - jak API failuje, to i tak proces się wiesza
      authorizeDevicePO.submitAddDeviceToken("pass too long")

      // then
      await authorizeDevicePO.expectTextDisplayed("Unexpected error occurred. Please contact Support.")
    });

  });
});
