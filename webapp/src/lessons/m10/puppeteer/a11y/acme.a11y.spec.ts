import puppeteer, { Browser, Page } from 'puppeteer'
import { AxePuppeteer } from '@axe-core/puppeteer';

let browser: Browser, page: Page

describe('ACME accessibility', () => {
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
    await page.setBypassCSP(true);
  })

  afterEach(async () => {
    await page.close()
  })

  it('should be accessible', async () => {
    await page.goto('http://localhost:3010/');

    const results = await new AxePuppeteer(page).analyze();
    console.log(results);
    expect(results.violations).toHaveLength(0)
  }, 30000);
});
