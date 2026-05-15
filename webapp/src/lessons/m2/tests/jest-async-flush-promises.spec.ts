const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;
export function flushPromises() {
  return new Promise(res => scheduler(res, 0));
}

const getJohn = () => {
  let john = {
    age: 39,
    name: "John Lennon"
  }
  Promise.resolve()
    .then(() => john.age++)
  return john
}

test('promise should resolve after time passed', async () => {
  // the problem: we've got nothing to await 😱
  const john = getJohn()
  await flushPromises()
  expect(john.age).toEqual(40)
})
