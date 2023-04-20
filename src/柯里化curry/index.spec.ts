import { curry } from ".";

describe('柯里化', () => {
  it('add', () => {
    function add(x: number, y: number) {
      return x + y;
    }

    const curriedAdd = curry(add);

    expect(curriedAdd(1)(2)).toBe(3)
    expect(curriedAdd(1, 2)).toBe(3)
  })
})
