/* eslint-disable import/first */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
});

import { LoginCypressPageObject } from "../integration/auth/LoginCypressPageObject"
import { MenuCypressPageObject } from "../integration/menu/MenuCypressPageObject"

Cypress.Commands.add("login", (username: string, password: string) => {
  const loginPO = new LoginCypressPageObject()

  loginPO.navigateToPage()
    .fillCredentials(username, password)
    .clickLoginButton()
})

Cypress.Commands.add("logout", () => {
  const menuPO = new MenuCypressPageObject()

  menuPO.clickLogoutButton()
})

Cypress.Commands.add("waitForFontsToLoad", () => {
  cy.document().its("fonts.status").should("equal", "loaded");
})

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
