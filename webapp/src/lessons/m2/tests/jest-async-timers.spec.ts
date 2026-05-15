const sleep = (ms: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, ms)
  })
}

test('promise should resolve after time passed', async () => {
  jest.useFakeTimers()

  const delay1 = sleep(1000)
  jest.runAllTimers()
  await delay1

  const delay2 = sleep(0) // nawet dla 0ms możliwy deadlock
  jest.runAllTimers()
  await delay2
})

export {};
