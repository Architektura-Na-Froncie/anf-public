import puppeteer, { Browser, Page } from 'puppeteer'

import { AuthorizeDevicePuppeteerPageObject } from './AuthorizeDevicePuppeteerPageObject'
import { LoginPuppeteerPageObject } from './LoginPuppeteerPageObject'
import { takeScreenshot } from '../utils'

let browser: Browser, page: Page

const testTimeout = 10000
describe('AuthorizeDevice', function(){
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      devtools: false,
    });
  }, 60000)

  afterAll(async () => {
    await browser.close()
  })

  beforeEach(async () => {
    page = await browser.newPage()

    /*
    const client = await page.target().createCDPSession();
    await client.send('Network.enable');
    await client.send('Network.emulateNetworkConditions', {
      'offline': false,
      'downloadThroughput': 1024 * 1024, // download speed (bytes/s)
      'uploadThroughput': 1024 * 1024, // upload speed (bytes/s)
      'latency': 400, // latency (ms)
    });
    await client.send('Emulation.setCPUThrottlingRate', {rate: 4});
    */

    const loginPO = new LoginPuppeteerPageObject(page)
    await loginPO.navigateToPage()
    await loginPO.fillCredentials("admin", "admin")
    await loginPO.clickLoginButton()
    await loginPO.shouldHaveTextDisappeared("Logowanie")
  }, testTimeout)

  afterEach(async () => {
    await page.close()
  })

  it('should stop the process and logout after the user clicks logout', async () => {
    const po = new AuthorizeDevicePuppeteerPageObject(page)

    await po.startAuthorization()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
    await po.clickLogoutButton()
    // outside
    await po.shouldHaveTextDisplayed("logged out")
  }, testTimeout)

  it('should cancel the authorization choice if the user clicks cancel on "add device"', async () => {
    const po = new AuthorizeDevicePuppeteerPageObject(page)

    await po.startAuthorization()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
    await po.clickChooseAddDeviceButton()
    // step: add device form
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await po.confirmAddDeviceName()
    // step: add device token
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await po.clickTokenCancelButton()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
  }, testTimeout)

  it('should authorize a device successfully after the user passes the correct password', async () => {
    const po = new AuthorizeDevicePuppeteerPageObject(page)

    await po.startAuthorization()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
    await takeScreenshot(page, 800, 600, 'choose-method')
    await po.clickChooseAddDeviceButton()
    // step: add device form
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await takeScreenshot(page, 800, 600, 'add-device-form')
    await po.confirmAddDeviceName("mój komputerek")
    // step: add device token
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await po.shouldHaveTextDisplayed("mój komputerek")
    await takeScreenshot(page, 800, 600, 'add-device-token')
    await po.submitAddDeviceToken("pass")
    // step: add device success
    await po.shouldHaveTextDisplayed("Urządzenie zapisane jako zaufane")
    await takeScreenshot(page, 800, 600, 'add-device-success')
    await po.clickCloseButton()
    // outside
    await po.shouldHaveTextDisplayed("authorization succeeded")
  }, testTimeout)

  it('should block the process if the user passes an invalid password', async () => {
    const po = new AuthorizeDevicePuppeteerPageObject(page)

    await po.startAuthorization()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
    await po.clickChooseAddDeviceButton()
    // step: add device form
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await po.confirmAddDeviceName("mój komputerek")
    // step: add device token
    await po.shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
    await po.shouldHaveTextDisplayed("mój komputerek")
    await po.submitAddDeviceToken("pass too long")
    // step: add device success
    await po.shouldHaveTextDisplayed("Niepoprawny token")
  }, testTimeout);

  it('should allow once after the user passes the correct password', async () => {
    const po = new AuthorizeDevicePuppeteerPageObject(page)

    await po.startAuthorization()
    // step: choose method
    await po.shouldHaveTextDisplayed("Nieznane urządzenie")
    await po.clickChooseAllowOnceButton()
    // step: allow once token
    await po.shouldHaveTextDisplayed("Jednorazowy wjazd do apki")
    await po.submitAllowOnceToken("pass")
    // step: allow once success
    await po.shouldHaveTextDisappeared("Jednorazowy wjazd do apki")
  }, testTimeout)
})
