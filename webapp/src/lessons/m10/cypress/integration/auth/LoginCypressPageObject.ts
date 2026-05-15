import { terminalLog } from "../../utils/axe"
const dataTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  inputLoginUsername: dataTestId('input-login-username'),
  inputLoginPassword: dataTestId('input-login-password'),
  btnLogin: dataTestId('btn-login'),
}

export class LoginCypressPageObject {
  navigateToPage(){
    cy.visit('/')
    return this
  }

  fillCredentials(username: string, password: string){
    cy.get(selectors.inputLoginUsername).clear().type(username)
    cy.get(selectors.inputLoginPassword).clear().type(password)
    return this
  }

  clickLoginButton(){
    cy.get(selectors.btnLogin).click()
    return this
  }

  shouldBeAccessible(){
    cy.checkA11y(undefined, undefined, terminalLog)
    return this
  }
}
