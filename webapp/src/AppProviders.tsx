import React from 'react';

interface AppProvidersProps {
}

export const AppProviders: React.FC<AppProvidersProps> = (props) => {
  const { children } = props

  // 🔥 w następnych modułach dojdą providery
  return <>
    {children}
  </>
}
