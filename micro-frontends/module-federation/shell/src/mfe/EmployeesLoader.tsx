import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Employees = React.lazy(() => import("@anf-mfe/employees/App"));

export const EmployeesLoader = () => {
  return (
    <React.Suspense fallback="loading">
      <ErrorBoundary fallback={<h2>Failed to load Employees</h2>}>
        <Employees />
      </ErrorBoundary>
    </React.Suspense>
  )
}
