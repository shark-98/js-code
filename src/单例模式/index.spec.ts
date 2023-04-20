import { getInstance } from "./index"

describe('单例模式', () => {
  it('test', () => {
    const getObjValue = () => ({
      x: 1,
      y: 2,
      z: 3
    })

    const getObj = getInstance(getObjValue)

    const v = { x: 1, y: 2, z: 3 }
    const obj1 = getObj()
    expect(obj1).toEqual(v)

    const obj2 = getObj()
    expect(obj2).toEqual(v)

    expect(obj1).toBe(obj2)
    expect(obj1).not.toBe(v)
  })
})
