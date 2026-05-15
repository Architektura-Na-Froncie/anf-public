export const delay = (time: number) => {
  return new Promise((res, rej) => {
    setTimeout(res, time)
  })
}
