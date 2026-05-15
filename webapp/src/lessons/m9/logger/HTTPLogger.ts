import { sendLog, LogLevel } from "api/logs";
import { Logger, LogParams } from "./Logger.interface";

export class HTTPLogger implements Logger {
  private sendLog = async (logLevel: LogLevel, message: string, params?: LogParams) => {
    return sendLog(logLevel, message, params ?? null);
  };

  send = (level: LogLevel, message: string, params?: LogParams) => {
    return this.sendLog(level, message, params);
  };

  debug = (message: string, params?: LogParams) => {
    return this.send("DEBUG", message, params);
  };

  info = (message: string, params?: LogParams) => {
    return this.send("INFO", message, params);
  };

  warn = (message: string, params?: LogParams) => {
    return this.send("WARN", message, params);
  };

  error = (message: string, params?: LogParams) => {
    return this.send("ERROR", message, params);
  };
}
