/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('before:browser:launch', (browser = {}, launchOptions) => {
    if (browser.family === 'chromium' && browser.isHeaded) {
      // 🔥 When running on retina displays uncomment the line below, to downscale resolution, otherwise
      // screenshot tests will fail, see: https://github.com/cypress-io/cypress/issues/6485.
      // launchOptions.args.push('--force-device-scale-factor=1');
    }
    return launchOptions;
  });

  addMatchImageSnapshotPlugin(on, config);

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    log(message) {
      console.log(message)
      return null
    },
    table(message) {
      console.table(message)
      return null
    }
  })
}
