export {}

const dataTestId = (testId: string) => `[data-testid="${testId}"]`

const baseUrl = 'http://localhost:3010/api'

describe('AuthorizeDevice', () => {
  describe('[integration/storybook]', () => {
    it('should authorize a device successfully after the user passes the correct password', () => {
      cy.visit('http://localhost:6006/iframe.html?id=lessons-m10-end-to-end-testing-storybook-integration-testing--authorize-device-with-real-http')

      cy.intercept({
        method: "POST",
        url: new RegExp(`${baseUrl}/banking/token$`)
      }, {
        "tokenId": "fake-token-id",
        "instruction": "Wpisz hasło SMS"
      }).as('token-instruction')

      cy.intercept({
        method: "POST",
        url: new RegExp(`${baseUrl}/banking/token/fake-token-id$`)
      }, "OK").as('token-code')

      cy.get(dataTestId('btn-authorize-device')).click()
      cy.contains("Nieznane urządzenie").should('be.visible')
      cy.get(dataTestId('btn-choose-add-device')).click()
      cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
      cy.get(dataTestId('input-add-device-name')).clear().type("mój komputerek")
      cy.get(dataTestId('checkbox-add-device-confirmation')).check()
      cy.get(dataTestId('btn-add-device-name-submit')).click()
      cy.contains("Zapisz to urządzenie jako zaufane").should('be.visible')
      cy.contains("mój komputerek").should('be.visible')
      cy.get(dataTestId('input-add-device-password')).type('pass')
      cy.get(dataTestId('btn-token-submit')).click()
      cy.contains("Urządzenie zapisane jako zaufane").should('be.visible')
      cy.get(dataTestId('btn-close')).click()
      cy.contains("authorization succeeded").should('be.visible')

      cy.wait('@token-instruction').its('response.body')
        .should('have.property', 'tokenId')

      cy.wait('@token-code').then(req => {
        cy.wrap(req).its('request.body')
          .should('have.property', 'tokenId', 'fake-token-id')
        cy.wrap(req).its('request.body')
          .and('have.property', 'tokenCode', 'pass')
      })
    })
  })
})


