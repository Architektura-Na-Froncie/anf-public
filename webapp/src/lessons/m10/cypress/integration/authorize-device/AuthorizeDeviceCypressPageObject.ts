import { terminalLog } from "../../utils/axe"

const dataTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  linkAuthorizeDevice: dataTestId('link-authorize-device'),
  btnAuthorizeDevice: dataTestId('btn-authorize-device'),
  chooseAddDeviceButton: dataTestId('btn-choose-add-device'),
  chooseAllowOnceButton: dataTestId('btn-choose-allow-once'),
  chooseLogoutButton: dataTestId('btn-choose-logout'),
  addDeviceNameInput: dataTestId('input-add-device-name'),
  addDeviceNameSubmitButton: dataTestId('btn-add-device-name-submit'),
  deviceAddConfirmationCheckbox: dataTestId('checkbox-add-device-confirmation'),
  tokenCancelButton: dataTestId('btn-token-cancel'),
  tokenSubmitButton: dataTestId('btn-token-submit'),
  tokenResetButton: dataTestId('btn-token-reset'),
  addDevicePasswordInput: dataTestId('input-add-device-password'),
  allowOncePasswordInput: dataTestId('input-allow-once-password'),
  closeButton: dataTestId('btn-close'),
}

export class AuthorizeDeviceCypressPageObject {
  navigateToPage(){
    cy.visit('/')
    return this
  }

  startAuthorization(){
    cy.get(selectors.linkAuthorizeDevice).click()
    cy.get(selectors.btnAuthorizeDevice).click()
    return this
  }

  clickChooseAddDeviceButton(){
    cy.get(selectors.chooseAddDeviceButton).click()
    return this
  }

  clickChooseAllowOnceButton(){
    cy.get(selectors.chooseAllowOnceButton).click()
    return this
  }

  clickLogoutButton(){
    cy.get(selectors.chooseLogoutButton).click()
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

  submitAllowOnceToken(password: string){
    cy.get(selectors.allowOncePasswordInput).type(password)
    cy.get(selectors.tokenSubmitButton).click()
    return this
  }

  clickTokenCancelButton(){
    cy.get(selectors.tokenCancelButton).click()
    return this
  }

  clickTokenSubmitButton(){
    cy.get(selectors.tokenSubmitButton).click()
    return this
  }

  clickTokenResetButton(){
    cy.get(selectors.tokenResetButton).click()
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

  shouldHaveTextDisappeared(text: string){
    cy.contains(text).should('not.exist')
    return this
  }

  shouldBeAccessible(){
    cy.checkA11y(undefined, undefined, terminalLog)
    return this
  }
}
