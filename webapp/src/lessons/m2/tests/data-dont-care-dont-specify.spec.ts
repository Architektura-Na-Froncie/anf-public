import { Log } from "./data-logs"
import { countBy } from "./data-utils"

const partialMockLogs = [{
  level: "ERROR"
}, {
  level: "DEBUG"
}] as Log[]

test('should count occurrences of partial mock log levels', () => {
  expect(countBy(partialMockLogs, log => log.level)).toEqual({"DEBUG": 1, "ERROR": 1})
})

const sampleLog = (): Log => ({
  "id": "61898d11-cf3f-4b87-a042-b1a774d98d18",
  "date": "2020-12-13T06:16:50.000Z",
  "level": "DEBUG",
  "account": "f80e65b7-6250-40ae-8a16-7c738aa70fd3",
  "content": "Nihil id reiciendis officiis qui ut dolor incidunt consequatur."
})

const logBuilder = (object = sampleLog()) => {
  return {
    valueOf(){
      return object
    },
    withLevel(level: Log['level']){
      return logBuilder({ ...object, level })
    },
    withAccount(account: Log['account']){
      return logBuilder({ ...object, account })
    },
  }
}

const fullMockLogs = [
  logBuilder().withLevel("ERROR"),
  logBuilder().withLevel("DEBUG"),
  logBuilder().withLevel("ERROR").withAccount('123'),
].map(builder => builder.valueOf())

test('should count occurrences of full mock log levels', () => {
  expect(countBy(fullMockLogs, log => log.level)).toEqual({"DEBUG": 1, "ERROR": 2})
})
