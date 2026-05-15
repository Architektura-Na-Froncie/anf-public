const fs = require('fs');
const lighthouse = require('lighthouse');
const puppeteer = require('puppeteer');

const chromeLauncher = require('chrome-launcher');
const request = require('request');
const util = require('util');

const options = {
  logLevel: 'info',
  disableDeviceEmulation: true,
  chromeFlags: ['--disable-mobile-emulation'],
};

/**
 *
 * Perform a Lighthouse run
 * @param {String} url - url The URL to test
 * @param {Object} options - Optional settings for the Lighthouse run
 * @param {Object} [config=null] - Configuration for the Lighthouse run. If
 * not present, the default config is used.
 */
async function lighthouseFromPuppeteer(url, options, config = null) {
  // Launch chrome using chrome-launcher
  const chrome = await chromeLauncher.launch(options);
  options.port = chrome.port;
  options.output = 'html';

  // Connect chrome-launcher to puppeteer
  const resp = await util.promisify(request)(`http://localhost:${options.port}/json/version`);
  const { webSocketDebuggerUrl } = JSON.parse(resp.body);
  const browser = await puppeteer.connect({
    browserWSEndpoint: webSocketDebuggerUrl,
  });

  // Run Lighthouse
  const runnerResult = await lighthouse(url, options, config);
  await browser.disconnect();
  await chrome.kill();

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

  if (!fs.existsSync('reports')) {
    fs.mkdirSync('reports');
  }
  fs.writeFile('reports/lighthouse-report.html', runnerResult.report, (err) => {
    if (err) throw err;
  });
}

lighthouseFromPuppeteer('http://localhost:3010', options);
