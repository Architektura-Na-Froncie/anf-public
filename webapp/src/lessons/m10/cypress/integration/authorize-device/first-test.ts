export {}

const dataTestId = (testId: string) => `[data-testid="${testId}"]`

describe('AuthorizeDevice', () => {
  it('should cancel the authorization choice if the user clicks cancel on "add device"',
  // {
  //   retries: 2
  // },
  () => {
    cy.visit('/')

    // login
    cy.get(dataTestId('input-login-username')).clear().type("admin")
    cy.get(dataTestId('input-login-password')).clear().type("admin")
    cy.get(dataTestId('btn-login')).click()

    cy.get(dataTestId('link-authorize-device')).click()
    cy.get(dataTestId('btn-authorize-device')).click()
        // .pause()
    // step: choose method
    cy.contains("Nieznane urządzenie").should('be.visible')
    cy.get(dataTestId('btn-choose-add-device')).click()
    // step: add device form
    cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
    cy.get(dataTestId('checkbox-add-device-confirmation')).check()
    cy.get(dataTestId('btn-add-device-name-submit')).click()
    // step: add device token
        // symulowanie faila:
    cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
    cy.get(dataTestId('btn-token-cancel')).click()
    // step: choose method
    cy.contains("Nieznane urządzenie").should('be.visible')
  });
})
