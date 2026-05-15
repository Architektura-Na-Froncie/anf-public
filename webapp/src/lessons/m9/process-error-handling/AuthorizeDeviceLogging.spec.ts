import { AuthorizeDeviceWithProvidersPO } from "./AuthorizeDeviceWithProviders.po";

import { tokenMockHandlers } from 'api/mock/token.mock'
import { setupMockServer } from "api/mock/mock.server";
import { MockLogger } from "../logger/Logger.mock";

describe('AuthorizeDevice (Logging)', () => {
  setupMockServer(...tokenMockHandlers)

  it('should stop the process and logout after the user clicks logout', async () => {
    // given
    const mockLogger = new MockLogger()
    const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickLogoutButton()

    // then
    mockLogger.expectLogs.toMatchSnapshot()
  });

  it('should cancel the authorization choice if the user clicks cancel on "add device"', async () => {
    // given
    const mockLogger = new MockLogger()
    const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.confirmAddDeviceName()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.clickTokenCancelButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // then
    mockLogger.expectLogs.toMatchSnapshot()
  });

  it('should authorize a device successfully after the user passes the correct password', async () => {
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
    await authorizeDevicePO.expectTextDisplayed("mój komputerek")
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.submitAddDeviceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisplayed("Urządzenie zapisane jako zaufane")

    // when
    authorizeDevicePO.clickCloseButton()

    // then
    mockLogger.expectLogs.toMatchSnapshot()
  });

  it('should block the process if the user passes an invalid password', async () => {
    // given
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
    authorizeDevicePO.submitAddDeviceToken("pass too long")

    // then
    await authorizeDevicePO.expectTextDisplayed("Niepoprawny token")

    // then
    mockLogger.expectLogs.toMatchSnapshot()
  });

  it('should allow once after the user passes the correct password', async () => {
    // given
    const mockLogger = new MockLogger()
    const authorizeDevicePO = AuthorizeDeviceWithProvidersPO.renderWithProviders(mockLogger)

    // when
    authorizeDevicePO.clickChooseAllowOnceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki")

    // when
    authorizeDevicePO.submitAllowOnceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisappeared("Jednorazowy wjazd do apki")
    await authorizeDevicePO.expectLoaderDisappeared()

    // then
    mockLogger.expectLogs.toMatchSnapshot()
  });
});
