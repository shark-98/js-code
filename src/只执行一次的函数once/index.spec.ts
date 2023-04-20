import { once } from "./index";

describe('只执行一次的函数once', () => {
  it('test', () => {
    const getLog = (v: number) => v
    const cb = vi.fn(getLog)
    const getLogNew = once(cb)

    const log1 = getLogNew(1)
    expect(log1).toBe(1)
    expect(cb).toHaveBeenCalledTimes(1)

    const log2 = getLogNew(2)
    expect(log2).toBe(undefined)
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
