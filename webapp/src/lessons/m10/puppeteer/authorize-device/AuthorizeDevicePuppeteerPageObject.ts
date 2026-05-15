import { Page } from 'puppeteer'

const getByTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  linkAuthorizeDevice: getByTestId('link-authorize-device'),
  btnAuthorizeDevice: getByTestId('btn-authorize-device'),
  chooseAddDeviceButton: getByTestId('btn-choose-add-device'),
  chooseAllowOnceButton: getByTestId('btn-choose-allow-once'),
  chooseLogoutButton: getByTestId('btn-choose-logout'),
  addDeviceNameInput: getByTestId('input-add-device-name'),
  addDeviceNameSubmitButton: getByTestId('btn-add-device-name-submit'),
  deviceAddConfirmationCheckbox: getByTestId('checkbox-add-device-confirmation'),
  tokenCancelButton: getByTestId('btn-token-cancel'),
  tokenSubmitButton: getByTestId('btn-token-submit'),
  tokenResetButton: getByTestId('btn-token-reset'),
  addDevicePasswordInput: getByTestId('input-add-device-password'),
  allowOncePasswordInput: getByTestId('input-allow-once-password'),
  closeButton: getByTestId('btn-close'),
}

export class AuthorizeDevicePuppeteerPageObject {
  constructor(
    private page: Page
  ){}

  async navigateToPage(){
    return this.page.goto('http://localhost:3010', { waitUntil: 'networkidle2' })
  }

  async startAuthorization(){
    await this.page.click(selectors.linkAuthorizeDevice)
    return this.page.click(selectors.btnAuthorizeDevice)
  }

  async clickChooseAddDeviceButton(){
    return this.page.click(selectors.chooseAddDeviceButton)
  }

  async clickChooseAllowOnceButton(){
    return this.page.click(selectors.chooseAllowOnceButton)
  }

  async clickLogoutButton(){
    return this.page.click(selectors.chooseLogoutButton)
  }

  private async clearInput(inputSelector: string){
    await this.page.evaluate((selector) => {
      const example = document.querySelector(selector);
      (example as HTMLInputElement).value = '';
    }, inputSelector);
  }

  async confirmAddDeviceName(deviceName?: string){
    if (deviceName){
      await this.clearInput(selectors.addDeviceNameInput)
      await this.page.click(selectors.addDeviceNameInput)
      await this.page.keyboard.type(deviceName)
    }
    await this.page.click(selectors.deviceAddConfirmationCheckbox)
    return this.page.click(selectors.addDeviceNameSubmitButton)
  }

  async setDevicePasswordPassword(password: string){
    await this.page.click(selectors.addDevicePasswordInput)
    return this.page.keyboard.type(password)
  }

  async submitAddDeviceToken(password: string){
    await this.setDevicePasswordPassword(password)
    return this.clickTokenSubmitButton()
  }

  async setAllowOncePassword(password: string){
    await this.page.click(selectors.allowOncePasswordInput)
    return this.page.keyboard.type(password)
  }

  async submitAllowOnceToken(password: string){
    await this.setAllowOncePassword(password)
    return this.clickTokenSubmitButton()
  }

  async clickTokenCancelButton(){
    return this.page.click(selectors.tokenCancelButton)
  }

  async clickTokenSubmitButton(){
    return this.page.click(selectors.tokenSubmitButton)
  }

  async clickTokenResetButton(){
    return this.page.click(selectors.tokenResetButton)
  }

  async clickCloseButton(){
    return this.page.click(selectors.closeButton)
  }

  async shouldHaveTextDisplayed(text: string){
    return this.page.waitForFunction(
      (text: string) => document.querySelector('body')!.innerText.includes(text),
      {},
      text
    );
  }

  async shouldHaveTextDisappeared(text: string){
    return this.page.waitForFunction(
      (text: string) => ! document.querySelector('body')!.innerText.includes(text),
      {},
      text
    );
  }
}
