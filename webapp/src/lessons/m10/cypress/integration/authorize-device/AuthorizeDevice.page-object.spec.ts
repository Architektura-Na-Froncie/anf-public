import { AuthorizeDeviceCypressPageObject } from './AuthorizeDeviceCypressPageObject'
import { LoginCypressPageObject } from '../auth/LoginCypressPageObject'

describe('AuthorizeDevice', () => {
  describe('[page object]', () => {
    // const login = () => {
    //   return loginPO.navigateToPage()
    //   .fillCredentials("admin", "admin")
    //   .clickLoginButton()
    // }

    // const loginPO = new LoginCypressPageObject()

    it('should stop the process and logout after the user clicks logout', () => {
      // login()
      cy.login("admin", "admin")

      const po = new AuthorizeDeviceCypressPageObject
      po.startAuthorization()
      // step: choose method
        .shouldHaveTextDisplayed("Nieznane urządzenie")
        .clickLogoutButton()
      // outside
        .shouldHaveTextDisplayed("logged out")
    })

    it('should cancel the authorization choice if the user clicks cancel on "add device"', () => {
      cy.login("admin", "admin")

      const po = new AuthorizeDeviceCypressPageObject
      po.startAuthorization()
      // step: choose method
        .shouldHaveTextDisplayed("Nieznane urządzenie")
        .clickChooseAddDeviceButton()
      // step: add device form
        .shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
        .confirmAddDeviceName()
      // step: add device token
        .shouldHaveTextDisplayed("Zapisz to urządzenie jako zaufane")
        .clickTokenCancelButton()
      // step: choose method
        .shouldHaveTextDisplayed("Nieznane urządzenie")
    });

    it('should authorize a device successfully after the user passes the correct password', () => {
      cy.login("admin", "admin")

      const po = new AuthorizeDeviceCypressPageObject
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

    it('should block the process if the user passes an invalid password', () => {
      cy.login("admin", "admin")

      const po = new AuthorizeDeviceCypressPageObject
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
        .submitAddDeviceToken("pass too long")
      // step: add device success
        .shouldHaveTextDisplayed("Niepoprawny token")
    });

    it('should allow once after the user passes the correct password', () => {
      cy.login("admin", "admin")

      const po = new AuthorizeDeviceCypressPageObject
      po.startAuthorization()
      // step: choose method
        .shouldHaveTextDisplayed("Nieznane urządzenie")
        .clickChooseAllowOnceButton()
      // step: allow once token
        .shouldHaveTextDisplayed("Jednorazowy wjazd do apki")
        .submitAllowOnceToken("pass")
      // step: allow once success
        .shouldHaveTextDisappeared("Jednorazowy wjazd do apki")
    })
  })
})
