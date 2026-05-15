import { LogStorageAssertObject } from "./assert-object";
import { logs } from "./data-logs";
import { countBy } from "./data-utils";

describe("countBy", () => {
  it("should count occurrences of log levels", () => {
    const result = countBy(logs, (log) => log.level);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "DEBUG": 263,
        "ERROR": 229,
        "INFO": 246,
        "WARN": 267,
      }
    `);
  });

  it("should count occurrences of accounts", () => {
    const result = countBy(logs, (log) => log.account);
    expect(result).toMatchInlineSnapshot(`
      Object {
        "3b392d64-8ffd-41e0-9873-8a49df028140": 335,
        "7deed88b-5a14-4836-8145-6cd273a66948": 335,
        "f80e65b7-6250-40ae-8a16-7c738aa70fd3": 335,
      }
    `);
  });
});

test('application should store certain logs (native)', () => {
  expect(logs).toHaveLength(1005)

  const debugLogs = logs.filter(log => log.level === 'DEBUG')
  expect(debugLogs).toHaveLength(263)

  const debugOfSpecificAccount = logs
    .filter(log => log.level === 'DEBUG')
    .filter(log => log.account === "f80e65b7-6250-40ae-8a16-7c738aa70fd3")
  expect(debugOfSpecificAccount).toHaveLength(81)

  const errorLogs = logs.filter(log => log.level === 'ERROR')
  expect(errorLogs).toHaveLength(229)

  const errorOfSpecificAccount = logs
    .filter(log => log.level === 'ERROR')
    .filter(log => log.account === "f80e65b7-6250-40ae-8a16-7c738aa70fd3")
  expect(errorOfSpecificAccount).toHaveLength(75)
})

test('application should store certain logs (assert object)', () => {
  const logStorageShould = new LogStorageAssertObject(logs);
  logStorageShould
    .haveAllLogsCount(1005)
    .and.haveDebugLogsCount(263)
    .and.haveCountOnlyForAccountId("f80e65b7-6250-40ae-8a16-7c738aa70fd3", 81)
    .and.haveErrorLogsCount(229)
    .and.haveCountOnlyForAccountId("f80e65b7-6250-40ae-8a16-7c738aa70fd3", 75)
})
