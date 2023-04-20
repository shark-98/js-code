const loadJs = (source) => {
  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', source)
  script.setAttribute('async', true)

  return script
}

const loadCss = (source) => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', source)

  return link
}

const LOAD_FN_MAP = new Map([
  ['js', loadJs],
  ['css', loadCss]
])

const loadResource = (url) => {
  return new Promise((resolve, reject) => {
    const type = getSourceType(url)

    const fn = LOAD_FN_MAP.get(type)

    if (typeof fn !== 'function') {
      reject(new Error(`加载不支持 ${type} 类型文件`))
      return
    }

    const resource = fn(url)

    resource.onload = () => resolve()

    resource.onerror = () =>
      reject(new Error(`加载 ${url} 失败`))

    const head = document.head || document.getElementsByTagName('head')[0]
    head.appendChild(resource)
  })
}

export const load = async (source) => {
  const sourceList = Array.isArray(source) ? source : [source];

  const list = sourceList.map((item) => loadResource(item))
  const res = await Promise.all(list)

  return res
}

const getSourceType = (source) => {
  const DEFAULT_TYPE = 'js'
  const arr = source.split('.')

  return arr[arr.length - 1] || DEFAULT_TYPE
}

