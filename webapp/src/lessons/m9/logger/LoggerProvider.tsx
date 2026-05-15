import React, { createContext, useCallback, useContext, useEffect } from 'react';

import { LogLevel } from "api/logs";
import { Logger } from './Logger.interface';

type LoggerContextValue = {
  logger: Logger
}

const initialValue: LoggerContextValue = {
  logger: {
    send: () => {},
    debug: () => {},
    info: () => {},
    warn: () => {},
    error: () => {},
  }
}

export const LoggerContext = createContext(initialValue)

interface LoggerProviderProps {
  logger: Logger
}

export const LoggerProvider: React.FC<LoggerProviderProps> = (props) => {
  const { logger } = props

  return <LoggerContext.Provider value={{logger}}>
    {props.children}
  </LoggerContext.Provider>
}

export const useLogger = () => useContext(LoggerContext);

export const useLogMessage = (message: string, level: LogLevel = "DEBUG", send = true) => {
  const { logger } = useLogger();
  useEffect(() => {
    send && logger.send(level, message)
  }, [logger, message, level, send]);
};

export function useLogCallback<T>(callback: () => Promise<T>, message: string): () => Promise<T>;
export function useLogCallback(callback: () => void, message: string): () => void;
export function useLogCallback<TFn extends () => void>(callback: TFn, message: string) {
  const { logger } = useLogger();
  const memoized = useCallback(() => {
    logger.info(message);
    return callback();
  }, [logger, callback, message]);
  return memoized;
}
