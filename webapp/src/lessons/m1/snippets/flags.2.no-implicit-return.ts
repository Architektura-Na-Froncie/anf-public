export {}

declare function dangerousStuff(): object

function doSomething(): object {
  try {
    return dangerousStuff()
  } catch (e) {
    console.error('yeah dangerous')
  }
}
