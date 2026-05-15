/* eslint-disable no-console */
import { LogLevel } from "api/logs";
import { Logger, LogParams } from "./Logger.interface";

export class ConsoleLogger implements Logger {

  static methodMap = {
    DEBUG: console.debug,
    INFO: console.info,
    WARN: console.warn,
    ERROR: console.error,
  };

  send(level: LogLevel, message: string, params?: LogParams) {
    ConsoleLogger.methodMap[level](`${level}: ${message}`, params || "");
  }

  debug(message: string, params?: LogParams) {
    console.debug(`DEBUG: ${message}`, params || "");
  }

  info(message: string, params?: LogParams) {
    console.info(`INFO: ${message}`, params || "");
  }

  warn(message: string, params?: LogParams) {
    console.warn(`WARN: ${message}`, params || "");
  }

  error(message: string, params?: LogParams) {
    console.error(`ERROR: ${message}`, params || "");
  }
}
