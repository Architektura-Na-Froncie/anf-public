const dataTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  linkAuthorizeDevice: dataTestId('link-authorize-device'),
  btnAuthorizeDevice: dataTestId('btn-authorize-device'),
  chooseAddDeviceButton: dataTestId('btn-choose-add-device'),
  addDeviceNameInput: dataTestId('input-add-device-name'),
  addDeviceNameSubmitButton: dataTestId('btn-add-device-name-submit'),
  deviceAddConfirmationCheckbox: dataTestId('checkbox-add-device-confirmation'),
  tokenSubmitButton: dataTestId('btn-token-submit'),
  addDevicePasswordInput: dataTestId('input-add-device-password'),
  closeButton: dataTestId('btn-close'),
}

class PageObject {
  startAuthorization(){
    cy.get(selectors.linkAuthorizeDevice).click()
    cy.get(selectors.btnAuthorizeDevice).click()
    return this
  }

  clickChooseAddDeviceButton(){
    cy.get(selectors.chooseAddDeviceButton).click()
    return this
  }

  confirmAddDeviceName(deviceName?: string){
    if (deviceName){
      cy.get(selectors.addDeviceNameInput).clear().type(deviceName)
    }
    cy.get(selectors.deviceAddConfirmationCheckbox).check()
    cy.get(selectors.addDeviceNameSubmitButton).click()
    return this
  }

  submitAddDeviceToken(password: string){
    cy.get(selectors.addDevicePasswordInput).type(password)
    cy.get(selectors.tokenSubmitButton).click()
    return this
  }

  clickCloseButton(){
    cy.get(selectors.closeButton).click()
    return this
  }

  shouldHaveTextDisplayed(text: string){
    cy.contains(text).should('be.visible')
    return this
  }
}

describe('AuthorizeDevice', () => {
  it('should authorize a device successfully after the user passes the correct password', () => {
    cy.visit('/')

    // login
    cy.get(dataTestId('input-login-username')).clear().type("admin")
    cy.get(dataTestId('input-login-password')).clear().type("admin")
    cy.get(dataTestId('btn-login')).click()

    const po = new PageObject
    po.startAuthorization()
    // step: choose method
      .shouldHaveTextDisplayed("Nieznane urządzenie")
      .clickChooseAddDeviceButton()
    // step: add device form
      .shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
      .confirmAddDeviceName("mój komputerek")
    // step: add device token
      .shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
      .shouldHaveTextDisplayed("mój komputerek")
      .submitAddDeviceToken("pass")
    // step: add device success
      .shouldHaveTextDisplayed("Urządzenie zapisane jako zaufane")
      .clickCloseButton()
    // outside
      .shouldHaveTextDisplayed("authorization succeeded")
  })
})
