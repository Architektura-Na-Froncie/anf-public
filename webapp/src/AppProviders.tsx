import React, { useEffect } from 'react';

import { Logger, LoggerProvider, HTTPLogger } from 'lessons/m9/logger';
import { ErrorScreenProvider } from 'lessons/m9/error-ui';
import { AuthProvider } from 'lessons/m10/auth/AuthProvider';

interface AppProvidersProps {
  logger?: Logger
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
  const { children, logger = new HTTPLogger() } = props

  useEffect(() => {
    logger.debug('initialized app')
  }, [logger])

  return (
    <LoggerProvider logger={logger}>
      <ErrorScreenProvider>
        <AuthProvider>
          { children }
        </AuthProvider>
      </ErrorScreenProvider>
    </LoggerProvider>
  )
}
