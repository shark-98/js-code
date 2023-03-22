import { fn, OptionArr } from "."

describe('红绿灯', () => {
  it('红1s, 绿1s, 黄1s', async () => {
    const option: OptionArr = [
      { text: '红', time: 1 },
      { text: '绿', time: 1 },
      { text: '黄', time: 1 },
    ]
    const expected = option.reduce((total, cur) => {
      const { text, time } = cur
      for (let i = 0; i < time; i++) {
        total += text
      }
      return total
    }, '')

    const result = await fn(option)
    expect(result).toBe(expected)
  })
})
