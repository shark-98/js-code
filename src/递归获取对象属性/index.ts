export const getValue1 = (obj: Record<string, any>, key: string, defaultValue: any) => {
  const fn = (row: Record<string, any>, k: string[]): any => {
    if (!row) return defaultValue;

    const [f1, ...l1] = k || []
    if (l1.length === 0) {
      return row[f1] || defaultValue
    }

    return fn(row[f1], l1)
  }

  return fn(obj, key.split('.'))
};


export const getValue = (obj: Record<string, any>, key: string, defaultValue: any) => {
  const keyList = key.split('.') || []
  let i = 0
  let row = obj

  while (i < keyList.length && row) {
    row = row[keyList[i]]
    i++
  }

  return row || defaultValue
}
