const isObject = (val: any) => {
  return typeof val === 'object'
}
const isArray = (val: any) => {
  return Array.isArray(val)
}

export const shallowClone = (source: any) => {
  if (!isObject(source)) {
    return source
  }

  const result: any = isArray(source) ? [] : {}

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = source[key]
    }
  }

  return result
}

export const deepClone = (source: any) => {
  // 存在环引用问题（存在循环引用，拷贝会直接爆栈）
  // 对于Date、RegExp、Set、Map等引用类型不能正确拷贝

  if (!isObject(source)) {
    return source
  }

  const result: any = isArray(source) ? [] : {}

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = isObject(source[key]) ? deepClone(source[key]) : source[key]
    }
  }

  return result
}

export const deepClone1 = (source: any, map = new Map()) => {
  // 解决环引用问题（存在循环引用，拷贝会直接爆栈）

  if (!isObject(source)) {
    return source
  }

  const result: any = isArray(source) ? [] : {}

  if (map.get(source)) {
    return map.get(source)
  }

  map.set(source, result)

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = isObject(source[key]) ? deepClone1(source[key]) : source[key]
    }
  }

  return result
}

export const deepClone2 = (source: any) => {
  // 解决环引用问题（存在循环引用，拷贝会直接爆栈）
  // 解决对于Date、RegExp、Set、Map等引用类型不能正确拷贝

  // 可遍历类型
  const arrTag = '[object Array]';
  const objTag = '[object Object]';
  const mapTag = '[object Map]';
  const setTag = '[object Set]';
  const argTag = '[object Arguments]';
  const strTag = '[object String]';

  // 不可遍历类型
  const boolTag = '[object Boolean]';
  const numTag = '[object Number]';
  const dateTag = '[object Date]';
  const errTag = '[object Error]';
  const regexpTag = '[object RegExp]';
  const symbolTag = '[object Symbol]';
  const funTag = '[object Function]';

  // 将可遍历类型做个集合
  const traversalArr = [arrTag, objTag, mapTag, setTag, argTag, strTag];


  // 判断类型的函数(采用最全且无遗漏的判断方式)
  function checkType(source: any) {
    return Object.prototype.toString.call(source)
  }

  // 拷贝RegExp的方法
  function cloneReg(source: any) {
    const reFlags = /\w*$/;
    const result = new source.constructor(source.source, reFlags.exec(source));
    result.lastIndex = source.lastIndex;
    return result;
  }

  // 拷贝Date的方法
  function cloneDate(source: any) {
    return new source.constructor(source.valueOf())
  }


  function deepCloneFn(source: any, map = new Map()) {
    // 非对象直接返回
    if (!isObject(source)) return source

    // 根据source类型初始化结果变量
    let result: any = isArray(source) ? [] : {};

    /* ----------------处理环引用问题👇---------------- */
    // 已存在则直接返回(仅仅在环引用之间生效)
    if (map.get(source)) return map.get(source)

    // 不存在则第一次设置
    map.set(source, result)
    /* ----------------处理环引用问题👆---------------- */


    /* ----------------处理Map、Set、Date、RegExp深拷贝失效问题👇---------------- */
    const type = checkType(source)

    let emptyObj: any

    // 如果是可遍历类型，直接创建空对象
    if (traversalArr.includes(type)) {
      emptyObj = new source.constructor()
    }

    // 处理Map类型
    if (type === mapTag) {
      source.forEach((value: any, key: any) => {
        emptyObj.set(key, deepCloneFn(value, map))
      })
      return emptyObj
    }

    // 处理Set类型
    if (type === setTag) {
      source.forEach((value: any) => {
        emptyObj.add(deepCloneFn(value, map))
      })
      return emptyObj
    }

    // 处理Date类型
    if (type === dateTag) return cloneDate(source)

    // 处理Reg类型
    if (type === regexpTag) return cloneReg(source)
    /* ----------------处理Map、Set、Date、RegExp深拷贝失效问题👆---------------- */


    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        result[key] = isObject(source[key]) ? deepCloneFn(source[key]) : source[key]
      }
    }

    return result;
  }

  return deepCloneFn(source)
}
