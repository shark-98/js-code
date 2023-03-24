export const base = function (fn: Function, context: any, ...args: any[]) {
  if (typeof fn !== 'function') {
    throw new Error("fn is not Function");
  }

  context = context || global

  if (['Object', 'global'].includes(Object.prototype.toString.call(context).slice(8, -1))) {
    context.fn = fn
    const result = context?.fn(...args)
    delete context.fn;
    return result
  }
}

export const myCall = function (fn: Function, context: any, ...args: any[]) {
  return base(fn, context, ...args)
}

export const myApply = function (fn: Function, context: any, arr?: any[]) {
  return base(fn, context, ...(arr || []))
}

export const myBind = function (fn: Function, context: any, ...args: any[]) {
  return (...args1: any[]) => myCall(fn, context, ...[...args, ...args1])
}
