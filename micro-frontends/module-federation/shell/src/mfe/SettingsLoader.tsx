import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Settings = React.lazy(() => import("@anf-mfe/settings/App"));

export const SettingsLoader = () => {
  return (
    <React.Suspense fallback="loading">
      <ErrorBoundary fallback={<h2>Failed to load Settings</h2>}>
        <Settings />
      </ErrorBoundary>
    </React.Suspense>
  )
}
