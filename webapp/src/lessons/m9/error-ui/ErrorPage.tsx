import React from 'react';

import { ErrorContent } from './ErrorContent';
import { UserErrorMessage } from './messages';

interface ErrorPageProps {
  errorMessage: UserErrorMessage
}

export const ErrorPage: React.FC<ErrorPageProps> = (props) => {
  const { errorMessage } = props

  return <ErrorContent message={errorMessage} />
}
