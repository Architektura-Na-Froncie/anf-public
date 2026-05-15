import React from 'react';
import { render } from '@testing-library/react';

import { LoggerProvider } from '../logger';
import { MockLogger } from '../logger/Logger.mock'
import { KaboomSync } from "./Kaboom";
import { ErrorBoundary } from './ErrorBoundary';

import { mockConsoleError, mockErrorBoundaryStackTrace } from './mock-utils';

describe('ErrorBoundary', () => {
  it("should display error message if ErrorBoundary caught an exception", () => {
    const mockLogger = new MockLogger();
    const cleanup = [mockConsoleError(), mockErrorBoundaryStackTrace()]

    const { getByText } = render(
      <LoggerProvider logger={mockLogger}>
        <ErrorBoundary>
          <KaboomSync />
        </ErrorBoundary>
      </LoggerProvider>,
    );

    // sprawdzenie wizualne
    getByText("Oops...");
    getByText("Unexpected error occurred. Please contact Support.");

    // cleanup
    cleanup.forEach(fn => fn())
  });

  it("should send ERROR log if ErrorBoundary caught an exception", () => {
    const mockLogger = new MockLogger();
    const cleanup = [mockConsoleError(), mockErrorBoundaryStackTrace()]

    render(
      <LoggerProvider logger={mockLogger}>
        <ErrorBoundary>
          <KaboomSync />
        </ErrorBoundary>
      </LoggerProvider>
    );

    // sprawdzenie czy błąd został zalogowany
    mockLogger.expectLogs.toMatchSnapshot();

    // cleanup
    cleanup.forEach(fn => fn())
  });
});
