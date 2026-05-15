export const randomBetween = (from: number, to: number) => {
  const diff = to - from
  return from + Math.round(Math.random() * diff)
}
