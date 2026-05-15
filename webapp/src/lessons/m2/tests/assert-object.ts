import { Log } from "./data-logs";

export class LogStorageAssertObject {
  constructor(
    private logs: Log[]
  ){}

  private lastLevel?: string

  haveAllLogsCount(count: number){
    expect(this.logs).toHaveLength(count)
    return { and: this }
  }

  haveErrorLogsCount(count: number){
    this.lastLevel = 'ERROR'
    const errorLogs = this.logs.filter(log => log.level === this.lastLevel)
    expect(errorLogs).toHaveLength(count)
    return { and: this }
  }

  haveDebugLogsCount(count: number){
    this.lastLevel = 'DEBUG'
    const errorLogs = this.logs.filter(log => log.level === this.lastLevel)
    expect(errorLogs).toHaveLength(count)
    return { and: this }
  }

  haveCountOnlyForAccountId(accountId: string, count: number){
    let logs = this.logs
    if (this.lastLevel){
      logs = logs.filter(log => log.level === this.lastLevel)
    }
    const accountLogs = logs.filter(log => log.account === accountId)
    expect(accountLogs).toHaveLength(count)
    return { and: this }
  }
}