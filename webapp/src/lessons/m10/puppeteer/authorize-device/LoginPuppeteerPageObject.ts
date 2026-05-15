import { Page } from 'puppeteer'
import { shouldHaveTextDisappeared } from '../utils'

const getByTestId = (testId: string) => `[data-testid="${testId}"]`

export const selectors = {
  inputLoginUsername: getByTestId('input-login-username'),
  inputLoginPassword: getByTestId('input-login-password'),
  btnLogin: getByTestId('btn-login'),
}

export class LoginPuppeteerPageObject {
  constructor(
    private page: Page
  ){}

  async navigateToPage(){
    return this.page.goto('http://localhost:3010', { waitUntil: 'networkidle2' })
  }

  async fillCredentials(username: string, password: string){
    await this.page.click(selectors.inputLoginUsername)
    await this.page.keyboard.type(username)

    await this.page.click(selectors.inputLoginPassword)
    await this.page.keyboard.type(password)
  }

  async clickLoginButton(){
    return this.page.click(selectors.btnLogin)
  }

  async shouldHaveTextDisappeared(text: string){
    return shouldHaveTextDisappeared(this.page, text)
  }
}
