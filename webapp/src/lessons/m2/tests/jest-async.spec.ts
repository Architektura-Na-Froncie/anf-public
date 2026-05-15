test.skip('should fail because promise is rejected', () => {
  return Promise.reject('kaboom! W-1')
})

test.skip('should fail because awaited promise is rejected', async () => {
  await Promise.reject('kaboom! X-1')
})

test.skip('should hang because done callback doesn\'t get invoked', (done) => {
  Promise.reject('kaboom! Y-1')
})

test.skip('a FALSE PASS (but throws in console) - promise is not awaited', () => {
  Promise.reject('kaboom! Z-1')
})

export {};
