import { AuthorizeDeviceMobXPO as AuthorizeDevicePO } from "./AuthorizeDevice.po";

// import { getTokenInstruction, sendTokenCode } from '../../../../api/token'
jest.mock('../../../../api/token', () => ({
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

describe('AuthorizeDevice (MobX)', () => {
  it('should stop the process and logout after the user clicks logout', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickLogoutButton()

    // then
    // no view
    authorizeDevicePO.expectSuccessCallback.not.toHaveBeenCalled()
    authorizeDevicePO.expectLogoutCallback.toHaveBeenCalledTimes(1)
    // or: authorizeDevicePO.expectProcessFinished() / authorizeDevicePO.expectProcessFailed()
  });

  it('should cancel the authorization choice if the user clicks cancel on "add device"', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")

    // when
    authorizeDevicePO.clickChooseAddDeviceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.toggleAddDeviceConfirmationCheckbox()
    authorizeDevicePO.clickAddDeviceNameSubmitButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Zapisz to urządzenie jako zaufane")

    // when
    authorizeDevicePO.clickTokenCancelButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Nieznane urządzenie")
  });

  it('should authorize a device successfully after the user passes the correct password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

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
    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });

  it('should block the process if the user passes an invalid password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

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
    authorizeDevicePO.expectSuccessCallback.not.toHaveBeenCalled()
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });

  it('should allow once after the user passes the correct password', async () => {
    // given
    const authorizeDevicePO = AuthorizeDevicePO.render()

    // when
    authorizeDevicePO.clickChooseAllowOnceButton()

    // then
    await authorizeDevicePO.expectTextDisplayed("Jednorazowy wjazd do apki")

    // when
    authorizeDevicePO.submitAllowOnceToken("pass")

    // then
    await authorizeDevicePO.expectTextDisappeared("Jednorazowy wjazd do apki")
    await authorizeDevicePO.expectLoaderDisappeared()
    authorizeDevicePO.expectSuccessCallback.toHaveBeenCalledTimes(1)
    authorizeDevicePO.expectLogoutCallback.not.toHaveBeenCalled()
  });
});
