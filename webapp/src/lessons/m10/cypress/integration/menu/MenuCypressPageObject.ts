const dataTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  linkAppLogo: dataTestId('link-app-logo'),
  linkAccountHistory: dataTestId('link-account-history'),
  btnLogout: dataTestId('btn-logout'),
}

export class MenuCypressPageObject {
  clickAppLogoLink(){
    cy.get(selectors.linkAppLogo).click()
    return this
  }

  clickAccountHistoryLink(){
    cy.get(selectors.linkAccountHistory).click()
    return this
  }

  clickLogoutButton(){
    cy.get(selectors.btnLogout).click()
    return this
  }
}
