import { Logger, LogParams } from "./Logger.interface";

export class MockLogger implements Logger {

  send = jest.fn()
  name = "MockLogger"

  debug(message: string, params?: LogParams){
    this.send('DEBUG', message, params)
  }
  info(message: string, params?: LogParams){
    this.send('INFO', message, params)
  }
  warn(message: string, params?: LogParams){
    this.send('WARN', message, params)
  }
  error(message: string, params?: LogParams){
    this.send('ERROR', message, params)
  }

  get expectLogs(){
    return expect(this.send.mock.calls)
  }
};
