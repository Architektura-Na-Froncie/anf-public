const fs = require('fs');

const createScreenshotsDir = () => {
  const dir = `${__dirname }/screenshots`
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
}

const screenshotPath = file => `${__dirname }/screenshots/${file}`

const takeScreenshot = async (page, width, height, name) => {
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: 1,
  });
  createScreenshotsDir()
  await page.screenshot({path: screenshotPath(`${name}-${width}x${height}.png`)});
  console.log('done', `${name}-${width}x${height}.png`)
}

const setTextInputValue = async (page, selector, value) => {
  await page.waitForSelector(selector)
  await page.evaluate((data) => {
    return document.querySelector(data.selector).value = data.value
  }, {selector, value})
}

const sleep = (delayMS) => {
  return new Promise( (res, rej) => {
    setTimeout(res, delayMS)
  } )
}

const shouldHaveTextDisappeared = async (page, text) => {
  await page.waitForFunction(
    text => ! document.querySelector('body').innerText.includes(text),
    {},
    text
  );
}

module.exports = {
  takeScreenshot,
  setTextInputValue,
  sleep,
  shouldHaveTextDisappeared,
}
