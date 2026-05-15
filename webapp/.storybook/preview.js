import "../src/styles/fonts.css";

import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        'Atoms', 'Molecules', 'Organisms', 'Lessons',
        'Account', 'Authorize Device', 'Change Limits', 'Exams',
        'Auth', 'Currency Exchange',
      ],
      method: 'numeric',
    },
  },
  viewport: { viewports: MINIMAL_VIEWPORTS },
}

// M7 INTEGRATION TESTING
// msw-storybook-addon

import { addDecorator } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';

initialize({ onUnhandledRequest: 'bypass' });
addDecorator(mswDecorator);

// M9 ERROR HANDLING
// decorators

import React from 'react';
import { ErrorScreenProvider } from '../src/lessons/m9/error-ui'
import { LoggerProvider } from '../src/lessons/m9/logger';
import { StorybookLogger } from '../src/lessons/m9/logger/Logger.storybook';

export const decorators = [
  mswDecorator,
  (Story) => <ErrorScreenProvider><Story/></ErrorScreenProvider>,
  (Story) => <LoggerProvider logger={StorybookLogger} ><Story/></LoggerProvider>,
];
