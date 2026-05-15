export {}

describe('ACME Page Auth', () => {
  it('should login and logout', () => {
    cy.login("admin", "admin")
    cy.logout()
  });

  it('should match snapshots', () => {
    cy.viewport(1000, 720)
    cy.login("admin", "admin")
    cy.waitForFontsToLoad();
    cy.matchImageSnapshot('logged-in');
    cy.logout()
    cy.waitForFontsToLoad();
    cy.matchImageSnapshot('login-form');
  });
})
