export function naiveClone<T>(arg: T): T {
  return JSON.parse(JSON.stringify(arg))
}
