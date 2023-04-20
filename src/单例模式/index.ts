export const getInstance = (fn: Function) => {
  return (() => {
    let obj: any
    return () => obj || (obj = fn())
  })()
}
