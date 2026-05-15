/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Login to application
     * @example cy.login('john','pass')
     */
    login (email: string, password: string): void

    /**
     * Logout from application
     * @example cy.login()
     */
    logout (): void

    /**
     * Utility for ensuring that web fonts are loaded. Call this before making image snapshots.
     * @see https://github.com/jaredpalmer/cypress-image-snapshot/issues/18
     */
    waitForFontsToLoad(): void;
  }
}
