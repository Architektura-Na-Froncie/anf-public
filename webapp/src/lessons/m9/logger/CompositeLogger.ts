import { LogLevel } from "api/logs";
import { Logger, LogParams } from "./Logger.interface";

export class CompositeLogger implements Logger {
  private loggers: Logger[] = [];

  add(logger: Logger) {
    this.loggers.push(logger);
    return this;
  }

  send(level: LogLevel, message: string, params?: LogParams) {
    for (const logger of this.loggers) {
      logger.send(level, message, params);
    }
  }

  debug(message: string, params?: LogParams) {
    for (const logger of this.loggers) {
      logger.debug(message, params);
    }
  }

  info(message: string, params?: LogParams) {
    for (const logger of this.loggers) {
      logger.info(message, params);
    }
  }

  warn(message: string, params?: LogParams) {
    for (const logger of this.loggers) {
      logger.warn(message, params);
    }
  }

  error(message: string, params?: LogParams) {
    for (const logger of this.loggers) {
      logger.error(message, params);
    }
  }
}
