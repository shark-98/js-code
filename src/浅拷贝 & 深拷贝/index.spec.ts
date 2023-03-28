import { shallowClone, deepClone, deepClone1, deepClone2 } from "."

describe('浅拷贝', () => {
  it('object', () => {
    const source = {
      a: 1,
      b: {
        c: 2
      }
    }
    const target = shallowClone(source)
    expect(target).toEqual(source)
    expect(target).not.toBe(source)

    target.a = 10
    target.b.c = 3
    expect(target).toEqual({
      a: 10,
      b: {
        c: 3
      }
    })
    expect(source).toEqual({
      a: 1,
      b: {
        c: 3
      }
    })
  })

  it('array', () => {
    const sourceArr = [
      1,
      { a: 2 }
    ]
    const targetArr = shallowClone(sourceArr)
    expect(targetArr).toEqual(sourceArr)
    expect(targetArr).not.toBe(sourceArr)

    targetArr[0] = 10
    targetArr[1].a = 3
    expect(targetArr).toEqual([
      10,
      { a: 3 }
    ])
    expect(sourceArr).toEqual([
      1,
      { a: 3 }
    ])
  })
})

describe('深拷贝', () => {
  it('object', () => {
    const source = {
      a: 1,
      b: {
        c: 2
      }
    }
    const target = deepClone(source)
    expect(target).toEqual(source)
    expect(target).not.toBe(source)

    target.a = 10
    target.b.c = 3
    expect(target).toEqual({
      a: 10,
      b: {
        c: 3
      }
    })
    expect(source).toEqual({
      a: 1,
      b: {
        c: 2
      }
    })
  })

  it('array', () => {
    const sourceArr = [
      1,
      { a: 2 }
    ]
    const targetArr = deepClone(sourceArr)
    expect(targetArr).toEqual(sourceArr)
    expect(targetArr).not.toBe(sourceArr)

    targetArr[0] = 10
    targetArr[1].a = 3
    expect(targetArr).toEqual([
      10,
      { a: 3 }
    ])
    expect(sourceArr).toEqual([
      1,
      { a: 2 }
    ])
  })

  it('map、set、date、reg', () => {
    const source = {
      map: new Map([['t', 100], ['s', 200]]),
      set: new Set([1, 2, 3]),
      date: new Date(),
      reg: new RegExp(/test/g),
    }

    const result = deepClone(source)
    expect(result).toEqual({
      map: {},
      set: {},
      date: {},
      reg: {},
    })
  })
})

describe('深拷贝1', () => {
  it('object', () => {
    const source = {
      a: 1,
      b: {
        c: 2
      }
    }
    const target = deepClone1(source)
    expect(target).toEqual(source)
    expect(target).not.toBe(source)

    target.a = 10
    target.b.c = 3
    expect(target).toEqual({
      a: 10,
      b: {
        c: 3
      }
    })
    expect(source).toEqual({
      a: 1,
      b: {
        c: 2
      }
    })
  })

  it('array', () => {
    const sourceArr = [
      1,
      { a: 2 }
    ]
    const targetArr = deepClone1(sourceArr)
    expect(targetArr).toEqual(sourceArr)
    expect(targetArr).not.toBe(sourceArr)

    targetArr[0] = 10
    targetArr[1].a = 3
    expect(targetArr).toEqual([
      10,
      { a: 3 }
    ])
    expect(sourceArr).toEqual([
      1,
      { a: 2 }
    ])
  })

  it('map、set、date、reg', () => {
    const source = {
      map: new Map([['t', 100], ['s', 200]]),
      set: new Set([1, 2, 3]),
      date: new Date(),
      reg: new RegExp(/test/g),
    }

    const result = deepClone1(source)
    expect(result).toEqual({
      map: {},
      set: {},
      date: {},
      reg: {},
    })
  })
})

describe('深拷贝2', () => {
  it('object', () => {
    const source = {
      a: 1,
      b: {
        c: 2
      }
    }
    const target = deepClone2(source)
    expect(target).toEqual(source)
    expect(target).not.toBe(source)

    target.a = 10
    target.b.c = 3
    expect(target).toEqual({
      a: 10,
      b: {
        c: 3
      }
    })
    expect(source).toEqual({
      a: 1,
      b: {
        c: 2
      }
    })
  })

  it('array', () => {
    const sourceArr = [
      1,
      { a: 2 }
    ]
    const targetArr = deepClone2(sourceArr)
    expect(targetArr).toEqual(sourceArr)
    expect(targetArr).not.toBe(sourceArr)

    targetArr[0] = 10
    targetArr[1].a = 3
    expect(targetArr).toEqual([
      10,
      { a: 3 }
    ])
    expect(sourceArr).toEqual([
      1,
      { a: 2 }
    ])
  })

  it('map、set、date、reg', () => {
    const source = {
      map: new Map([['t', 100], ['s', 200]]),
      set: new Set([1, 2, 3]),
      date: new Date(),
      reg: new RegExp(/test/g),
    }

    const result = deepClone2(source)
    expect(result).toEqual(source)
  })
})
