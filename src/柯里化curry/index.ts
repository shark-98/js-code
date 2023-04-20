export function curry(fn: Function): Function {
  return function curried(this: any, ...args: any[]) {
    // fn.length 表示 该函数的形参个数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    return function (this: any, ...args2: any[]) {
      return curried.apply(this, args.concat(args2));
    }
  }
}
