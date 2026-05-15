import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLogger, useLogMessage } from '../logger';

import { ErrorModal } from './ErrorModal';
import { ErrorPage } from './ErrorPage';
import { UserErrorMessage } from './messages'

type ErrorScreenContextValue = {
  showError(screen: ErrorScreenState): void
  clear(): void
}

export const ErrorScreenContext = createContext<ErrorScreenContextValue | undefined>(undefined)

interface ErrorScreenProviderProps {}

type ErrorScreenState =
  | {
    layout: "NO_ERROR"
  }
  | {
    layout: "ERROR_PAGE"
    message: UserErrorMessage
  }
  | {
    layout: "ERROR_MODAL"
    message: UserErrorMessage
  }

export const ErrorScreenProvider: React.FC<ErrorScreenProviderProps> = (props) => {
  const [errorScreen, setErrorScreen] = useState<ErrorScreenState>({ layout: "NO_ERROR" })
  const { logger } = useLogger()

  const showError = useCallback((screen: ErrorScreenState) => {
    setErrorScreen(screen)
    if (screen.layout !== "NO_ERROR"){
      logger.error(`Error Page displayed`, screen.message);
    }
  }, [logger])
  const clear = useCallback(() => {
    setErrorScreen({ layout: "NO_ERROR" })
  }, [])

  let content: React.ReactNode = props.children;
  if (errorScreen.layout === "ERROR_MODAL") {
    content = (
      <>
        {props.children}
        <ErrorModal
          isOpen={true}
          errorMessage={errorScreen.message}
          onClose={clear}
        />
      </>
    );
  } else if (errorScreen.layout === "ERROR_PAGE") {
    content = <ErrorPage errorMessage={errorScreen.message} />;
  }

  return <ErrorScreenContext.Provider value={{ showError, clear }}>
    {content}
  </ErrorScreenContext.Provider>
}

export const useErrorScreen = () => {
  const ctx = useContext(ErrorScreenContext)
  if (!ctx){
    throw new Error("Component beyond ErrorScreenContext")
  }
  return ctx
}
