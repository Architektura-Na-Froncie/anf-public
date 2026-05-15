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
