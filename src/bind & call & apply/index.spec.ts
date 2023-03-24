import { myCall, myApply, myBind } from "./index"

describe('bind & call & apply', () => {
  const name = 'global_name'
  const _global = global as any
  _global.name = name
  const obj = { name: 'obj_name' }
  const age = 18
  const gender = 'male'
  function fn(this: any, age: number, gender: string) {
    return { name: this.name, age, gender }
  }

  describe('call', () => {
    it('not', () => {
      const expected = { name, age, gender }
      const result = myCall(fn, undefined, age, gender)
      expect(result).toEqual(expected)

      const expected1 = undefined
      const result1 = myCall(fn, '111', age, gender)
      expect(result1).toEqual(expected1)
    })

    it('have', () => {
      const expected = { name: obj.name, age, gender }
      const result = myCall(fn, obj, age, gender)
      expect(result).toEqual(expected)
    })
  })

  describe('apply', () => {
    it('not', () => {
      const expected = { name, age, gender }
      const result = myApply(fn, undefined, [age, gender])
      expect(result).toEqual(expected)

      const expected1 = undefined
      const result1 = myApply(fn, '111', [age, gender])
      expect(result1).toEqual(expected1)
    })

    it('have', () => {
      const expected = { name: obj.name, age, gender }
      const result = myApply(fn, obj, [age, gender])
      expect(result).toEqual(expected)
    })
  })

  describe('bind', () => {
    it('not', () => {
      const expected = { name, age, gender }
      const result = myBind(fn, undefined, age, gender)()
      expect(result).toEqual(expected)

      const expected1 = undefined
      const result1 = myBind(fn, '111', age, gender)()
      expect(result1).toEqual(expected1)
    })

    it('have', () => {
      const expected = { name: obj.name, age, gender }
      const result = myBind(fn, obj, age, gender)()
      expect(result).toEqual(expected)

      function fn1(this: any, age: number, gender: string, x: number, y: number) {
        return { name: this.name, age, gender, x, y }
      }
      const x = 1; const y = 2
      const expected1 = { name: obj.name, age, gender, x, y }
      const result1 = myBind(fn1, obj, age, gender)(x, y)
      expect(result1).toEqual(expected1)
    })
  })
})
