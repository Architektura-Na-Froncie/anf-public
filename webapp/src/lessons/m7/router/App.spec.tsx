import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Main } from 'Main';
import { AppProviders } from 'AppProviders';

import { transfersMockHandlers, logsMockHandlers } from "api/mock";
import { setupMockServer } from "api/mock/mock.server";

describe('App Component', () => {

  // pick up the mocks we need
  setupMockServer(
    ...transfersMockHandlers,
    ...logsMockHandlers,
  );

  it('should navigate to "Historia Konta" after clicked the link', async () => {
    const { findByRole, findByText } = render(<MemoryRouter>
      <AppProviders>
        <Main />
      </AppProviders>
    </MemoryRouter>)

    const btn = await findByRole("link", { name:  "Historia konta" })
    btn.click()

    await findByText("Unbranded Cotton Mouse")
  });
});
