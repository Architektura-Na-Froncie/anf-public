import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import App from 'App'
import { AppProviders } from 'AppProviders'

// https://github.com/nickcolley/jest-axe
test.skip('App #a11y', async () => {
  const { container } = render(<AppProviders><App /></AppProviders>)
  const results = await axe(container)
  
  expect(results).toHaveNoViolations()
})
