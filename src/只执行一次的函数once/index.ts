export function once(fn: Function) {
  // 利用闭包判断函数是否执行过
  let called = false
  return function (this: any, ...args: any[]) {
    if (!called) {
      called = true
      return fn.apply(this, args)
    }
  }
}
