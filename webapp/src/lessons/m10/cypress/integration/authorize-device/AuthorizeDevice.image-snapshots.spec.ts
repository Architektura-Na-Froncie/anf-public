export {}

const dataTestId = (testId: string) => `[data-testid="${testId}"]`

describe('AuthorizeDevice', () => {
  describe('[primitive]', () => {
    it('should authorize a device successfully after the user passes the correct password', () => {
      cy.visit('/')
      cy.viewport(1000, 720)

      cy.waitForFontsToLoad();
      cy.matchImageSnapshot('login form')

      // login
      cy.get(dataTestId('input-login-username')).clear().type("admin")
      cy.get(dataTestId('input-login-password')).clear().type("admin")
      cy.get(dataTestId('btn-login')).click()

      // authorize device
      cy.get(dataTestId('link-authorize-device')).click()
      cy.get(dataTestId('btn-authorize-device')).click()
      cy.contains("Nieznane urządzenie").should('be.visible')
      cy.matchImageSnapshot("step: choose method")

      cy.get(dataTestId('btn-choose-add-device')).click()
      cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
      cy.matchImageSnapshot("step: add device form")

      cy.get(dataTestId('input-add-device-name')).clear().type("mój komputerek")
      cy.get(dataTestId('checkbox-add-device-confirmation')).check()
      cy.get(dataTestId('btn-add-device-name-submit')).click()
      cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
      cy.matchImageSnapshot("step: add device token")

      cy.contains("mój komputerek").should('be.visible')
      cy.get(dataTestId('input-add-device-password')).type('pass')
      cy.get(dataTestId('btn-token-submit')).click()
      cy.contains("Urządzenie zapisane jako zaufane").should('be.visible')
      cy.matchImageSnapshot("step: add device success")

      cy.get(dataTestId('btn-close')).click()
      cy.contains("authorization succeeded").should('be.visible')
    })
  })
})
