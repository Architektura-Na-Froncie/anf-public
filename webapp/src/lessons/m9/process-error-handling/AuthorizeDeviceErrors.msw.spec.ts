import { AuthorizeDeviceWithProvidersPO } from "./AuthorizeDeviceWithProviders.po";

import { tokenMockNetworkErrorHandlers } from '../api-retry/token.mock'
import { setupMockServer } from "api/mock/mock.server";
import { MockLogger } from "../logger/Logger.mock";

describe('AuthorizeDevice (Errors)', () => {
  // 🔥 osadzamy handlery, które rzucają network error
  // w ten sposób testujemy integracyjnie czy UI wyświetla błędy
  setupMockServer(...tokenMockNetworkErrorHandlers)

  it('should display error page if connection is broken during allow once', async () => {
    // given
    const mockLogger = new MockLogger()
    const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickChooseAllowOnceButton()

    // 🔥 dzięki `msw` mockujemy bardzo konkretny błąd
    // then
    await authorizeDevicePO.expectTextDisplayed("Internet connection error. Check your wires!")
  });

  it('should display error page if connection is broken during add device', async () => {
    // given
    const mockLogger = new MockLogger()
    const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.confirmAddDeviceName("mój komputerek")

    // then
    await authorizeDevicePO.expectTextDisplayed("Internet connection error. Check your wires!")
  });
});
