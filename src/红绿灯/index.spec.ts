import { fn, OptionArr } from "."

describe('红绿灯', () => {
  it('红5s, 绿4s, 黄3s', async () => {
    const option: OptionArr = [
      { text: '红', time: 5 },
      { text: '绿', time: 4 },
      { text: '黄', time: 3 },
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
