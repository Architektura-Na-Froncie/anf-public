export function process<T, U>(items: T[], mapFn: (t: T) => U) {
  return items.map(item => {
    return mapFn(item as T)
  })
}
