import { pLimit } from ".";

const log = (type: string, value: string) => {
  return `${type} —— ${value};\n`
}
const logStart = (value: string) => log('start', value)
const logEnd = (value: string) => log('end', value)

describe('p-limit', () => {
  it('2', async () => {
    const limit = pLimit(2);
    let linkLog = ''

    function asyncFun(value: string, delay: number) {
      return new Promise((resolve) => {
        linkLog += logStart(value)
        setTimeout(() => {
          linkLog += logEnd(value)
          resolve(value)
        }, delay);
      });
    }

    const arr = [
      limit(() => asyncFun('aaa', 2000)),
      limit(() => asyncFun('bbb', 3000)),
      limit(() => asyncFun('ccc', 1000)),
      limit(() => asyncFun('ddd', 1000)),
      limit(() => asyncFun('eee', 1000))
    ];

    const result = await Promise.all(arr);

    expect(linkLog).toBe(
      `${logStart('aaa')}${logStart('bbb')}${logEnd('aaa')}${logStart('ccc')}${logEnd('bbb')}${logStart('ddd')}${logEnd('ccc')}${logStart('eee')}${logEnd('ddd')}${logEnd('eee')}`
    )
    expect(result).toEqual(['aaa', 'bbb', 'ccc', 'ddd', 'eee'])
  })
})
