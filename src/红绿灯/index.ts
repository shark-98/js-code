export type Option = {
  text: string,
  time: number,
}
export type OptionArr = Option[]

const generatePromise = (obj: Option) => {
  let result = ''
  let t = 0
  const { text, time } = obj

  return () => {
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        result += text
        t += 1
        if (t === time) {
          clearInterval(timer)
          resolve(result)
        }
      }, 1000)
    })
  }
}

export const fn = async (option: OptionArr) => {
  let result = ''

  const promiseArr = option.map((item) => generatePromise(item))
  for (let i = 0; i < promiseArr.length; i++) {
    const p = promiseArr[i]
    result += await p()
  }

  return result
}
